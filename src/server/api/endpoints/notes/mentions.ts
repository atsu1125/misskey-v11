import $ from 'cafy';
import { ID } from '../../../../misc/cafy-id';
import define from '../../define';
import read from '../../../../services/note/read';
import { Notes, Followings } from '../../../../models';
import { generateVisibilityQuery } from '../../common/generate-visibility-query';
import { generateMuteQuery } from '../../common/generate-mute-query';
import { makePaginationQuery } from '../../common/make-pagination-query';
import { Brackets } from 'typeorm';

export const meta = {
	desc: {
		'ja-JP': '自分に言及している投稿の一覧を取得します。',
		'en-US': 'Get mentions of myself.'
	},

	tags: ['notes'],

	requireCredential: true,

	params: {
		following: {
			validator: $.optional.bool,
			default: false
		},

		limit: {
			validator: $.optional.num.range(1, 100),
			default: 10
		},

		sinceId: {
			validator: $.optional.type(ID),
		},

		untilId: {
			validator: $.optional.type(ID),
		},

		visibility: {
			validator: $.optional.str,
		},
	},

	res: {
		type: 'array' as const,
		optional: false as const, nullable: false as const,
		items: {
			type: 'object' as const,
			optional: false as const, nullable: false as const,
			ref: 'Note',
		}
	},
};

export default define(meta, async (ps, user) => {
	const followingQuery = Followings.createQueryBuilder('following')
		.select('following.followeeId')
		.where('following.followerId = :followerId', { followerId: user.id });

	const query = makePaginationQuery(Notes.createQueryBuilder('note'), ps.sinceId, ps.untilId)
		.andWhere(new Brackets(qb => { qb
			.where(`'{"${user.id}"}' <@ note.mentions`)
			.orWhere(`'{"${user.id}"}' <@ note.visibleUserIds`);
		}))
		.innerJoinAndSelect('note.user', 'user')
		.leftJoinAndSelect('user.avatar', 'avatar')
		.leftJoinAndSelect('user.banner', 'banner')
		.leftJoinAndSelect('note.reply', 'reply')
		.leftJoinAndSelect('note.renote', 'renote')
		.leftJoinAndSelect('reply.user', 'replyUser')
		.leftJoinAndSelect('replyUser.avatar', 'replyUserAvatar')
		.leftJoinAndSelect('replyUser.banner', 'replyUserBanner')
		.leftJoinAndSelect('renote.user', 'renoteUser')
		.leftJoinAndSelect('renoteUser.avatar', 'renoteUserAvatar')
		.leftJoinAndSelect('renoteUser.banner', 'renoteUserBanner');

	generateVisibilityQuery(query, user);
	generateMuteQuery(query, user);

	if (ps.visibility) {
		query.andWhere('note.visibility = :visibility', { visibility: ps.visibility });
	}

	if (ps.following) {
		query.andWhere(`((note.userId IN (${ followingQuery.getQuery() })) OR (note.userId = :meId))`, { meId: user.id });
		query.setParameters(followingQuery.getParameters());
	}

	const mentions = await query.take(ps.limit!).getMany();

	for (const note of mentions) {
		read(user.id, note.id);
	}

	return await Notes.packMany(mentions, user);
});
