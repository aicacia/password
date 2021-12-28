<script lang="ts" context="module">
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
	import { create, test, enforce, only } from 'vest';
	import { passwordGenerator } from '$lib/passwordGenerator';
	import { addPassword, IPassword } from '$lib/state/passwords';
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

	const onChange = (name: string) => {
		result = suite(
			{
				url,
				username,
				password
			},
			name
		);
	};
	$: disabled = !result.isValid();
</script>

<label for="application">Application/URL</label>
<InputErrors messages={result.getErrors('url')} />
<input
	id="application"
	class="input"
	type="text"
	placeholder="Application/URL"
	bind:value={url}
	on:input={() => onChange('url')}
/>
<label for="username">Username</label>
<InputErrors messages={result.getErrors('username')} />
<input
	id="username"
	class="input"
	type="text"
	placeholder="Username"
	bind:value={username}
	on:input={() => onChange('username')}
/>
<div>
	<label for="password">Password</label>
	<InputErrors messages={result.getErrors('password')} />
	<PasswordInput bind:password show onInput={() => onChange('password')} />
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
<button class="btn primary mt-6" {disabled} on:click={onAddInternal}>Add</button>
