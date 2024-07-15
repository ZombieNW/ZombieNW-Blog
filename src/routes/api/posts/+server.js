import { json } from '@sveltejs/kit';
import { createPost, updatePost, getPaginatedPosts } from '$lib/db.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

async function requireAuth(event) {
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

	const { title, content } = await event.request.json();
	const newPost = await createPost(title, content);
	return json(newPost, { success: true });
}

export async function PUT(event) {
	const authResult = await requireAuth(event);
	if (authResult) return authResult;

	const { id, title, content } = await event.request.json();
	const updatedPost = await updatePost(id, title, content);
	return json(updatedPost, { success: true });
}
