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
	export let show = false;

	function toggleShow() {
		show = !show;
		if (show === false) {
			disabled = true;
		}
	}

	async function onCopy() {
		navigator.clipboard.writeText(password);
	}
	let disabled = !show;
	function onEdit() {
		disabled = !disabled;
		if (disabled === false) {
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
			{disabled}
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
			{disabled}
			bind:value={password}
			on:input={onInput}
		/>
	{/if}
	<div class="as-grow-0 as-flex-row as-flex">
		<button class="as-btn as-primary as-p-2" class:opacity-50={!disabled} on:click={onEdit}>
			<div class="as-w-5 as-h-5">
				<MdEdit />
			</div>
		</button>
		<button class="as-btn as-primary as-p-2" on:click={onCopy}>
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
