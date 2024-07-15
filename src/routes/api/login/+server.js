import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function POST({ request, cookies }) {
	const { username, password } = await request.json();

	if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
		const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' });

		cookies.set('session', token, {
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 60 * 60 * 24 * 7 // 1 Week
		});

		return json({ success: true });
	}

	return json({ success: false, error: 'Invalid Login' }, { status: 401 });
}
