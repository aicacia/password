<script lang="ts">
	import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';

	export let password: string;
	export let onInput: (e: Event) => void = () => undefined;
	export let show = false;
</script>

<div class="relative">
	<input
		class="input"
		class:hidden={!show}
		type="text"
		placeholder="Password"
		bind:value={password}
		on:input={onInput}
	/>
	<input
		class="input"
		class:hidden={show}
		type="password"
		placeholder="Password"
		bind:value={password}
		on:input={onInput}
	/>
	<button class="text-black absolute top-0 bottom-0 right-2" on:click={() => (show = !show)}>
		<div class="w-6 h-6">
			{#if show}
				<IoMdEye />
			{:else}
				<IoMdEyeOff />
			{/if}
		</div>
	</button>
</div>
