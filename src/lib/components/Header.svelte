<script>
	import { resolve } from '$app/paths';
</script>

<div class="flex justify-between border-b border-zinc-700 py-1">
	<a href={resolve('/')}>ZombieNW's Blog</a>
	<div class="flex gap-4 text-zinc-800 dark:text-zinc-300">
		<a href={resolve('/posts')}>posts</a>
		<a href="https://zombienw.com">zombienw.com</a>
	</div>
</div>
