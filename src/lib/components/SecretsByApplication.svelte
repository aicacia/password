<svelte:options immutable />

<script lang="ts">
	import { secretsByApplication, type ISecret } from '$lib/state/secrets';
	import Secret from './Secret.svelte';
	import { searchSecret } from '$lib/util';

	export let application: string;
	export let search = '';
	export let onDelete: (secret: ISecret) => void = () => undefined;

	$: secrets = $secretsByApplication[application] || [];
	$: filteredSecrets = search ? secrets.filter((entry) => searchSecret(entry, search)) : secrets;
</script>

{#each filteredSecrets as secret (secret.id)}
	<Secret {secret} {onDelete} />
{/each}
