<svelte:options immutable />

<script lang="ts">
	import { deleteSecret, secretsByApplication, type ISecret } from '$lib/state/secrets';
	import Modal from './Modal.svelte';
	import NewSecret from './NewSecret.svelte';
	import Saving from './Saving.svelte';
	import AllSecrets from './AllSecrets.svelte';
	import SecretsByApplication from './SecretsByApplication.svelte';
	import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
	import { cleanApplication } from '$lib/util';

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
		const matches = applications.filter((application) =>
			fuzzyEquals(application, cleanApplication(application))
		);
		if (matches.length === 1) {
			applicationInApplication = matches[0];
		}
	}
</script>

<Modal bind:open={addOpen}>
	<h3 class="as-text-lg" slot="title">Add Secret</h3>
	<NewSecret onAdd={closeAdd} {application} />
</Modal>

<Modal bind:open={deleteOpen}>
	<h3 slot="title" class="as-text-lg">Deleting Secret</h3>
	<p class="as-mb-2">Delete {passordToDelete?.application} {passordToDelete?.username} Secret?</p>
	<div class="as-flex justify-end">
		<button class="as-btn as-danger" on:click={onDelete}>Delete</button>
	</div>
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
			<Saving />
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
