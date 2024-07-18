<script>
	import { onMount } from 'svelte';
	import { fetchPosts } from '$lib/api.js';
	import { generateSlug } from '$lib/clientUtils.js';

	let posts = [];
	let totalPages = 1;
	let currentPage = 1;

	async function loadPosts(page, postsPerPage) {
		const postsResponse = await fetchPosts(page, postsPerPage);
		posts = postsResponse.posts;
		totalPages = postsResponse.totalPages;
		return postsResponse;
	}

	function formatDate(date) {
		const month = new Date(date).toLocaleString('default', { month: 'short' });
		const day = new Date(date).getDate();
		const year = new Date(date).getFullYear();
		return `${month.slice(0, 3)} ${day}, ${year}`;
	}

	function formatPreview(content) {
		if (content) {
			return content.split(' ').slice(0, 24).join(' ') + (content.split(' ').length > 24 ? '...' : '');
		} else return '';
	}

	async function changePage(page) {
		currentPage = page;
		await loadPosts(page, 10);
	}

	onMount(() => {
		loadPosts(1, 10);
	});
</script>

{#each posts as post}
	<div class="my-8">
		<a href={`/posts/${generateSlug(post.title)}`} class="text-2xl font-semibold my-3 inline-block">{post.title}</a>
		<h2 class="truncate-lines-3 text-light_text_darker dark:text-dark_text_darker flex">
			{#if post.description}
				<span class="mr-2">{formatPreview(post.description)}</span>
			{/if} <a href="/posts/{generateSlug(post.title)}" class="text-light_text dark:text-dark_text underline hidden sm:block">Read Post</a>
		</h2>
		<h2 class="text-sm text-light_text_darker dark:text-dark_text_darker my-3">
			{formatDate(new Date(post.created_at))}
			{post.created_at !== post.updated_at ? `• Updated ${formatDate(new Date(post.updated_at))}` : ''}
		</h2>
	</div>
{/each}

<div class="text-2xl flex justify-center gap-2">
	{#if currentPage === 1}
		<span class="opacity-50">⬅️ </span>
	{:else}
		<button on:click={() => changePage(currentPage - 1)}>⬅️</button>
	{/if}
	{#if currentPage - 1 > 0}
		<span>{currentPage - 1}</span>
	{/if}
	<span class="underline font-bold">{currentPage}</span>
	{#if currentPage + 1 < totalPages + 1}
		<span>{currentPage + 1}</span>
	{/if}
	{#if currentPage === totalPages}
		<span class="opacity-50">➡️</span>
	{:else}
		<button on:click={() => changePage(currentPage + 1)}>➡️</button>
	{/if}
</div>
