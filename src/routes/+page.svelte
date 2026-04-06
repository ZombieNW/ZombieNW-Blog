<script>
	let { data } = $props();
</script>

{#each data.allPosts as post}
	<div class="post">
		<a href="/post/{post.slug}">{post.title}</a>
		<p>{post.description}</p>
	</div>
{/each}
