import { validateSessionToken } from '$lib/session';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const mainAppRoutes = ['/discover', '/search', '/home', '/lists'];
	const authRoutes = [
		'/login',
		'/signup',
		'/reset-password',
		'/verify-email',
		'/verify-email-display'
	];

	if (authRoutes.includes(event.url.pathname)) {
		const sessionToken = event.cookies.get('sessionToken');
		if (sessionToken) {
			throw redirect(303, '/home');
		}
	}

	if (mainAppRoutes.includes(event.url.pathname)) {
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
