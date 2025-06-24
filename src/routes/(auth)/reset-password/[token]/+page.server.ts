import { query } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const x = await query('SELECT 1 FROM reset_password WHERE reset_password_token = $1 ', [
			params.token
		]);

		if (x.rowCount === 0) {
			console.log('FAILIRUE')
		}
		console.log(x);

	} catch (err) {
		// log it
		console.log(err);
	}

	return {
		post: {
			title: `Title for ${params.token} goes here`,
			content: `Content for ${params.token} goes here`
		}
	};
};
