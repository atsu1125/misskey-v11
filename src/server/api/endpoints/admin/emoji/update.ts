import $ from 'cafy';
import define from '../../../define';
import { detectUrlMime } from '../../../../../misc/detect-url-mime';
import { ID } from '../../../../../misc/cafy-id';
import { Emojis } from '../../../../../models';
import { getConnection } from 'typeorm';
import { ApiError } from '../../../error';

export const meta = {
	desc: {
		'ja-JP': 'カスタム絵文字を更新します。'
	},

	tags: ['admin'],

	requireCredential: true,
	requireModerator: true,

	params: {
		id: {
			validator: $.type(ID)
		},

		name: {
			validator: $.str
		},

		category: {
			validator: $.optional.str
		},

		url: {
			validator: $.str
		},

		aliases: {
			validator: $.arr($.str)
		}
	},

	errors: {
		noSuchEmoji: {
			message: 'No such emoji.',
			code: 'NO_SUCH_EMOJI',
			id: '684dec9d-a8c2-4364-9aa8-456c49cb1dc8'
		},
		emojiNameAlredyExists: {
			message: 'Emoji name already exists.',
			code: 'EMOJI_NAME_ALREADY_EXISTS',
			id: '6cd4a97b-6325-4b91-ab77-ee45a064fd1a'
		},
		emojiNameCorrupts: {
			message: 'Emoji name corrupts.',
			code: 'EMOJI_NAME_CORRUPTS',
			id: '03bc7ada-edee-4959-b7f5-3901a939729c'
		}
	}
};

export default define(meta, async (ps) => {
	const emoji = await Emojis.findOne(ps.id);

	if (emoji == null) throw new ApiError(meta.errors.noSuchEmoji);

	if (!ps.name.match(/^[a-zA-Z0-9_+-]+$/)) throw new ApiError(meta.errors.emojiNameCorrupts);
	
	const exists = await Emojis.findOne({
		name: ps.name,
		host: null
	});

	if (exists != null) throw new ApiError(meta.errors.emojiNameAlredyExists);

	const type = await detectUrlMime(ps.url);

	await Emojis.update(emoji.id, {
		updatedAt: new Date(),
		name: ps.name,
		category: ps.category,
		aliases: ps.aliases,
		url: ps.url,
		type,
	});

	await getConnection().queryResultCache!.remove(['meta_emojis']);
});
