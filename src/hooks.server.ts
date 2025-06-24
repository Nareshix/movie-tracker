import { validateSessionToken } from '$lib/session';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// cant access /logout without even logging in in the first place
	const routesToNotAccessWithoutLogin = ['/discover', '/search', '/home', '/lists', '/logout'];
	const routesToNotAccessWhenLoggedIn = [
		'/login',
		'/signup',
		'/reset-password',
		'/verify-email',
		'/verify-email-display'
	];

	if (routesToNotAccessWhenLoggedIn.includes(event.url.pathname)) {
		const sessionToken = event.cookies.get('sessionToken');
		if (sessionToken) {
			throw redirect(303, '/home');
		}
	}

	if (routesToNotAccessWithoutLogin.includes(event.url.pathname)) {
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
