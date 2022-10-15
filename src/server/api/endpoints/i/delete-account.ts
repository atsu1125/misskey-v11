import $ from 'cafy';
import * as bcrypt from 'bcryptjs';
import define from '../../define';
import { Users, UserProfiles } from '../../../../models';
import { doPostSuspend } from '../../../../services/suspend-user';
import { publishTerminate } from '../../../../services/server-event';
import { createDeleteAccountJob } from '../../../../queue';
import { fetchMeta } from '../../../../misc/fetch-meta';

export const meta = {
	requireCredential: true,

	secure: true,

	params: {
		password: {
			validator: $.str
		},
	}
};

export default define(meta, async (ps, user) => {
	const profile = await UserProfiles.findOneOrFail(user.id);
	const userDetailed = await Users.findOneOrFail(user.id);
	if (userDetailed.isDeleted) {
		return;
	}

	// Compare password
	const same = await bcrypt.compare(ps.password, profile.password!);

	if (!same) {
		throw new Error('incorrect password');
	}

	const instance = await fetchMeta();

	if (instance && instance.disableDeletion) {
		throw new Error('Account Deletion is disabled.');
	}

	// 物理削除する前にDelete activityを送信する
	await doPostSuspend(user).catch(e => {});

	createDeleteAccountJob(user);

	await Users.update(user.id, {
		isDeleted: true,
	});

	// Terminate streaming
	publishTerminate(user.id);
});
