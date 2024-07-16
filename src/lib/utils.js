import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export async function requireAuth(event) {
	const token = event.cookies.get('session');
	if (!token) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}

	try {
		//Verify the session token
		const decoded = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return json({ success: false, error: 'Unauthorized' }, { status: 401 });
			}
		});

		event.locals.user = decoded;
	} catch (error) {
		return json({ success: false, error: 'Unauthorized' }, { status: 401 });
	}
}
