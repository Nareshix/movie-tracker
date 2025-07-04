import { query } from '$lib/server/db';
import { createSession } from '$lib/session';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	try {
		/*
		in the SQL query, some where around
		
		deleted_sessions AS (
		...
		RETURNING user_id
		)
		
		the RETURNING can be anything for now as we are not using the value of it
		but it is important to add something else postgres will throw a syntax error
		 */
		const result = await query(
			`
				WITH used_token AS (
					DELETE FROM reset_password
					WHERE reset_password_token = $1
					RETURNING user_id, hashed_password
				),
				deleted_sessions AS (
					DELETE FROM session
					WHERE user_id = (SELECT user_id FROM used_token)
					RETURNING user_id
				)
				UPDATE users
				SET hashed_password = (SELECT hashed_password FROM used_token)
				WHERE id = (SELECT user_id FROM used_token)
				RETURNING users.id;`,
			[params.token]
		);

		if (result.rowCount === 0) {
			return {
				errorMsg: 'This reset password link is invalid or has expired. Please try again.'
			};
		}
		const user_id = result.rows[0].id;
		const session = await createSession(user_id);
		cookies.set('sessionToken', session.token, { path: '/' });

		return { success: true };
	} catch (err) {
		// log it
		console.log(err);
		return { errorMsg: 'An unexpected error occurred. Please try again later.' };
	}
};
