<script>
	import { resolve } from '$app/paths';
	let { post } = $props();
</script>

<div class="border-b border-gray-200 py-3 dark:border-zinc-700">
	<div class="flex items-center justify-between gap-1">
		<a
			href={resolve(`/posts/${post.slug}`)}
			class="mb-1 border-b-2 border-transparent text-xl font-semibold text-zinc-800 transition-all hover:border-zinc-400 dark:text-zinc-200 dark:hover:border-zinc-500"
		>
			{post.title}
		</a>
		<span class="text-sm text-zinc-500 dark:text-zinc-400"
			>{post.createdAt?.toLocaleDateString() ?? 'Unknown'}</span
		>
	</div>
	<p class="my-1 text-zinc-600 dark:text-zinc-400">{post.description}</p>
</div>
