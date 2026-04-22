import { ADMIN_USERNAME, ADMIN_PASSWORD } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
			return fail(401, { error: 'Invalid credentials' });
		}

		// make cookie
		cookies.set('admin_session', ADMIN_PASSWORD, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 // 1 day
		});

		throw redirect(303, '/admin');
	}
};
