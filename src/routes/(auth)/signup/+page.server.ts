import { query } from '$lib/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';

interface ErrorDB {
	message: string;
	code: string;
}

export const actions = {
	signup: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		try {
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			await query(
				'INSERT INTO users (email, hashed_password) VALUES ($1, $2)',
				[email, hashedPassword] // You should hash the password first!
			);
		} catch (err) {
			const error = err as ErrorDB;
			if (error.code == '23505') {
				return fail(401, {
					ErrorMsg: 'This email is already registered.'
				});
			}
			console.log(error.message);
			return fail(401, {
				ErrorMsg: 'An error has occured within the system. Pleas try again later.'
			});
		}
	}
} satisfies Actions;
