import $ from 'cafy';
import { toDbHost } from '../../../../../misc/convert-host';
import define from '../../../define';
import { fallback } from '../../../../../prelude/symbol';
import { DriveFiles } from '../../../../../models';

export const meta = {
	tags: ['admin'],

	requireCredential: false,
	requireModerator: true,

	params: {
		limit: {
			validator: $.optional.num.range(1, 100),
			default: 10
		},

		offset: {
			validator: $.optional.num.min(0),
			default: 0
		},

		sort: {
			validator: $.optional.str.or([
				'+createdAt',
				'-createdAt',
				'+size',
				'-size',
			]),
		},

		origin: {
			validator: $.optional.str.or([
				'combined',
				'local',
				'remote',
			]),
			default: 'local'
		},

		type: {
			validator: $.optional.str.match(/^[a-zA-Z\/\-\*]+$/)
		},
	}
};

const sort: any = { // < https://github.com/Microsoft/TypeScript/issues/1863
	'+createdAt': { createdAt: -1 },
	'-createdAt': { createdAt: 1 },
	'+size': { size: -1 },
	'-size': { size: 1 },
	[fallback]: { id: -1 }
};

export default define(meta, async (ps, me) => {
	const q = {} as any;

	if (ps.hostname != null && ps.hostname.length > 0) {
			q['metadata._user.host'] = toDbHost(ps.hostname);
		} else {
			if (ps.origin == 'local') q['userHost'] = null;
			if (ps.origin == 'remote') q['userHost'] = { $ne: null };
		}

	if (ps.type) {
		q.type = new RegExp(`^${ps.type.replace(/\*/g, '.+?')}$`);
	}

	const files = await DriveFiles.find({
		where: q,
		take: ps.limit!,
		order: sort[ps.sort!] || sort[fallback],
		skip: ps.offset
	});

	return await DriveFiles.packMany(files, { detail: true, withUser: true, self: true });
});
