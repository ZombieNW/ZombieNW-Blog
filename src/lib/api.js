export async function createPost(title, content) {
	const response = await fetch('/api/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title, content })
	});

	if (!response.ok) {
		throw new Error('Failed to create post');
	}

	return response.json();
}

export async function deletePost(id) {
	const response = await fetch('/api/posts', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id })
	});

	if (!response.ok) {
		throw new Error('Failed to delete post');
	}

	return response.json();
}

export async function fetchPosts(page = 1, postsPerPage = 10) {
	const response = await fetch(`/api/posts?page=${page}&postsPerPage=${postsPerPage}`);

	if (!response.ok) {
		throw new Error('Failed to fetch posts');
	}

	return response.json();
}

export async function updatePost(id, title, content) {
	const response = await fetch(`/api/posts`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id, title, content })
	});

	if (!response.ok) {
		throw new Error('Failed to update post');
	}

	return response.json();
}
