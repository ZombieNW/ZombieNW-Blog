<script>
	import { onMount } from 'svelte';
	import { getPost } from '$lib/api.js';

	export let data;
	const { postId } = data;
	let post = {};

	onMount(async () => {
		const postResult = await getPost(postId);
		post = postResult.post;
		console.log(postResult);
	});
</script>

<h1 class="text-3xl font-bold mb-4">{post.title}</h1>
<div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
	{@html post.content}
</div>
