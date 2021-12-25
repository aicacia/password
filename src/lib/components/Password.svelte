<script lang="ts">
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { debounce } from '@aicacia/debounce';
	import { updatePassword } from '$lib/state/passwords';
	import PasswordInput from './PasswordInput.svelte';

	export let id: string;
	export let url: string;
	export let username: string;
	export let password: string;
	export let onDelete: (id: string) => void = () => undefined;

	let showPassword = false;

	const debouncedUpdate = debounce(() => {
		if (url && username && password) {
			updatePassword(id, url, username, password);
		}
	}, 500);
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
	<input
		class="input"
		type="text"
		placeholder="Username"
		bind:value={username}
		on:input={debouncedUpdate}
	/>
	<div class="flex">
		<div class="flex-1">
			<PasswordInput {password} bind:show={showPassword} onInput={debouncedUpdate} />
		</div>
		<div class="flex-grow-0">
			<button class="btn danger h-full px-3" on:click={() => onDelete(id)}
				><div class="w-4 h-4"><MdClose /></div></button
			>
		</div>
	</div>
</div>
