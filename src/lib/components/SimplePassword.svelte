<svelte:options immutable />

<script lang="ts">
	import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';

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
		if (show) {
			onShow();
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
