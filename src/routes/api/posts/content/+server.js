import { json } from '@sveltejs/kit';
import { getPostById, getPostBySlug } from '$lib/db.js';
import dotenv from 'dotenv';

import { requireAuth } from '$lib/utils.js';
import { generateSlug } from '$lib/clientUtils.js';

dotenv.config();

export async function GET(event) {
	const url = new URL(event.request.url);
	const id = parseInt(url.searchParams.get('id') || 'not_found');

	try {
		if (!isNaN(id)) {
			const post = await getPostById(id);
			return json({
				success: true,
				post
			});
		} else {
			const post = await getPostBySlug(url.searchParams.get('id'));
			return json({
				success: true,
				post
			});
		}
	} catch (error) {
		return json({ success: false, error: 'Error Fetching Post' }, { status: 500 });
	}
}
