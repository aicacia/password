<script lang="ts">
	import { base } from '$app/paths';
	import { deletePassword, setPassword } from '$lib/state/passwords';
	import Modal from './Modal.svelte';

	export let app: string;
	export let username: string;
	export let password: string;

	let open = false;
	let showPassword = false;
</script>

<div class="flex">
	<div class="relative flex-1">
		<input class="input h-full" type="text" placeholder="Username" bind:value={username} />
	</div>
	<div class="relative flex-1">
		<input
			class="input h-full"
			class:hidden={!showPassword}
			type="text"
			placeholder="Password"
			bind:value={password}
		/>
		<input
			class="input h-full"
			class:hidden={showPassword}
			type="password"
			placeholder="Password"
			bind:value={password}
		/>
		<button
			class="text-black absolute top-0 bottom-0 right-2"
			on:click={() => (showPassword = !showPassword)}
		>
			{#if showPassword}
				<img class="w-6 h-6" src={`${base}/visible.svg`} alt="Hide" />
			{:else}
				<img class="w-6 h-6" src={`${base}/hidden.svg`} alt="Show" />
			{/if}
		</button>
	</div>
	<div class="relative flex-grow-0">
		<button class="btn danger px-4" on:click={() => (open = !open)}>×</button>
	</div>
</div>

<Modal bind:open>
	<h3 slot="title">Deleting Password</h3>
	<p class="mb-2">Delete {app} {username} Password?</p>
	<button class="btn danger" on:click={() => deletePassword(app, username)}>Delete</button>
</Modal>
