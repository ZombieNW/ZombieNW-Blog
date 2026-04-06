<script>
	import ListPost from '$lib/components/ListPost.svelte';
	let { data } = $props();
</script>

{#each data.allPosts as post}
	<ListPost {post} />
{/each}
