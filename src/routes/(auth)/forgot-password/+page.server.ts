import { query } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	reset: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		// checks if email exists in db
		try {
			const result = await query('SELECT 1 FROM users WHERE email=$1', [email]);
			if (result.rowCount === 0) {
				return fail(409, {
					ErrorMsg: 'email does not exist. Please sign up'
				});
			}
		} catch (err) {
			console.log(err);
		}
	}
} satisfies Actions;
