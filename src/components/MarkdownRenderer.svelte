<script>
	import { parseMarkdown } from '$lib/markdownParser';
	import { onMount } from 'svelte';

	export let content = '';

	let classes;
	export { classes as class };

	let parsedContent = '';

	onMount(() => {
		parsedContent = parseMarkdown(content);
	});
</script>

<div class={classes}>
	{@html parsedContent}
</div>
