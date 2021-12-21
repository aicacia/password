<script lang="ts">
	import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
	import { deletePassword, addPassword, passwordsById, passwordsByUrl } from '$lib/state/passwords';
	import Modal from './Modal.svelte';
	import Password from './Password.svelte';
	import { base } from '$app/paths';

	let url: string;
	let username: string;
	let password: string;

	let search = '';
	let open = false;

	let deleteId: string;
	let deleteOpen = false;
	$: deleteEntry = $passwordsById[deleteId];

	$: onOpenDeleteModal = (id: string) => {
		deleteId = id;
		deleteOpen = true;
	};
	$: onDelete = () => {
		deletePassword(deleteId);
		deleteId = undefined;
		deleteOpen = false;
	};
</script>

<div class="flex justify-between mb-2">
	<button class="btn primary" on:click={() => (open = !open)}>Add</button>
	<a class="btn primary" href={`${base}/keys`}>Keys</a>
</div>

<Modal bind:open>
	<input class="input mt-1" type="text" placeholder="Application" bind:value={url} />
	<input class="input mt-1" type="text" placeholder="Username" bind:value={username} />
	<input class="input mt-1" type="password" placeholder="Password" bind:value={password} />
	<button class="btn primary mt-3" on:click={() => addPassword(url, username, password)}>Add</button
	>
</Modal>

<Modal bind:open={deleteOpen}>
	<h3 slot="title">Deleting Password</h3>
	<p class="mb-2">Delete {deleteEntry?.url} {deleteEntry?.username} Password?</p>
	<button class="btn danger" on:click={onDelete}> >Delete</button>
</Modal>

<input class="input" type="text" placeholder="Search..." bind:value={search} />

<div class="mt-1">
	{#each Object.entries($passwordsByUrl) as [url, passwords]}
		<h2 class="mt-2">Application: {url}</h2>
		{#each passwords.filter( (entry) => (search ? fuzzyEquals(search, entry.username) : true) ) as entry}
			<Password
				id={entry.id}
				{url}
				username={entry.username}
				password={entry.password}
				onDelete={onOpenDeleteModal}
			/>
		{/each}
	{/each}
</div>
