<svelte:options immutable />

<script lang="ts">
	import { deleteSecret, secretsByApplication, type ISecret } from '$lib/state/secrets';
	import Modal from './Modal.svelte';
	import NewSecret from './NewSecret.svelte';
	import Saving from './Saving.svelte';
	import AllSecrets from './AllSecrets.svelte';
	import SecretsByApplication from './SecretsByApplication.svelte';
	import { cleanApplication } from '$lib/util';
	import { askingForPassword, cancelAskingForPassword, setPassword } from '$lib/state/password';
	import SimplePassword from './SimplePassword.svelte';
	import InputErrors from './InputErrors.svelte';
	import { loading } from '$lib/state/tasks';

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
	$: applicationInApplication = applications.find(
		(a) => cleanApplication(application) === cleanApplication(a)
	);

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
		<div class="as-flex-1">
			<label for="filter-application">Filter by Application or URL</label>
			<select
				id="filter-application"
				name="filter-application"
				bind:value={application}
				class="as-input as-flex"
			>
				<option value={''} />
				{#each applications as application (application)}
					<option value={application}>{application}</option>
				{/each}
			</select>
		</div>
		<div class="as-flex as-flex-col as-p-1 as-justify-end">
			<div class="as-grow-0">
				<Saving saving={$loading} />
			</div>
		</div>
	</div>
	<div class="as-flex as-flex-col as-justify-end">
		<div class="as-grow-0">
			<button class="as-btn as-primary" on:click={toggleAddOpen}>Add</button>
		</div>
	</div>
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
