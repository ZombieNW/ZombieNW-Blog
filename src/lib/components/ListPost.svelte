<script lang="ts">
	import { resolve } from '$app/paths';

	let { post } = $props();

	const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
</script>

<article
	class="group relative -mx-3 rounded-lg border-b border-gray-800 px-3 py-4 transition-colors last:border-b-transparent"
>
	<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
		<!-- Title -->
		<h2
			class="text-xl font-semibold text-gray-200 transition-colors group-hover:text-indigo-300"
		>
			<!-- The pseudo-element stretches the link over the whole card so it is all clickable. -->
			<a href={resolve(`/posts/${post.slug}`)} class="after:absolute after:inset-0">
				{post.title}
			</a>
		</h2>

		<!-- Date -->
		{#if post.createdAt}
			<time class="shrink-0 text-sm text-gray-400" datetime={post.createdAt.toISOString()}>
				{dateFormat.format(post.createdAt)}
			</time>
		{/if}
	</div>

	<!-- Description -->
	<p class="mt-1 text-gray-400">{post.description}</p>
</article>
