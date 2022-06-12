<svelte:options immutable />

<script lang="ts">
	import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';
	import IoIosCopy from 'svelte-icons/io/IoIosCopy.svelte';
	import { tick } from 'svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let password: string;
	export let onInput: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void = () =>
		undefined;
	export let show = false;

	function toggleShow() {
		show = !show;
	}

	let textarea: HTMLTextAreaElement;
	async function onCopy() {
		textarea.select();
		textarea.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(textarea.value);
		await tick();
		textarea.blur();
	}
</script>

<div class="flex">
	<textarea class="absolte hidden left-0 bottom-0" bind:this={textarea} value={password} />
	{#if show}
		<input
			{id}
			{name}
			class="input flex-1"
			type="text"
			placeholder="Password"
			bind:value={password}
			on:input={onInput}
		/>
	{:else}
		<input
			{id}
			{name}
			class="input flex-1"
			type="password"
			placeholder="Password"
			bind:value={password}
			on:input={onInput}
		/>
	{/if}
	<div class="grow-0 flex-row flex">
		<button class="btn p-2" on:click={onCopy}>
			<div class="w-5 h-5">
				<IoIosCopy />
			</div>
		</button>
		<button class="btn p-2" on:click={toggleShow}>
			<div class="w-5 h-5">
				{#if show}
					<IoMdEye />
				{:else}
					<IoMdEyeOff />
				{/if}
			</div>
		</button>
	</div>
</div>
