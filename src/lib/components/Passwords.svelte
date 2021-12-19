<script lang="ts">
	import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
	import { passwords, setPassword } from '$lib/state/passwords';
	import Modal from './Modal.svelte';
	import Password from './Password.svelte';

	let app: string;
	let username: string;
	let password: string;

	let search = '';
	let open = false;
</script>

<button class="btn primary" on:click={() => (open = !open)}>Add</button>

<Modal bind:open>
	<input class="input mt-1" type="text" placeholder="Application" bind:value={app} />
	<input class="input mt-1" type="text" placeholder="Username" bind:value={username} />
	<input class="input mt-1" type="password" placeholder="Password" bind:value={password} />
	<button class="btn primary mt-3" on:click={() => setPassword(app, username, password)}>Add</button
	>
</Modal>

<input class="input" type="text" placeholder="Search..." bind:value={search} />

<div class="mt-1">
	{#each $passwords as [app, entries]}
		<h2 class="mt-2">Application: {app}</h2>
		{#each entries.filter( (entry) => (search ? fuzzyEquals(search, entry.username) : true) ) as entry}
			<Password {app} username={entry.username} password={entry.password} />
		{/each}
	{/each}
</div>
