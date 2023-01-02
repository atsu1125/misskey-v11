import define from '../../define';
import { RegistrationTickets } from '../../../../models';

export const meta = {
	desc: {
		'ja-JP': '招待コードを失効します。'
	},

	tags: ['admin'],

	requireCredential: true,
	requireAdmin: true,

	params: {}
};

export default define(meta, async () => {
	await RegistrationTickets.delete({
	});
});
