<svelte:options immutable />

<script lang="ts">
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let onShow: () => void = () => undefined;
</script>

<div class="as-flex">
	<input
		{id}
		{name}
		class="as-input as-flex-1"
		type="password"
		placeholder="Enter a Password"
		disabled
		value="Encrypted Password"
	/>
	<div class="as-grow-0 as-flex-row as-flex">
		<button class="as-btn as-primary as-p-2" on:click={onShow}>
			<div class="as-w-5 as-h-5">
				<IoMdEyeOff />
			</div>
		</button>
	</div>
</div>
