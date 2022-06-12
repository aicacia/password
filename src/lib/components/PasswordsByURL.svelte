<svelte:options immutable />

<script lang="ts">
	import { passwordsByUrl, type IPassword } from '$lib/state/passwords';
	import Password from './Password.svelte';
	import { searchPassword } from './AllPasswords.svelte';

	export let url: string;
	export let search = '';
	export let onDelete: (password: IPassword) => void = () => undefined;

	$: passwords = $passwordsByUrl[url] || [];
	$: filteredPasswords = search
		? passwords.filter((entry) => searchPassword(entry, search))
		: passwords;
</script>

{#each filteredPasswords as password (password.id)}
	<Password {password} {onDelete} />
{/each}
