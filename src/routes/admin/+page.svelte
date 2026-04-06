<script lang="ts">
	let { form } = $props();
</script>

<div class="mx-auto max-w-4xl p-8">
	<h1 class="mb-8 text-3xl font-bold">Create New Post</h1>

	{#if form?.message}
		<p class="mb-4 rounded bg-red-100 p-4 text-red-700">{form.message}</p>
	{/if}

	<form method="POST" class="space-y-6">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<label class="block">
				<span class="text-gray-700">Title</span>
				<input name="title" type="text" class="mt-1 block w-full rounded-md border p-2" required />
			</label>

			<label class="block">
				<span class="text-gray-700">Slug (URL)</span>
				<input
					name="slug"
					type="text"
					placeholder="my-blog-post"
					class="mt-1 block w-full rounded-md border p-2"
					required
				/>
			</label>
		</div>

		<label class="block">
			<span class="text-gray-700">Short Description</span>
			<input name="description" type="text" class="mt-1 block w-full rounded-md border p-2" />
		</label>

		<label class="block">
			<span class="text-gray-700">Content (Markdown)</span>
			<textarea
				name="content"
				rows="15"
				class="mt-1 block w-full rounded-md border p-2 font-mono text-sm"
				placeholder="Paste your markdown here..."
				required
			></textarea>
		</label>

		<button
			type="submit"
			class="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
		>
			Publish Post
		</button>
	</form>
</div>
