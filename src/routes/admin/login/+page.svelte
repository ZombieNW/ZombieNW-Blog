<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();

	type State = 'username' | 'password' | 'submit' | 'error';

	let terminalState: State = $state('username');
	let username = $state('');
	let password = $state('');
	let displayPassword = $state('');

	let lines: string[] = $state([
		'ZombieNW Brand Terminal Emulator [Version 1.1.0]',
		'(c) ZombieNW. All rights reserved.',
		''
	]);

	// actual inputs
	let usernameInput: HTMLInputElement;
	let passwordInput: HTMLInputElement;
	let formElement: HTMLFormElement;
	let terminalElement: HTMLElement;

	function handleKey(e: KeyboardEvent) {
		if (terminalState === 'submit') return;
		if (e.key === 'Enter') {
			if (terminalState === 'username') {
				lines = [...lines, `login> ${username}`];
				terminalState = 'password';
			} else if (terminalState === 'password') {
				lines = [...lines, `password> ${'*'.repeat(password.length)}`, ''];
				terminalState = 'submit';
				usernameInput.value = username;
				passwordInput.value = password;
				formElement.requestSubmit();
			}
			return;
		}

		if (e.key === 'Backspace') {
			if (terminalState === 'username') username = username.slice(0, -1);
			else if (terminalState === 'password') {
				password = password.slice(0, -1);
				displayPassword = displayPassword.slice(0, -1);
			}
		}

		if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;

		if (terminalState === 'username') {
			username += e.key;
		} else if (terminalState === 'password') {
			password += e.key;
			displayPassword += '*';
		}

		scrollBottom();
	}

	function scrollBottom() {
		setTimeout(() => terminalElement?.scrollTo(0, terminalElement.scrollHeight), 0);
	}

	let currentLine = $derived(
		terminalState === 'username'
			? `login> ${username}`
			: terminalState === 'password'
				? `password> ${'*'.repeat(password.length)}`
				: terminalState === 'submit'
					? 'Authenticating...'
					: ''
	);

	$effect(() => {
		if (form?.error && terminalState === 'submit') {
			lines = [...lines, `Access denied: ${form.error}`, ''];
			username = '';
			password = '';
			displayPassword = '';
			terminalState = 'username';
		}
	});
</script>

<svelte:head><title>ZombieNW's Blog Admin Login</title></svelte:head>

<svelte:window on:keydown={handleKey} />

<!-- imaginary form used for server interaction -->
<form bind:this={formElement} method="POST" use:enhance class="hidden">
	<input bind:this={usernameInput} name="username" type="text" />
	<input bind:this={passwordInput} name="password" type="password" />
</form>

<div class="mx-auto my-12 w-full font-mono text-sm select-none">
	<!-- Title -->
	<div
		class="flex items-center justify-between gap-2 rounded-t-lg bg-gray-300 px-4 py-1 text-gray-950"
	>
		<span class="text-xs tracking-wide">Terminal</span>
		<div class="flex gap-1.5 text-lg">
			<span>-</span>
			<span>□</span>
			<span>⨯</span>
		</div>
	</div>
	<!-- Terminal -->
	<div
		bind:this={terminalElement}
		class="h-96 cursor-text overflow-y-auto rounded-b-lg bg-gray-950 p-4 leading-6 text-gray-300"
	>
		{#each lines as line, i (i)}
			<div class="break-all whitespace-pre-wrap">{line || '\u00A0'}</div>
		{/each}

		{#if terminalState !== 'submit'}
			<div class="flex items-center">
				<span class="whitespace-pre">{currentLine}</span>
				<span class="ml-px inline-block h-[1em] w-[0.5em] animate-pulse bg-gray-300"></span>
			</div>
		{:else}
			<div class="text-gray-300">{currentLine}</div>
		{/if}
	</div>
</div>
