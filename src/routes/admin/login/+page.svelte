<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="login-container">
	<h1>Admin Login</h1>

	<form method="POST" use:enhance>
		<label>
			Username
			<input name="username" type="text" required />
		</label>

		<label>
			Password
			<input name="password" type="password" required />
		</label>

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

		<button type="submit">Login</button>
	</form>
</div>

<style>
	/* Your traditional CSS goes here */
	.login-container {
		max-width: 400px;
		margin: 2rem auto;
	}
	.error {
		color: red;
	}
	input {
		display: block;
		width: 100%;
		margin-bottom: 1rem;
	}
</style>
