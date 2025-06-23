import { query } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

const ADD_USER_AFTER_VERIFICATION = `
    WITH moved_user AS (
        DELETE FROM unverified_users
        WHERE token = $1 AND user_id = $2
        RETURNING email, hashed_password
    )
    INSERT INTO users (email, hashed_password)
    SELECT email, hashed_password FROM moved_user;
`;

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');
	const user_id = url.searchParams.get('user_id');
	let result;
	try {
		 result = await query(ADD_USER_AFTER_VERIFICATION, [token, user_id]);
	} catch (err) {
		// log it
		console.log(err)
		return {
			error: 'There is an error in server. Please try again'
		}
	}

	if (result.rowCount === 0) {
		return {
			error: 'This verification link is invalid or has expired.'
		};
	}
	redirect(307, '/');

};
