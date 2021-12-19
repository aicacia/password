<script lang="ts">
	import { createKey, keys } from '$lib/state/keys';
	import Passwords from './Passwords.svelte';
</script>

{#if $keys.loaded && !$keys.publicKey}
	<div class="flex h-full justify-center items-center">
		<div class="flex-col">
			<h1>Welcome to Aicacia Password</h1>
			<div class="flex justify-center">
				{#if !$keys.publicKey && !$keys.generating}
					<button class="btn primary" on:click={createKey}>Create Keys</button>
				{:else if $keys.generating}
					<h3>Generating Keys...</h3>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<Passwords />
{/if}
