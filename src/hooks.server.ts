import { validateSessionToken } from '$lib/session';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const protectedRoutes = ['/discover', '/search', '/home', '/lists'];

	if (protectedRoutes.includes(event.url.pathname)) {
		const sessionToken = event.cookies.get('sessionToken');
		if (!sessionToken) {
			throw redirect(303, '/login');
		}

		const sessionValid = await validateSessionToken(sessionToken);
		if (!sessionValid) {
			throw redirect(303, '/login');
		}
	}

	const response = await resolve(event);
	return response;
};
