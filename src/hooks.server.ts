import { ADMIN_USERNAME, ADMIN_PASSWORD } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin')) {
		const auth = event.request.headers.get('Authorization');

		if (auth) {
			// decode
			const base64Credentials = auth.split(' ')[1];
			const credentials = atob(base64Credentials);
			const [username, password] = credentials.split(':');

			// check against .env
			if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
				return resolve(event);
			}
		}

		// login
		return new Response('Unauthorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic realm="Admin Access", charset="UTF-8"'
			}
		});
	}

	return resolve(event);
};
