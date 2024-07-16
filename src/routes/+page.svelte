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

	onMount(() => {
		const posts = loadPosts(1, 10);
	});
</script>

<body class="dark:bg-gray-900 bg-gray-50 h-full dark:text-white m-4">
	{#each posts as post}
		<a href={`/posts/${generateSlug(post.title)}`}>
			<h1>{post.title}</h1>
			<h2 class="text-sm">
				{formatDate(new Date(post.created_at))}
				{post.created_at !== post.updated_at ? `• Updated ${formatDate(new Date(post.updated_at))}` : ''}
			</h2>
		</a>
	{/each}
</body>
