<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head><link rel="icon" href="/favicon.png" /></svelte:head>

<main class="custom-scrollbar min-h-screen">
	<div class="mx-auto w-full max-w-6xl px-4 py-8">
		<Header />
		{@render children()}
		<div class="mt-4 text-center text-sm">
			by ZombieNW with ❤️, {new Date().getFullYear()}
		</div>
	</div>
</main>
