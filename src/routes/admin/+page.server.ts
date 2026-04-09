import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const title = data.get('title') as string;
		const slug = data.get('slug') as string;
		const description = data.get('description') as string;
		const content = data.get('content') as string;

		if (!title || !slug || !content) {
			return fail(400, { message: 'Missing required fields' });
		}

		try {
			await db.insert(posts).values({
				title,
				slug,
				description,
				content
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not save post.' });
		}

		throw redirect(303, `/posts/${slug}`);
	}
};
