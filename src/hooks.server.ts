import { redirect, type Handle } from '@sveltejs/kit';


export const handle: Handle = async ({ event, resolve }) => {
    const protectedRoutes = ['/discover', '/search', '/home', '/lists'];

    if (protectedRoutes.includes(event.url.pathname)) {
		redirect(307, '/login');
	}

	const response = await resolve(event);
	return response;
};
