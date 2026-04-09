import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { parseMarkdown } from '$lib/markdown';

export const load = async ({ params }) => {
	const post = await db.query.posts.findFirst({
		where: eq(posts.slug, params.slug)
	});

	if (!post) throw error(404, 'Post not found');

	return {
		post: {
			...post,
			html: await parseMarkdown(post.content)
		}
	};
};
