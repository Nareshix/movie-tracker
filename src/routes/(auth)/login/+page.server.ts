import { query } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import { createSession } from './session';

export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		try {
			const result = await query('SELECT hashed_password FROM users WHERE email=$1', [email]);

			if (result.rowCount === 0) {
				return fail(400, {
					ErrorMsg: 'email does not exist. Please sign up'
				});
			}
			const hashed_password = result.rows[0].hashed_password;
			const isMatch = await bcrypt.compare(password, hashed_password);

			if (isMatch) {
				createSession();
				console.log('success');
			} else {
				return fail(400, {
					ErrorMsg: 'Wrong Password'
				});
			}

		} catch (err) {
			console.log(err);
		}
		
		

	}
} satisfies Actions;
