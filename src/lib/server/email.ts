import nodemailer from 'nodemailer';

const transporterConfig = {
	service: 'gmail',
	auth: {
		user: 'email.verify.personal.project@gmail.com',
		pass: 'ddag tfpn lvch ejha'
	}
};

const transporter = nodemailer.createTransport(transporterConfig);

export const sendEmail = async (to: string, subject: string, html: string) => {
	await transporter.sendMail({
		from: 'Movie Tracker <email.verify.personal.project@gmail.com>',
		to: to,
		subject: subject,
		html: html
	});
};
