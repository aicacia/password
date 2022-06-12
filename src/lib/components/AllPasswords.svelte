<svelte:options immutable />

<script lang="ts" context="module">
	export function searchPassword(password: IPassword, search: string) {
		return (
			fuzzyEquals(search, password.url) ||
			fuzzyEquals(search, password.username) ||
			fuzzyEquals(search, password.password)
		);
	}
</script>

<script lang="ts">
	import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
	import { passwordsByUrl, type IPassword } from '$lib/state/passwords';
	import Password from './Password.svelte';

	export let search = '';
	export let onDelete: (password: IPassword) => void = () => undefined;

	$: urlAndPasswords = Object.entries($passwordsByUrl);
	$: filteredURLandPasswords = search
		? urlAndPasswords.filter(([url, _passwords]) => fuzzyEquals(search, url))
		: urlAndPasswords;
	$: if (filteredURLandPasswords.length === 0) {
		filteredURLandPasswords = urlAndPasswords;
	}
</script>

{#each filteredURLandPasswords as [url, passwords] (url)}
	{@const filteredPasswords = search
		? passwords.filter((entry) => searchPassword(entry, search))
		: passwords}
	<h2 class="my-1">{url}</h2>
	{#each filteredPasswords as password (password.id)}
		<Password {password} {onDelete} />
	{/each}
{/each}
