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

<main class="min-h-screen">
	<div class="mx-auto w-full max-w-6xl px-4 py-8">
		<!-- Header -->
		<Header />

		<!-- Page -->
		{@render children()}

		<!-- Footer -->
		<footer class="mt-4 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
			by ZombieNW with <span class="text-red-400" role="img" aria-label="love">&hearts;</span
			>,
			{new Date().getFullYear()}
		</footer>
	</div>
</main>
