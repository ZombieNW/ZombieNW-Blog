<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const darkMode = writable(false);

	onMount(() => {
		const isDarkMode = localStorage.getItem('darkMode') === 'true';
		darkMode.set(isDarkMode);
		updateTheme(isDarkMode);
	});

	function toggleDarkMode() {
		darkMode.update((value) => {
			const newValue = !value;
			localStorage.setItem('darkMode', newValue);
			updateTheme(newValue);
			return newValue;
		});
	}

	function updateTheme(isDark) {
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<button on:click={toggleDarkMode} class="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
	{#if $darkMode}
		🌙
	{:else}
		☀️
	{/if}
</button>
