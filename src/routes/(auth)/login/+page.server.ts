import { query } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import { createSession } from '$lib/session';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		// checks if password is correct with db, then create a session
		try {
			const result = await query('SELECT id, hashed_password FROM users WHERE email=$1', [email]);

			if (result.rowCount === 0) {
				return fail(409, {
					ErrorMsg: 'email does not exist. Please sign up'
				});
			}
			const user_id = result.rows[0].id;
			const hashed_password = result.rows[0].hashed_password;
			const isMatch = await bcrypt.compare(password, hashed_password);

			if (isMatch) {
				const session = await createSession(user_id);
				cookies.set('sessionToken', session.token, { path: '/' });
			} else {
				return fail(401, {
					ErrorMsg: 'Wrong Password'
				});
			}
		} catch (err) {
			console.log(err);
		}
		throw redirect(303, '/home');
	}
} satisfies Actions;
