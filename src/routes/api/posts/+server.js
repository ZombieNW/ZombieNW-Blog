import { json } from '@sveltejs/kit';
import { createPost, updatePost, getPaginatedPosts, deletePost } from '$lib/db.js';
import dotenv from 'dotenv';

import { requireAuth } from '$lib/utils.js';
import { generateSlug } from '$lib/clientUtils.js';

dotenv.config();

export async function GET(event) {
	const url = new URL(event.request.url);
	const page = parseInt(url.searchParams.get('page') || '1');
	const postsPerPage = parseInt(url.searchParams.get('postsPerPage') || '10');

	try {
		const { posts, totalPages, currentPage } = getPaginatedPosts(page, postsPerPage);
		return json({
			success: true,
			posts,
			totalPages,
			currentPage,
			postsPerPage
		});
	} catch (error) {
		console.error('Error fetching paginated posts:', error);
		return json({ success: false, error: 'Error Fetching Posts' }, { status: 500 });
	}
}

export async function DELETE(event) {
	const authResult = await requireAuth(event);
	if (authResult) return authResult;

	const { id } = await event.request.json();
	const deletedPost = await deletePost(id);
	return json({ success: true, error: 'Post Deleted' });
}

export async function POST(event) {
	const authResult = await requireAuth(event);
	if (authResult) return authResult;

	const { title, content, description } = await event.request.json();
	const newPost = await createPost(title, content, description);
	return json(newPost, { success: true });
}

export async function PUT(event) {
	const authResult = await requireAuth(event);
	if (authResult) return authResult;

	const { id, title, content, description } = await event.request.json();
	const updatedPost = await updatePost(id, title, content, description);
	return json(updatedPost, { success: true });
}
