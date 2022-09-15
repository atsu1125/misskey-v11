import * as nodemailer from 'nodemailer';
import { fetchMeta } from '../misc/fetch-meta';
import Logger from './logger';
import config from '../config';

export const logger = new Logger('email');

export async function sendEmail(to: string, subject: string, html: string, text: string) {
	const meta = await fetchMeta(true);

	const emailSettingUrl = `${config.url}/i/settings/profile`;

	const enableAuth = meta.smtpUser != null && meta.smtpUser !== '';

	const transporter = nodemailer.createTransport({
		host: meta.smtpHost,
		port: meta.smtpPort,
		secure: meta.smtpSecure,
		ignoreTLS: !enableAuth,
		proxy: config.proxySmtp,
		auth: enableAuth ? {
			user: meta.smtpUser,
			pass: meta.smtpPass,
		} : undefined,
	} as any);

	try {
		const info = await transporter.sendMail({
			from: meta.email!,
			to: to,
			subject: `[${ config.host }] ${ subject }`,
			text: `${ config.host }: ${ subject }\n\n${ text }\n\n${ config.url }\nEmail setting: ${ emailSettingUrl }`,
		});

		logger.info(`Message sent: ${info.messageId}`);
	} catch (err) {
		logger.error(err as Error);
		throw err;
	}
}
