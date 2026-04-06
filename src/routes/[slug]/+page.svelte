<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title}</title>
</svelte:head>

<article class="mx-auto max-w-3xl px-4 py-12">
	<header class="mb-8">
		<h1 class="mb-2 text-4xl font-bold">{data.post.title}</h1>
		<time class="text-gray-500">
			{data.post.createdAt?.toLocaleDateString() ?? 'Unknown'}
		</time>
	</header>

	<div class="prose lg:prose-xl dark:prose-invert prose-pre:p-0">
		{@html data.post.html}
	</div>
</article>
