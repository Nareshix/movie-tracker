import { query } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendEmail } from '$lib/server/email';
import { nanoid } from 'nanoid';
export const actions = {
	reset: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
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

		// store token temporarily in reset_password db
		try {
			await query('INSERT INTO reset_password (reset_password_token, user_id) VALUES($1, $2)', [
				token,
				user_id
			]);
		} catch (err) {
			// log it
			console.log(err);
			return fail(500, {
				ErrorMsg: 'An error has occured. Please try again later'
			});
		}

		// send verificatoin email
		try {
			// Dont forget to add https during prod
			const verification_link = `http://localhost:5173/reset-password/${token}`;
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
	}
} satisfies Actions;
