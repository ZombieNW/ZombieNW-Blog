<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="/favicon.png" /></svelte:head>

<main class="min-h-screen">
	<div class="mx-auto w-full max-w-4xl px-4 py-8">
		<Header />
		{@render children()}
		<div class="mt-4 text-center text-sm">
			by ZombieNW with ❤️, {new Date().getFullYear()}
		</div>
	</div>
</main>
