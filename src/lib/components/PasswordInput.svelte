<svelte:options immutable />

<script lang="ts">
	import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';
	import IoIosCopy from 'svelte-icons/io/IoIosCopy.svelte';
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let password: string;
	export let onInput: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void = () =>
		undefined;
	export let onShow: () => void = () => undefined;
	export let show = false;
	export let disabled = false;

	function toggleShow() {
		show = !show;
		if (show === false) {
			editing = true;
		} else {
			onShow();
		}
	}

	async function onCopy() {
		navigator.clipboard.writeText(password);
	}
	let editing = show;
	function onEdit() {
		editing = !editing;
		if (editing === false) {
			show = true;
		}
	}
</script>

<div class="as-flex">
	{#if show}
		<input
			{id}
			{name}
			class="as-input as-flex-1"
			type="text"
			placeholder="Enter a Password"
			disabled={!editing}
			bind:value={password}
			on:input={onInput}
		/>
	{:else}
		<input
			{id}
			{name}
			class="as-input as-flex-1"
			type="password"
			placeholder="Enter a Password"
			disabled={!editing}
			bind:value={password}
			on:input={onInput}
		/>
	{/if}
	<div class="as-grow-0 as-flex-row as-flex">
		<button
			class="as-btn as-primary as-p-2"
			class:as-secondary={editing}
			{disabled}
			on:click={onEdit}
		>
			<div class="as-w-5 as-h-5">
				<MdEdit />
			</div>
		</button>
		<button class="as-btn as-primary as-p-2" {disabled} on:click={onCopy}>
			<div class="as-w-5 as-h-5">
				<IoIosCopy />
			</div>
		</button>
		<button class="as-btn as-primary as-p-2" on:click={toggleShow}>
			<div class="as-w-5 as-h-5">
				{#if show}
					<IoMdEye />
				{:else}
					<IoMdEyeOff />
				{/if}
			</div>
		</button>
	</div>
</div>
