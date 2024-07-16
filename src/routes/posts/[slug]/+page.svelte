<script>
	import { onMount } from 'svelte';
	import { getPost } from '$lib/api.js';

	export let data;
	const { postId } = data;
	let post = {};

	onMount(async () => {
		post = (await getPost(postId)).post;
	});
</script>

<article class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
	<h1 class="text-3xl font-bold mb-4">{post.title}</h1>
	<div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
		{@html post.content}
	</div>
</article>
