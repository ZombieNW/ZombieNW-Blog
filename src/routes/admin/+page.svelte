<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let username = '';
	let password = '';
	let error = '';

	async function login() {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const result = await response.json();

		if (result.success) {
			goto('/admin/dashboard');
		} else {
			error = result.error || 'Login failed';
		}
	}

	async function logout() {
		await fetch('/api/logout', { method: 'POST' });
		goto('/admin');
	}
</script>

{#if $page.data.user}
	<h1>Welcome, Admin!</h1>

	<button on:click={logout}>Logout</button>
	<!-- Add your admin panel content here -->
{:else}
	<h1>Admin Login</h1>
	<form on:submit|preventDefault={login}>
		<input type="text" bind:value={username} placeholder="Username" required />
		<input type="password" bind:value={password} placeholder="Password" required />
		<button type="submit">Login</button>
	</form>
	{#if error}
		<p class="error">{error}</p>
	{/if}
{/if}
