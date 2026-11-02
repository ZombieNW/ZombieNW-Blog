<script>
	import Hero from '$lib/components/Hero.svelte';
	import ListPost from '$lib/components/ListPost.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>ZombieNW's Blog</title>
	<meta
		name="description"
		content="This is where I talk about stuff on the internet, or make really bad jokes, or, if you're lucky, both at once..."
	/>
</svelte:head>

<Hero />

<section class="mt-8" aria-labelledby="posts-heading">
	<!-- Posts Header -->
	<div class="flex items-baseline justify-between border-b border-gray-700 pb-2">
		<h1 id="posts-heading" class="text-2xl font-bold">Posts</h1>
	</div>

	<!-- Post List -->
	<div class="mt-2 flex flex-col">
		{#each data.allPosts as post (post.id)}
			<ListPost {post} />
		{:else}
			<p class="py-8 text-center text-gray-500">Nothing here yet. Check back soon.</p>
		{/each}
	</div>
</section>
