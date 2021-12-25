<script lang="ts">
	import { passwordGenerator } from '$lib/passwordGenerator';
	import { addPassword } from '$lib/state/passwords';
	import PasswordInput from './PasswordInput.svelte';

	export let url: string = '';
	export let onAdd: () => void = () => undefined;

	let username: string;
	let password: string;

	function onAddInternal() {
		addPassword(url, username, password);
		onAdd();
	}

	let length = 16;
	let includeSymbols = true;
	let excludeSimilarCharacters = false;
	let excludeAmbiguousCharacters = false;

	function onGenerate() {
		password = passwordGenerator({
			length,
			includeSymbols,
			excludeSimilarCharacters,
			excludeAmbiguousCharacters
		});
	}
</script>

<label for="application">Application</label>
<input id="application" class="input" type="text" placeholder="Application" bind:value={url} />
<label for="username">Username</label>
<input id="username" class="input" type="text" placeholder="Username" bind:value={username} />
<div>
	<label for="password">Password</label>
	<PasswordInput bind:password show />
	<div>
		<label for="includeSymbols">Symbols?</label>
		<input
			id="includeSymbols"
			type="checkbox"
			class="checkbox"
			placeholder="Length"
			bind:checked={includeSymbols}
		/>
		<label for="excludeSimilarCharacters">Exclude Similar? (il1Lo0O)</label>
		<input
			id="excludeSimilarCharacters"
			type="checkbox"
			class="checkbox"
			placeholder="Length"
			bind:checked={excludeSimilarCharacters}
		/>
		<label for="excludeAmbiguousCharacters">Exclude Ambiguous? ([]()/\'"`~,;:.)</label>
		<input
			id="excludeAmbiguousCharacters"
			type="checkbox"
			class="checkbox"
			placeholder="Length"
			bind:checked={excludeAmbiguousCharacters}
		/>
		<div class="flex">
			<input
				id="length"
				class="input"
				type="number"
				minlength="6"
				placeholder="Length"
				bind:value={length}
			/>
			<button class="btn primary" on:click={onGenerate}>Generate</button>
		</div>
	</div>
</div>
<button class="btn primary mt-6" disabled={!url || !username || !password} on:click={onAddInternal}
	>Add</button
>
