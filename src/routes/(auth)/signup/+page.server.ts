import { query } from '$lib/db';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';

export const actions = {
	signup: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		try {
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			await query(
				'INSERT INTO users (email, password) VALUES ($1, $2)',
				[email, hashedPassword] // You should hash the password first!
			);
		} catch (err) {
			console.log(err);
		}
	}
} satisfies Actions;

// length: 229,
// severity: 'ERROR',
// code: '23505',
// detail: "Key (email)=('baskaran_naresh@students.edu.sg') already exists.",
// hint: undefined,
// position: undefined,
// internalPosition: undefined,
// internalQuery: undefined,
// where: undefined,
// schema: undefined,
// table: undefined,
// column: undefined,
// dataType: undefined,
// constraint: 'users_email_key',
// file: 'errors.go',
// line: '121',
// routine: 'NewUniquenessConstraintViolationError'
// }
