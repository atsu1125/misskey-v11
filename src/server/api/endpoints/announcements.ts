import { fetchMeta } from '../../../misc/fetch-meta';
import define from '../define';

export const meta = {
	tags: ['meta'],

	desc: {
	},

	requireCredential: false,

	params: {
	},
};

export default define(meta, async (ps, me) => {
	const instance = await fetchMeta(true);

	return { announcements: instance.announcements };

});
