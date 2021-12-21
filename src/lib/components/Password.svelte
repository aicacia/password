<script lang="ts">
	import FaEye from 'svelte-icons/fa/FaEye.svelte';
	import FaEyeSlash from 'svelte-icons/fa/FaEyeSlash.svelte';
	import { debounce } from '@aicacia/debounce';
	import { updatePassword } from '$lib/state/passwords';

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

<div class="flex">
	<div class="relative flex-1">
		<input
			class="input h-full"
			type="text"
			placeholder="Username"
			bind:value={username}
			on:input={debouncedUpdate}
		/>
	</div>
	<div class="relative flex-1">
		<input
			class="input h-full"
			class:hidden={!showPassword}
			type="text"
			placeholder="Password"
			bind:value={password}
			on:input={debouncedUpdate}
		/>
		<input
			class="input h-full"
			class:hidden={showPassword}
			type="password"
			placeholder="Password"
			bind:value={password}
			on:input={debouncedUpdate}
		/>
		<button
			class="text-black absolute top-0 bottom-0 right-2"
			on:click={() => (showPassword = !showPassword)}
		>
			<div class="w-6 h-6">
				{#if showPassword}
					<FaEye />
				{:else}
					<FaEyeSlash />
				{/if}
			</div>
		</button>
	</div>
	<div class="relative flex-grow-0">
		<button class="btn danger px-4" on:click={() => onDelete(id)}>×</button>
	</div>
</div>
