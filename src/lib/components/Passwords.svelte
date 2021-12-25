<script lang="ts">
	import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
	import { deletePassword, passwordsById, passwordsByUrl } from '$lib/state/passwords';
	import Modal from './Modal.svelte';
	import Password from './Password.svelte';
	import NewPassword from './NewPassword.svelte';

	let search = '';
	let addOpen = false;

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

<Modal bind:open={addOpen}>
	<h3 slot="title">Add Password</h3>
	<NewPassword onAdd={() => (addOpen = false)} />
</Modal>

<Modal bind:open={deleteOpen}>
	<h3 slot="title">Deleting Password</h3>
	<p class="mb-2">Delete {deleteEntry?.url} {deleteEntry?.username} Password?</p>
	<button class="btn danger" on:click={onDelete}>Delete</button>
</Modal>

<div class="container mx-auto p-4 mt-4 mb-8 bg-white">
	<button class="btn primary" on:click={() => (addOpen = !addOpen)}>Add</button>
	<input class="input my-2" type="text" placeholder="Search..." bind:value={search} />

	<div>
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
</div>
