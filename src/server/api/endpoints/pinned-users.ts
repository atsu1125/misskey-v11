import define from '../define';
import { Users } from '../../../models';
import { fetchMeta } from '../../../misc/fetch-meta';
import parseAcct from '../../../misc/acct/parse';
import { User } from '../../../models/entities/user';

export const meta = {
	tags: ['users'],

	requireCredential: false,

	params: {
	},

	res: {
		type: 'array' as const,
		optional: false as const, nullable: false as const,
		items: {
			type: 'object' as const,
			optional: false as const, nullable: false as const,
			ref: 'User',
		}
	},
};

export default define(meta, async (ps, me) => {
	const m = await fetchMeta();
	if (me == null && m.disableProfileDirectory) {
		return [];
	}
	
	const meta = await fetchMeta();

	const users = await Promise.all(meta.pinnedUsers.map(acct => Users.findOne(parseAcct(acct))));

	return await Users.packMany(users.filter(x => x !== undefined) as User[], me, { detail: true });
});
