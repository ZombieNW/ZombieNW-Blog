<script lang="ts">
	import PostMeta from '$lib/components/PostMeta.svelte';

	let { data } = $props();

	const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });

	const WORDS_PER_MINUTE = 200;
	let readingMinutes = $derived.by(() => {
		const text = data.post.html.replace(/<[^>]*>/g, ' ');
		const words = text.split(/\s+/).filter(Boolean).length;
		return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
	});
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<svelte:head>
	<PostMeta post={data.post} />
</svelte:head>

<article class="mx-auto">
	<!-- Header -->
	<header class="my-8 border-b border-gray-700 pb-6">
		<h1 class="mb-3 text-4xl font-extrabold text-balance sm:text-5xl">{data.post.title}</h1>

		<p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-400">
			<!-- Date -->
			{#if data.post.createdAt}
				<time datetime={data.post.createdAt.toISOString()}>
					{dateFormat.format(data.post.createdAt)}
				</time>
			{/if}

			<!-- Updated -->
			{#if data.post.updatedAt}
				<span aria-hidden="true">&middot;</span>
				<span>
					Updated
					<time datetime={data.post.updatedAt.toISOString()}>
						{dateFormat.format(data.post.updatedAt)}
					</time>
				</span>
			{/if}

			<!-- Read Time -->
			<span aria-hidden="true">&middot;</span>
			<span>{readingMinutes} min read</span>
		</p>
	</header>

	<!-- Content -->
	<div
		class="prose mb-12 prose-invert prose-brand lg:prose-lg prose-pre:px-4 prose-pre:py-1 mx-auto max-w-3xl"
	>
		{@html data.post.html}
	</div>
</article>
