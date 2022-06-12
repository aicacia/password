<svelte:options immutable />

<script lang="ts">
	import { deletePassword, passwordsByUrl, type IPassword } from '$lib/state/passwords';
	import Modal from './Modal.svelte';
	import NewPassword from './NewPassword.svelte';
	import Saving from './Saving.svelte';
	import AllPasswords from './AllPasswords.svelte';
	import PasswordsByUrl from './PasswordsByURL.svelte';
	import { state } from '$lib/state/state';

	export let url: string = '';

	let addOpen = false;
	let search = '';

	function toggleAddOpen() {
		addOpen = !addOpen;
	}
	function closeAdd() {
		addOpen = false;
	}

	let passordToDelete: IPassword | undefined;
	let deleteOpen = false;

	$: onOpenDeleteModal = (password: IPassword) => {
		passordToDelete = password;
		deleteOpen = true;
	};
	$: onDelete = () => {
		if (passordToDelete) {
			deletePassword(passordToDelete.id);
			passordToDelete = undefined;
			deleteOpen = false;
		}
	};

	$: urls = Object.keys($passwordsByUrl);
</script>

<Modal bind:open={addOpen}>
	<h3 slot="title">Add Password</h3>
	<NewPassword onAdd={closeAdd} />
</Modal>

<Modal bind:open={deleteOpen}>
	<h3 slot="title">Deleting Password</h3>
	<p class="mb-2">Delete {passordToDelete?.url} {passordToDelete?.username} Password?</p>
	<div class="flex justify-end">
		<button class="btn danger" on:click={onDelete}>Delete</button>
	</div>
</Modal>

{#if $state === 'connected'}
	<div class="flex justify-between">
		<div class="flex flex-row">
			<select bind:value={url} class="input">
				<option />
				{#each urls as url (url)}
					<option value={url}>{url}</option>
				{/each}
			</select>
			<Saving />
		</div>
		<button class="btn primary" on:click={toggleAddOpen}>Add</button>
	</div>
	<input class="input my-2" type="text" placeholder="Search..." bind:value={search} />

	{#if url}
		<PasswordsByUrl {url} {search} onDelete={onOpenDeleteModal} />
	{:else}
		<AllPasswords {search} onDelete={onOpenDeleteModal} />
	{/if}
{/if}
