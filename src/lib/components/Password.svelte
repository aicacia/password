<svelte:options immutable />

<script lang="ts">
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { debounce } from '@aicacia/debounce';
	import { updatePassword, type IPassword } from '$lib/state/passwords';
	import PasswordInput from './PasswordInput.svelte';

	export let password: IPassword;
	export let onDelete: (password: IPassword) => void = () => undefined;

	let showPassword = false;

	function onDeleteInternal() {
		onDelete(password);
	}
	async function onUpdate() {
		if (password.url && password.username && password.password) {
			await updatePassword(password.id, password);
		}
	}
	const debouncedUpdate = debounce(onUpdate, 1000);
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 mt-1">
	<div class="flex">
		<div class="flex-grow-0">
			<button class="btn danger h-full px-2 py-0" on:click={onDeleteInternal}
				><div class="w-6 h-6"><MdClose /></div></button
			>
		</div>
		<div class="flex-1">
			<input
				class="input"
				type="text"
				placeholder="Username"
				bind:value={password.username}
				on:input={debouncedUpdate}
			/>
		</div>
	</div>
	<div class="flex">
		<div class="flex-1">
			<PasswordInput
				bind:password={password.password}
				bind:show={showPassword}
				onInput={debouncedUpdate}
			/>
		</div>
	</div>
</div>
