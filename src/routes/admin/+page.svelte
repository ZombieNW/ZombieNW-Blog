<script>
	import { createPost, fetchPosts, updatePost, deletePost } from '$lib/api.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let title = '';
	let content = '';
	let posts = [];

	let editingPostId = null;

	$: previewHtml = marked(content);

	let username = '';
	let password = '';
	let error = '';

	let currentPage = 1;
	let totalPages = 1;

	async function changePage(page) {
		currentPage = page;
		loadPosts(page, 10);
	}

	async function handleCreatePost() {
		if (title && content) {
			if (editingPostId) {
				await updatePost(editingPostId, title, content);
				title = '';
				content = '';
				editingPostId = null;
				loadPosts(1, 10);
			} else {
				await createPost(title, content);
				title = '';
				content = '';
				loadPosts(1, 10);
			}
		}
	}

	async function handleDeletePost(id) {
		await deletePost(id);
		loadPosts(1, 10);
	}

	async function handleEditPost(post) {
		editingPostId = post.id;
		title = post.title;
		content = post.content;
	}

	async function handleStopEditing() {
		editingPostId = null;
		title = '';
		content = '';
		loadPosts(1, 10);
	}

	async function loadPosts(page, postsPerPage) {
		const postsResponse = await fetchPosts(page, postsPerPage);
		posts = postsResponse.posts;
		totalPages = postsResponse.totalPages;
		return postsResponse;
	}

	async function login() {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const result = await response.json();

		if (result.success) {
			goto('/admin/dashboard');
		} else {
			error = result.error || 'Login failed';
		}
	}

	async function logout() {
		await fetch('/api/logout', { method: 'POST' });
		goto('/admin');
	}

	onMount(async () => {
		loadPosts(1, 10);
	});
</script>

{#if $page.data.user}
	<div class="flex gap-4 mb-4">
		<h1 class="text-3xl">Welcome, Admin!</h1>
		<button on:click={logout} class="underline rounded-xl border py-1 px-4">Logout</button>
	</div>

	{#if editingPostId}
		<h2 class="text-2xl mb-4">Editing Post • {editingPostId} <button on:click={handleStopEditing}>❌</button></h2>
	{:else}
		<h2 class="text-2xl mb-4">Create Post</h2>
	{/if}

	<div class="flex justify-center w-full mx-auto">
		<form on:submit|preventDefault={handleCreatePost} class="flex flex-col w-1/2 mx-4">
			<input bind:value={title} type="text" placeholder="Post Title" required class="w-56 bg-transparent border-b my-4 focus:outline-none" />
			<textarea name="content" id="content" bind:value={content} placeholder="Post Content" required class="bg-transparent border rounded-lg p-2 h-64"></textarea>
			<button type="submit" class="underline rounded-xl border py-1 px-4 w-36 my-4">Submit</button>
		</form>
		<span class="border-l"></span>
		<div class="w-1/2 mx-4">
			<h2 class="text-2xl underline">Post Preview</h2>
			<div class="w-full h-auto min-h-64 bg-light_darker dark:bg-dark_darker rounded-lg my-4 p-2">{@html previewHtml}</div>
		</div>
	</div>

	<hr class="my-4" />

	<h2 class="text-2xl mb-4">Existing Posts</h2>

	<div>
		{#each posts as post}
			<div class="p-2 border rounded-lg w-1/2 my-4">
				<h3>
					<span class="text-2xl">{post.title}</span>
					<span>• {new Date(post.created_at).toLocaleString()}</span>
				</h3>
				<button on:click={() => handleEditPost(post)} class="underline rounded-xl border py-1 px-4">Edit</button>
				<button on:click={() => handleDeletePost(post.id)} class="underline rounded-xl border py-1 px-4">Delete</button>
			</div>
		{/each}

		<div class="text-xl">
			<button on:click={() => changePage(currentPage - 1)} disabled={currentPage === 1}> ⬅️ </button>

			<span>...{currentPage}...</span>

			<button on:click={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}> ➡️ </button>
		</div>
	</div>
{:else}
	<h1>Admin Login</h1>
	<form on:submit|preventDefault={login}>
		<input type="text" bind:value={username} placeholder="Username" required />
		<input type="password" bind:value={password} placeholder="Password" required />
		<button type="submit">Login</button>
	</form>
	{#if error}
		<p class="error">{error}</p>
	{/if}
{/if}
