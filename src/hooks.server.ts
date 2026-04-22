import { ADMIN_PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin') && event.url.pathname !== '/admin/login') {
		const session = event.cookies.get('admin_session');

		if (session !== ADMIN_PASSWORD) {
			throw redirect(303, '/admin/login');
		}
	}

	return resolve(event);
};
