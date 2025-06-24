import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	logout: async ({cookies}) => {
		cookies.delete('sessionToken', {path: '/'})
		redirect(303, '/login')
	}
} satisfies Actions;

