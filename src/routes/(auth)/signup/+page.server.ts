import { query } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import { sendEmail } from '$lib/server/email';
import { randomBytes } from 'crypto';
interface ErrorDB {
	message: string;
	code: string;
}

export const actions = {
	signup: async ({ request }) => {
		const data = await request.formData();
		let email = data.get('email') as string;
		email = email.toLowerCase();
		const password = data.get('password') as string;
		let user_id;

		// check if user alr exists
		try {
			const userExist = await query('SELECT * FROM users WHERE email = $1', [email]);
			if (userExist.rowCount !== 0) {
				return fail(409, {
					ErrorMsg:
						'This email already exists. If you have forgotten your password, click forgot password'
				});
			}
		} catch (err) {
			console.log(err);
			return fail(500, {
				ErrorMsg: 'An error has occured within the system. Pleas try again later.'
			});
		}

		// hash password and store it in unverified_user db (auto expires after 15 min)
		const token = randomBytes(64).toString('hex');
		try {
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			const output = await query(
				'INSERT INTO unverified_users (email, hashed_password, token) VALUES ($1, $2, $3) RETURNING user_id;',
				[email, hashedPassword, token]
			);
			user_id = output.rows[0].user_id;
		} catch (err) {
			const error = err as ErrorDB;
			if (error.code == '23505') {
				return fail(409, {
					ErrorMsg:
						'Please verify your email. If you did not recieve an email, try again 5 min later.'
				});
			}
			console.log(error.message);
			return fail(500, {
				ErrorMsg: 'An error has occured within the system. Pleas try again later.'
			});
		}

		// send verification email
		try {
			// Dont forget to add https during prod
			const verification_link = `http://localhost:5173/verify-email?user_id=${user_id}&token=${token}`;
			await sendEmail(
				email,
				'Verify Your Email',
				`Hi there! 👋 Please <a href="${verification_link}">verify your email</a>, to contine with us. If you did not request this email, feel free to ignore it! 
				
				`
			);
		} catch (err) {
			console.log(err);
			return fail(500, {
				ErrorMsg: 'The server is unable to send and email for verificaion. Please try again later'
			});
		}
		throw redirect(303, '/verify-email-display');
	}
} satisfies Actions;
