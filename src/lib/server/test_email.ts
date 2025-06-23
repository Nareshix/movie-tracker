// ./mail.js
import nodemailer from 'nodemailer';

nodemailer.createTestAccount((err, account) => {
	if (err) {
		console.error('Failed to create a testing account. ' + err.message);
		return;
	}

	// 1️⃣  Configure a transporter that talks to Ethereal
	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false, // upgrade later with STARTTLS
		auth: {
			user: account.user, // generated user
			pass: account.pass // generated password
		}
	});

	// 2️⃣  Send a message
	transporter
		.sendMail({
			from: 'Example app <no-reply@example.com>',
			to: 'user@example.com',
			subject: 'Hello from tests ✔',
			html: 'Hi there! 👋 <br><br> Please verify your email to contine with us. If you did not request this email, feel free to ignore it. <a href="https://www.google.com">google.com</a>'
		})
		.then((info) => {
			console.log('Message sent: %s', info.messageId);
			// Preview the stored message in Ethereal’s web UI
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		})
		.catch(console.error);
});
