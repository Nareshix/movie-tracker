import { query } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendEmail } from '$lib/server/email';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

export const actions = {
	reset: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		// checks if email exists in db
		let user_id;
		try {
			const result = await query('SELECT id FROM users WHERE email=$1', [email]);
			if (result.rowCount === 0) {
				return fail(409, {
					ErrorMsg: 'email does not exist. Please sign up'
				});
			}

			user_id = result.rows[0].id;
		} catch (err) {
			console.log(err);
		}

		const token = nanoid();
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// store token temporarily in reset_password db
		try {
			await query(
				'INSERT INTO reset_password (reset_password_token, user_id, hashed_password) VALUES($1, $2, $3)',
				[token, user_id, hashedPassword]
			);
		} catch (err) {
			// log it
			console.log(err);
			return fail(500, {
				ErrorMsg: 'An error has occured. Please try again later'
			});
		}

		// send reset password token
		try {
			// Dont forget to add https during prod
			const verification_link = `http://localhost:5173/reset-password/${token}`;
			await sendEmail(
				email,
				'Verify Your Email',
				`Hi there! 👋 <a href="${verification_link}">Reset your password</a>.  If you did not request this, it is <strong>strongly recommended</strong> to change your password! 
				
				`
			);
		} catch (err) {
			console.log(err);
			return fail(500, {
				ErrorMsg: 'The server is unable to send and email for verificaion. Please try again later'
			});
		}
	}
} satisfies Actions;
