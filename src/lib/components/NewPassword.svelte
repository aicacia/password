<svelte:options immutable />

<script lang="ts" context="module">
	import { create, test, enforce, only } from 'vest';

	const suite = create((data: Partial<IPassword> = {}, currentField: string) => {
		only(currentField);

		test('url', 'Application is required', () => {
			enforce(data.url).isNotBlank();
		});
		test('username', 'Username is required', () => {
			enforce(data.username).isNotBlank();
		});
		test('password', 'Password is required', () => {
			enforce(data.password).isNotBlank();
		});
	});
</script>

<script lang="ts">
	import { passwordGenerator } from '$lib/passwordGenerator';
	import { addPassword, type IPassword } from '$lib/state/passwords';
	import PasswordInput from './PasswordInput.svelte';
	import InputErrors from './InputErrors.svelte';

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

	let result = suite.get();
	function onChange(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		result = suite(
			{
				url,
				username,
				password
			},
			e.currentTarget.name
		);
	}
	$: disabled = !result.isValid();
</script>

<label for="url">Application or URL</label>
<input
	id="url"
	name="url"
	class="input"
	type="text"
	placeholder="Application or URL"
	bind:value={url}
	on:input={onChange}
/>
<InputErrors messages={result.getErrors('url')} />
<label for="username">Username</label>
<input
	id="username"
	name="username"
	class="input"
	type="text"
	placeholder="Username"
	bind:value={username}
	on:input={onChange}
/>
<InputErrors messages={result.getErrors('username')} />
<div>
	<label for="password">Password</label>
	<PasswordInput id="password" name="password" bind:password show onInput={onChange} />
	<InputErrors messages={result.getErrors('password')} />
	<div>
		<label for="includeSymbols">Symbols?</label>
		<input
			id="includeSymbols"
			type="checkbox"
			class="checkbox"
			placeholder="Length"
			bind:checked={includeSymbols}
		/>
		<label for="excludeSimilarCharacters">Exclude Similar?</label>
		<input
			id="excludeSimilarCharacters"
			type="checkbox"
			class="checkbox"
			placeholder="Length"
			bind:checked={excludeSimilarCharacters}
		/>
		<label for="excludeAmbiguousCharacters">Exclude Ambiguous?</label>
		<input
			id="excludeAmbiguousCharacters"
			type="checkbox"
			class="checkbox"
			placeholder="Length"
			bind:checked={excludeAmbiguousCharacters}
		/>
		<input
			id="length"
			class="input"
			type="number"
			minlength="6"
			placeholder="Length"
			bind:value={length}
		/>
	</div>
</div>
<div class="flex justify-between mt-6">
	<button class="btn primary" on:click={onGenerate}>Generate</button>
	<button class="btn primary" {disabled} on:click={onAddInternal}>Add</button>
</div>
