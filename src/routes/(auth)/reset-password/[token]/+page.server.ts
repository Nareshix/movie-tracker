import { query } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const result = await query(
			`
			 WITH used_token AS (
				 DELETE FROM reset_password
				 WHERE reset_password_token = $1
				 RETURNING user_id, hashed_password
			 )
			 UPDATE users
			 SET hashed_password = used_token.hashed_password
			 FROM used_token
			 WHERE users.id = used_token.user_id
			 RETURNING users.id;`,
			[params.token]
		);

		if (result.rowCount === 0) {
			return {
				errorMsg: 'This reset password link is invalid or has expired. Please try again.'
			};
		}
		return { success: true };
	} catch (err) {
		// log it
		console.log(err);
		return { errorMsg: 'An unexpected error occurred. Please try again later.' };
	}
};
