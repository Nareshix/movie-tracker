import { query } from '$lib/db';
import type { Actions } from './$types';

export const actions = {
	signup: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		try {
			const result = await query(
				'INSERT INTO users (email, password) VALUES ($1, $2)',
				[email, password] // You should hash the password first!
			);
			console.log(result);
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
