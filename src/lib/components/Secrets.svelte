<svelte:options immutable />

<script lang="ts">
	import { deleteSecret, secretsByApplication, type ISecret } from '$lib/state/secrets';
	import Modal from './Modal.svelte';
	import NewSecret from './NewSecret.svelte';
	import Saving from './Saving.svelte';
	import AllSecrets from './AllSecrets.svelte';
	import SecretsByApplication from './SecretsByApplication.svelte';
	import { cleanApplication } from '$lib/util';
	import { remoteStorageState } from '$lib/state/remoteStorageState';
	import {
		askingForPassword,
		cancelAskingForPassword,
		clearPassword,
		setPassword
	} from '$lib/state/password';
	import SimplePassword from './SimplePassword.svelte';
	import InputErrors from './InputErrors.svelte';
	import { createNotification, NotificationType } from '$lib/state/notifications';

	export let application: string = '';

	let search = '';
	let addOpen = false;

	function toggleAddOpen() {
		addOpen = !addOpen;
	}
	function closeAdd() {
		addOpen = false;
	}

	let passordToDelete: ISecret | undefined;
	let deleteOpen = false;

	$: onOpenDeleteModal = (secret: ISecret) => {
		passordToDelete = secret;
		deleteOpen = true;
	};
	$: onDelete = () => {
		if (passordToDelete) {
			deleteSecret(passordToDelete.id);
			passordToDelete = undefined;
			deleteOpen = false;
		}
	};

	$: applications = Object.keys($secretsByApplication);
	let applicationInApplication: string | undefined;
	$: {
		const match = applications.find((a) => cleanApplication(application) === cleanApplication(a));
		if (match) {
			applicationInApplication = match;
		}
	}

	let password = '';
	let passwordMessages: string[] = [];
	function onSetPassword() {
		try {
			setPassword(password);
			passwordMessages = [];
			askingForPassword.set(false);
		} catch (e) {
			console.error(e);
			passwordMessages = [(e as Error).message];
		}
	}
</script>

<Modal bind:open={deleteOpen}>
	<h3 slot="title" class="as-text-lg">Deleting Secret</h3>
	<form on:submit|preventDefault>
		<p class="as-mb-2">Delete {passordToDelete?.application} {passordToDelete?.username} Secret?</p>
		<div class="as-flex as-justify-end as-mt-2">
			<input
				type="submit"
				class="as-btn as-danger"
				on:click|preventDefault={onDelete}
				value="Delete"
			/>
		</div>
	</form>
</Modal>

<Modal bind:open={addOpen}>
	<h3 class="as-text-lg" slot="title">Add Secret</h3>
	<NewSecret onAdd={closeAdd} {application} />
</Modal>

<Modal bind:open={$askingForPassword} onClose={cancelAskingForPassword}>
	<h3 slot="title" class="as-text-lg">Enter Master Password</h3>
	<form on:submit|preventDefault>
		<SimplePassword bind:password />
		<InputErrors messages={passwordMessages} />
		<div class="as-flex as-justify-end as-mt-2">
			<input
				type="submit"
				class="as-btn as-primary"
				on:click|preventDefault={onSetPassword}
				value="Ok"
			/>
		</div>
	</form>
</Modal>

<div class="as-flex as-justify-between">
	<div class="as-flex as-flex-row as-flex-grow">
		<select bind:value={application} class="as-input as-flex">
			<option />
			{#each applications as application (application)}
				<option value={application}>{application}</option>
			{/each}
		</select>
		<div class="as-flex as-p-1">
			<Saving saving={$remoteStorageState.wire === 'syncing'} />
		</div>
	</div>
	<button class="as-btn as-primary" on:click={toggleAddOpen}>Add</button>
</div>
<input class="as-input as-my-2" type="text" placeholder="Search..." bind:value={search} />

{#if applicationInApplication}
	<SecretsByApplication
		application={applicationInApplication}
		{search}
		onDelete={onOpenDeleteModal}
	/>
{:else}
	<AllSecrets {search} onDelete={onOpenDeleteModal} />
{/if}
