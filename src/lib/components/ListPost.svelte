<script>
	import { resolve } from '$app/paths';
	let { post } = $props();
</script>

<div class="border-b border-gray-700 py-3">
	<div class="flex items-center justify-between gap-1">
		<a
			href={resolve(`/posts/${post.slug}`)}
			class="mb-1 border-b-2 border-transparent text-xl font-semibold text-gray-200 transition-all hover:border-gray-500"
		>
			{post.title}
		</a>
		<span class="text-sm text-gray-400">{post.createdAt?.toLocaleDateString() ?? 'Unknown'}</span>
	</div>
	<p class="my-1 text-gray-400">{post.description}</p>
</div>
