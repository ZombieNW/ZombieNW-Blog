<script>
	import { resolve } from '$app/paths';
</script>

<div class="flex justify-between border-b border-gray-700 py-1">
	<a href={resolve('/')} class="flex items-center text-2xl">
		<img src="./logo.png" alt="ZombieNW Star" class="mx-2 aspect-square h-6" />
		ZombieNW's Blog
	</a>
	<div class="flex items-end gap-4 text-gray-400">
		<!-- <a href={resolve('/posts')}>posts</a> -->
		<a href="https://zombienw.com">zombienw.com</a>
	</div>
</div>
