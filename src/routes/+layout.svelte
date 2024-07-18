<script>
	import DarkModeToggle from '../components/DarkModeToggle.svelte';
	import '../app.css';
</script>

<div class="h-full mx-auto sm:w-2/3 w-full py-4">
	<nav class="p-4 mb-12 border-b">
		<div class="flex justify-between items-center">
			<a href="/" class="flex items-center gap-4 text-xl font-bold">
				<img src="/favicon.png" class="h-8" alt="Sword with star in it" />
				<p class="text-xl font-bold dark:text-dark_text text-light-text flex">ZombieNW's Blog</p>
			</a>
			<DarkModeToggle />
		</div>
	</nav>

	<body class="dark:bg-dark_bg bg-light_bg dark:text-dark_text text-light-text h-full m-4">
		<slot />
	</body>

	<nav class="border-t py-4 mt-12 text-light_text_darker dark:text-dark_text_darker flex justify-between">
		<a href="https://zombienw.com/" class="hover:underline">ZombieNW {new Date().getFullYear()}</a>
		<div class="flex gap-2">
			<a href="https://www.youtube.com/@ZombieNW" class="hover:underline">youtube</a>
			<a href="https://github.com/ZombieNW" class="hover:underline">github</a>
			<a href="https://twitter.com/zombie_nw" class="hover:underline">twitter</a>
		</div>
	</nav>
</div>

<title>ZombieNW's Blog</title>
