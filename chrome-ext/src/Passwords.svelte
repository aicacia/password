<script lang="ts">
	import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
	import { deletePassword, passwordsById, passwordsByUrl } from '@aicacia/password/state/passwords';
	import { createURL } from '@aicacia/password/cleanURL';
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

	$: fullURL = createURL(url);
	$: filteredPasswords = fullURL
		? Object.entries($passwordsByUrl).filter(([key, _password]) => {
				const url = createURL(key);

				if (url) {
					return (
						fuzzyEquals(fullURL.pathname, url.pathname) &&
						fuzzyEquals(fullURL.hostname, url.hostname) &&
						fuzzyEquals(fullURL.port, url.port) &&
						fuzzyEquals(fullURL.search, url.search) &&
						fuzzyEquals(fullURL.hash, url.hash)
					);
				} else {
					return fuzzyEquals(fullURL.href, key);
				}
		  })
		: url
		? Object.entries($passwordsByUrl).filter(([key, _password]) => fuzzyEquals(url, key))
		: Object.entries($passwordsByUrl);
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
	<input class="input my-2" type="text" placeholder="Search..." bind:value={url} />

	<div class="mt-4">
		{#each filteredPasswords as [url, passwords]}
			<h2 class="mt-2">{url}</h2>
			{#each passwords as entry}
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

<style>
	.open {
		min-height: 28rem;
	}
</style>
