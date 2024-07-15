import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function handle({ event, resolve }) {
	const sessionToken = event.cookies.get('session');

	if (sessionToken) {
		try {
			const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
			event.locals.user = { isAdmin: true, username: decoded.username };
		} catch (error) {
			event.cookies.delete('session', { path: '/' });
		}
	}

	const response = await resolve(event);
	return response;
}
