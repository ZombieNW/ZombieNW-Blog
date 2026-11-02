<script lang="ts">
	import PostMeta from '$lib/components/PostMeta.svelte';

	let { data } = $props();
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<svelte:head>
	<PostMeta post={data.post} />
</svelte:head>

<article class="mx-auto">
	<!-- Header -->
	<header class="my-8 mx-auto">
		<h1 class="mb-2 text-5xl font-extrabold">{data.post.title}</h1>
		<time class="my-1 text-gray-400">
			{data.post.createdAt?.toLocaleDateString() ?? 'Unknown'}
			{#if data.post.updatedAt}
				<span class="mx-2">| Last Updated</span
				>{data.post.updatedAt?.toLocaleDateString() ?? 'Unknown'}
			{/if}
		</time>
	</header>

	<!-- Content -->
	<div
		class="prose mb-12 prose-invert prose-brand lg:prose-lg prose-pre:px-4 prose-pre:py-1 mx-auto"
	>
		{@html data.post.html}
	</div>
</article>
