<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { form, data } = $props();
</script>

<h1 class="mt-4 mb-8 text-3xl font-bold">Edit Existing Posts</h1>

<div>
	{#each data.allPosts as post (post.slug)}
		<div class="mb-4 border-b p-4">
			<div class="flex items-center justify-between">
				<h2 class="text-xl font-semibold">{post.title}</h2>
				<button
					onclick={async () => await goto(resolve(`/admin/edit/${post.slug}`))}
					class="rounded bg-indigo-600 px-4 py-2 text-white transition hover:cursor-pointer hover:bg-indigo-700"
				>
					Edit
				</button>
			</div>
		</div>
	{/each}
</div>

<h1 class="mt-4 mb-8 text-3xl font-bold">Create New Post</h1>

{#if form?.message}
	<p class="mb-4 rounded bg-red-100 p-4 text-red-700">{form.message}</p>
{/if}

<form method="POST" class="space-y-6">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<label class="block">
			<span class="text-gray-700 dark:text-gray-300">Title</span>
			<input
				name="title"
				type="text"
				placeholder="ZombieNW's New Idea"
				class="mt-1 block w-full border-b p-2 outline-none"
				required
			/>
		</label>

		<label class="block">
			<span class="text-gray-700 dark:text-gray-300">Slug (URL)</span>
			<input
				name="slug"
				type="text"
				placeholder="znw-new-idea"
				class="mt-1 block w-full border-b p-2 outline-none"
				required
			/>
		</label>
	</div>

	<label class="block">
		<span class="text-gray-700 dark:text-gray-300">Description</span>
		<input
			name="description"
			type="text"
			class="mt-1 block w-full border-b p-2 outline-none"
			placeholder="This is ZombieNW's new crazy idea that he is totally writing about."
		/>
	</label>

	<label class="block">
		<span class="text-gray-700 dark:text-gray-300">Content (Markdown)</span>
		<textarea
			name="content"
			rows="15"
			class="mt-1 block w-full border-b p-2 font-mono text-sm outline-none"
			placeholder="Markdown goes here..."
			required
		></textarea>
	</label>

	<button
		type="submit"
		class="w-full rounded-md bg-indigo-600 px-6 py-2 text-white transition hover:cursor-pointer hover:bg-indigo-700"
	>
		Publish Post
	</button>
</form>
