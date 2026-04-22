<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="mx-auto my-12 flex w-full max-w-2xl flex-col gap-4">
	<h1 class="text-xl font-bold">Admin Login</h1>

	{#if form?.error}
		<p class="text-rose-500">{form.error}</p>
	{/if}

	<form method="POST" use:enhance>
		<label>
			Username
			<input
				name="username"
				type="text"
				class="mt-1 block w-full border-b p-2 outline-none"
				required
			/>
		</label>

		<label>
			Password
			<input
				name="password"
				type="password"
				class="mt-1 block w-full border-b p-2 outline-none"
				required
			/>
		</label>

		<button
			type="submit"
			class="mt-4 rounded bg-indigo-600 px-4 py-2 text-white transition hover:cursor-pointer hover:bg-indigo-700"
			>Login</button
		>
	</form>
</div>
