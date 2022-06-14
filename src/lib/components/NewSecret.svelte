<svelte:options immutable />

<script lang="ts" context="module">
	import { create, test, enforce, only } from 'vest';

	interface ISecretData {
		type: ISecretType;
		application: string;
		username: string;
		secret: string;
	}

	const suite = create((data: ISecretData, currentField: string) => {
		only(currentField);

		test('application', 'Application is required', () => {
			enforce(data.application).isNotBlank();
		});
		test('username', 'Username is required', () => {
			enforce(data.username).isNotBlank();
		});
		test('secret', 'Secret is required', () => {
			enforce(data.secret).isNotBlank();
		});
	});
</script>

<script lang="ts">
	import { addSecret, type ISecretType } from '$lib/state/secrets';
	import PasswordInput from './PasswordInput.svelte';
	import InputErrors from './InputErrors.svelte';
	import { cleanApplication } from '$lib/util';
	import PasswordGenerator from './PasswordGenerator.svelte';

	export let application: string = '';
	export let onAdd: () => void = () => undefined;

	let formData: ISecretData = {
		type: 'password',
		application,
		username: '',
		secret: ''
	};
	let result = suite.get();
	$: disabled = !result.isValid();
	if (application) {
		onChangeName('application');
	}

	function onChangeName(name: string) {
		result = suite(formData, name);
	}
	function onChange(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		onChangeName(e.currentTarget.name);
	}
	function afterChangeApplication(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		formData = {
			...formData,
			application: cleanApplication(e.currentTarget.value)
		};
		onChangeName('application');
	}

	let passwordGenerator: PasswordGenerator;
	function onGenerate() {
		formData = { ...formData, secret: passwordGenerator.generate() };
		onChangeName('secret');
	}

	function onAddInternal() {
		addSecret(formData);
		onAdd();
	}
</script>

<label for="application">Application or URL</label>
<input
	id="application"
	name="application"
	class="as-input"
	type="text"
	placeholder="Application or URL"
	bind:value={formData.application}
	on:input={onChange}
	on:change={afterChangeApplication}
/>
<InputErrors messages={result.getErrors('application')} />
<label for="type">Secret Type</label>
<select id="type" class="as-input" bind:value={formData.type}>
	<option value="password">Password</option>
	<option value="text">Text</option>
</select>
<InputErrors messages={result.getErrors('type')} />
<label for="username">Username</label>
<input
	id="username"
	name="username"
	class="as-input"
	type="text"
	placeholder="Username"
	bind:value={formData.username}
	on:input={onChange}
/>
<InputErrors messages={result.getErrors('username')} />
<label for="secret">Secret</label>
<PasswordInput id="secret" name="secret" bind:secret={formData.secret} show onInput={onChange} />
<InputErrors messages={result.getErrors('secret')} />
<PasswordGenerator bind:this={passwordGenerator} />
<div class="as-flex as-justify-between as-mt-6">
	<button class="as-btn as-primary" on:click={onGenerate}>Generate</button>
	<button class="as-btn as-primary" {disabled} on:click={onAddInternal}>Add</button>
</div>
