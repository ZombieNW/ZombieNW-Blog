<script>
	import Hero from '$lib/components/Hero.svelte';
	import ListPost from '$lib/components/ListPost.svelte';
	let { data } = $props();
</script>

<Hero />
{#each data.allPosts as post (post.id)}
	<ListPost {post} />
{/each}
