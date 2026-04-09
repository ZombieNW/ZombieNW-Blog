<script lang="ts">
	let { data } = $props();
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<svelte:head>
	<title>{data.post.title}</title>
</svelte:head>

<article class="mx-auto">
	<header class="mt-8 mb-4">
		<h1 class="mb-2 text-5xl font-black">{data.post.title}</h1>
		<time class="my-1 text-gray-500 dark:text-gray-400">
			{data.post.createdAt?.toLocaleDateString() ?? 'Unknown'}
		</time>
	</header>

	<div class="prose mb-12 lg:prose-xl dark:prose-invert prose-pre:px-4 prose-pre:py-1">
		{@html data.post.html}
	</div>
</article>
