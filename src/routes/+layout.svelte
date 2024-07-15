<script>
	import DarkModeToggle from '../components/DarkModeToggle.svelte';
	import '../app.css';
</script>

<nav class="p-4 bg-gray-200 dark:bg-gray-800">
	<div class="flex justify-between items-center">
		<h1 class="text-xl font-bold dark:text-white">blog.zombienw.com</h1>
		<DarkModeToggle />
	</div>
</nav>

<slot />
