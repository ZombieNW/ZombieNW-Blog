import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { posts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const slug = params.slug;
	const post = await db.query.posts.findFirst({
		where: (posts, { eq }) => eq(posts.slug, slug)
	});
	return { post };
};

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();

		const title = data.get('title') as string;
		const description = data.get('description') as string;
		const content = data.get('content') as string;

		if (!title || !content) {
			return fail(400, { message: 'Missing required fields' });
		}

		try {
			await db
				.update(posts)
				.set({
					title,
					slug: params.slug,
					description,
					content
				})
				.where(eq(posts.slug, params.slug));
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not save post.' });
		}

		throw redirect(303, `/posts/${params.slug}`);
	}
};
