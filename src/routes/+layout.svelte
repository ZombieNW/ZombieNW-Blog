<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="/logo-small.png" /></svelte:head>

<main class="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-200">
	<div class="mx-auto w-full max-w-4xl px-4 py-8">
		<Header />
		{@render children()}
		<div class="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
			by ZombieNW with ❤️, {new Date().getFullYear()}
		</div>
	</div>
</main>
