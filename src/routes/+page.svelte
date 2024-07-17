<script>
	import { onMount } from 'svelte';
	import { fetchPosts } from '$lib/api.js';
	import { generateSlug } from '$lib/clientUtils.js';

	let posts = [];
	let totalPages = 1;
	let currentPage = 1;
	let pages = [];

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
		return content.split(' ').slice(0, 12).join(' ') + (content.split(' ').length > 12 ? '...' : '');
	}

	onMount(() => {
		const posts = loadPosts(1, 10);
	});
</script>

{#each posts as post}
	<div class="my-8">
		<a href={`/posts/${generateSlug(post.title)}`} class="text-2xl font-semibold leading-loose">{post.title}</a>
		<h2 class="truncate-lines-3 text-light_text_darker dark:text-dark_text_darker flex">{formatPreview(post.content)} <a href="/posts/{generateSlug(post.title)}" class="mx-2 text-light_text dark:text-dark_text underline">Read Post</a></h2>
		<h2 class="text-sm text-light_text_darker dark:text-dark_text_darker my-4">
			{formatDate(new Date(post.created_at))}
			{post.created_at !== post.updated_at ? `• Updated ${formatDate(new Date(post.updated_at))}` : ''}
		</h2>
	</div>
{/each}
