<script>
	import Hero from '$lib/components/Hero.svelte';
	import ListPost from '$lib/components/ListPost.svelte';
	let { data } = $props();
</script>

<svelte:head><title>ZombieNW's Blog</title></svelte:head>

<Hero />
<h1 class="mt-4 border-b border-gray-700 py-1 text-2xl font-bold">Posts</h1>
{#each data.allPosts as post (post.id)}
	<ListPost {post} />
{/each}
