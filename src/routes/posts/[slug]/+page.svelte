<script>
	import { onMount } from 'svelte';
	import { getPost } from '$lib/api.js';
	import { formatDate } from '$lib/clientUtils.js';
	import MarkdownRenderer from '../../../components/MarkdownRenderer.svelte';

	export let data;
	const { postId } = data;
	let post = {};

	onMount(async () => {
		const postResult = await getPost(postId);
		post = postResult.post;
	});
</script>

<title>{post.title} • ZombieNW's Blog</title>

<h1 class="text-3xl font-black mb-4">{post.title}</h1>
<h2 class="text-md text-light_text_darker dark:text-dark_text_darker my-3 flex justify-between">
	<span>
		{formatDate(new Date(post.created_at))}
		{post.created_at !== post.updated_at ? `• Updated ${formatDate(new Date(post.updated_at))}` : ''}
	</span>
</h2>

<h3 class="mt-8 mb-16">
	{post.description}
</h3>

<div>
	{#key post.content}
		<MarkdownRenderer content={post.content} />
	{/key}
</div>
