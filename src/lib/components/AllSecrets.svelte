<svelte:options immutable />

<script lang="ts">
	import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
	import { secretsByApplication, type ISecret } from '$lib/state/secrets';
	import Secret from './Secret.svelte';
	import { searchSecret } from '$lib/util';

	export let search = '';
	export let onDelete: (secret: ISecret) => void = () => undefined;

	$: applicationAndSecrets = Object.entries($secretsByApplication);
	$: filteredURLandSecrets = search
		? applicationAndSecrets.filter(([application, _secrets]) => fuzzyEquals(search, application))
		: applicationAndSecrets;
	$: if (filteredURLandSecrets.length === 0) {
		filteredURLandSecrets = applicationAndSecrets;
	}
</script>

{#each filteredURLandSecrets as [application, secrets] (application)}
	{@const filteredSecrets = search
		? secrets.filter((entry) => searchSecret(entry, search))
		: secrets}
	<h2 class="as-my-1 as-text-xl">{application}</h2>
	{#each filteredSecrets as secret (secret.id)}
		<Secret {secret} {onDelete} />
	{/each}
{/each}
