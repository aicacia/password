<svelte:options immutable />

<script lang="ts" context="module">
	function searchEntry(entry: IPassword, search: string) {
		return (
			fuzzyEquals(search, entry.url) ||
			fuzzyEquals(search, entry.username) ||
			fuzzyEquals(search, entry.password)
		);
	}
</script>

<script lang="ts">
	import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
	import {
		deletePassword,
		passwordsById,
		passwordsByUrl,
		type IPassword
	} from '$lib/state/passwords';
	import Modal from './Modal.svelte';
	import Password from './Password.svelte';
	import NewPassword from './NewPassword.svelte';

	let search = '';
	let addOpen = false;

	function toggleAddOpen() {
		addOpen = !addOpen;
	}
	function closeAdd() {
		addOpen = false;
	}

	let deleteId: string | undefined;
	let deleteOpen = false;
	$: deleteEntry = deleteId ? $passwordsById[deleteId] : undefined;

	$: onOpenDeleteModal = (id: string) => {
		deleteId = id;
		deleteOpen = true;
	};
	$: onDelete = () => {
		if (deleteId) {
			deletePassword(deleteId);
			deleteId = undefined;
			deleteOpen = false;
		}
	};
</script>

<Modal bind:open={addOpen}>
	<h3 slot="title">Add Password</h3>
	<NewPassword onAdd={closeAdd} />
</Modal>

<Modal bind:open={deleteOpen}>
	<h3 slot="title">Deleting Password</h3>
	<p class="mb-2">Delete {deleteEntry?.url} {deleteEntry?.username} Password?</p>
	<button class="btn danger" on:click={onDelete}>Delete</button>
</Modal>

<div class="container mx-auto p-4 mt-4 mb-8 bg-white">
	<div class="flex justify-end">
		<button class="btn primary" on:click={toggleAddOpen}>Add Password</button>
	</div>
	<input class="input my-2" type="text" placeholder="Search..." bind:value={search} />

	<div>
		{#each Object.entries($passwordsByUrl) as [url, passwords]}
			{@const filteredPasswords = search
				? passwords.filter((entry) => searchEntry(entry, search))
				: passwords}
			<h2 class="mt-2">{url}</h2>
			{#each filteredPasswords as entry}
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
</div>
