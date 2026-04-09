<script>
	import { resolve } from '$app/paths';
	let { post } = $props();
</script>

<div class="border-b border-gray-200 py-4 dark:border-zinc-700">
	<h2 class="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-200">{post.title}</h2>
	<p class="mb-4 text-zinc-600 dark:text-zinc-400">{post.description}</p>
	<a href={resolve(`/posts/${post.slug}`)} class="text-indigo-500 hover:underline">Read more</a>
</div>
