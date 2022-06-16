<svelte:options immutable />

<script lang="ts">
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { debounce } from '@aicacia/debounce';
	import { showSecret, updateSecret, type ISecret } from '$lib/state/secrets';
	import PasswordInput from './PasswordInput.svelte';
	import TextInput from './TextInput.svelte';
	import EncryptedPassword from './EncryptedPassword.svelte';
	import { createNotification } from '$lib/state/notifications';

	export let secret: ISecret;
	export let onDelete: (secret: ISecret) => void = () => undefined;

	let show = false;

	async function onShow() {
		try {
			await showSecret(secret);
			show = true;
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		}
	}
	function onDeleteInternal() {
		onDelete(secret);
	}
	async function onUpdate() {
		if (secret.application && secret.username && secret.secret) {
			await updateSecret(secret.id, {
				type: secret.type,
				application: secret.application,
				username: secret.username,
				secret: secret.secret
			});
		}
	}
	const debouncedUpdate = debounce(onUpdate, 1000);
</script>

<div class="as-flex as-flex-row as-w-full as-mb-2">
	<div class="as-flex-grow-0 as-mr-2">
		<button class="as-btn as-danger as-p-1" on:click={onDeleteInternal}
			><div class="as-w-6 as-h-6"><MdClose /></div></button
		>
	</div>
	<div class="as-flex-grow">
		<input
			class="as-input"
			type="text"
			placeholder="Username"
			bind:value={secret.username}
			on:input={debouncedUpdate}
		/>
		{#if secret.secret != null}
			{#if secret.type === 'password'}
				<PasswordInput bind:password={secret.secret} bind:show onInput={debouncedUpdate} />
			{:else if secret.type === 'text'}
				<TextInput
					bind:text={secret.secret}
					bind:show
					onInput={debouncedUpdate}
					onUploadFile={debouncedUpdate}
					{onShow}
				/>
			{/if}
		{:else}
			<EncryptedPassword {onShow} />
		{/if}
	</div>
</div>
