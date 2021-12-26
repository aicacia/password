<script lang="ts">
	import { deletePassword, passwordsById, passwordsByUrl } from '@aicacia/password/state/passwords';
	import Modal from '@aicacia/password/components/Modal.svelte';
	import Password from '@aicacia/password/components/Password.svelte';
	import NewPassword from '@aicacia/password/components/NewPassword.svelte';

	export let url: string;

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

	$: passwords = $passwordsByUrl[url] || [];
</script>

<Modal bind:open={addOpen}>
	<h3 slot="title">Add Password</h3>
	<NewPassword {url} onAdd={() => (addOpen = false)} />
</Modal>

<Modal bind:open={deleteOpen}>
	<h3 slot="title">Deleting Password</h3>
	<p class="mb-2">Delete {deleteEntry?.url} {deleteEntry?.username} Password?</p>
	<button class="btn danger" on:click={onDelete}>Delete</button>
</Modal>

<div class="p-4 bg-white" class:open={addOpen}>
	<button class="btn primary" on:click={() => (addOpen = !addOpen)}>Add Password</button>
	<div class="mt-4">
		{#each passwords as entry}
			<Password
				id={entry.id}
				{url}
				username={entry.username}
				password={entry.password}
				onDelete={onOpenDeleteModal}
			/>
		{/each}
	</div>
</div>

<style>
	.open {
		min-height: 28rem;
	}
</style>
