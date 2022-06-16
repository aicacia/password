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
	import TextInput from './TextInput.svelte';
	import { createNotification } from '$lib/state/notifications';

	export let application: string = '';
	export let onAdd: () => void = () => undefined;

	let type: ISecretType = 'password';
	let username = '';
	let secret = '';
	let result = suite.get();
	$: disabled = adding || !result.isValid();
	if (application) {
		onChangeName('application');
	}

	function onChangeName(name: string) {
		result = suite({ type, application, username, secret }, name);
	}
	function onChange(
		e: Event & { currentTarget: (EventTarget & HTMLInputElement) | HTMLTextAreaElement }
	) {
		onChangeName(e.currentTarget.name);
	}
	function afterChangeApplication(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		application = cleanApplication(e.currentTarget.value);
		onChangeName('application');
	}
	function onUploadFile(text: string) {
		secret = text;
		onChangeName('secret');
	}

	let passwordGenerator: PasswordGenerator;
	function onGenerate() {
		secret = passwordGenerator.generate();
		onChangeName('secret');
	}

	let adding = false;
	async function onAddInternal() {
		adding = true;
		try {
			await addSecret({
				type,
				application,
				username,
				secret
			});
			onAdd();
		} catch (e) {
			console.error(e);
			createNotification((e as Error).message);
		} finally {
			adding = false;
		}
	}
</script>

<form on:submit|preventDefault>
	<label for="application">Application or URL</label>
	<input
		id="application"
		name="application"
		class="as-input"
		type="text"
		placeholder="Application or URL"
		bind:value={application}
		on:input={onChange}
		on:change={afterChangeApplication}
	/>
	<InputErrors messages={result.getErrors('application')} />
	<label for="username">Username</label>
	<input
		id="username"
		name="username"
		class="as-input"
		type="text"
		placeholder="Username"
		bind:value={username}
		on:input={onChange}
	/>
	<InputErrors messages={result.getErrors('username')} />
	<label for="type">Secret Type</label>
	<select id="type" class="as-input" bind:value={type}>
		<option value="password">Password</option>
		<option value="text">Text</option>
	</select>
	<InputErrors messages={result.getErrors('type')} />
	{#if type === 'password'}
		<label for="password">Password</label>
		<PasswordInput id="password" name="secret" bind:password={secret} show onInput={onChange} />
		<PasswordGenerator bind:this={passwordGenerator} />
	{:else if type === 'text'}
		<label for="text">Text</label>
		<TextInput id="text" name="secret" bind:text={secret} show onInput={onChange} {onUploadFile} />
	{/if}
	<InputErrors messages={result.getErrors('secret')} />
	{#if type === 'password'}
		<div class="as-flex as-justify-between as-mt-6">
			<input type="submit" class="as-btn as-primary" on:click={onGenerate} value="Generate" />
			<input
				type="submit"
				class="as-btn as-primary"
				{disabled}
				on:click={onAddInternal}
				value="Add"
			/>
		</div>
	{:else}
		<div class="as-flex as-justify-end as-mt-6">
			<input
				type="submit"
				class="as-btn as-primary"
				{disabled}
				on:click={onAddInternal}
				value="Add"
			/>
		</div>
	{/if}
</form>
