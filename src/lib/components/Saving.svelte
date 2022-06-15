<svelte:options immutable />

<script lang="ts">
	import MdSave from 'svelte-icons/md/MdSave.svelte';

	export let saving = false;

	let internalSaving = false;
	let lastSaving = Date.now();
	$: if (saving) {
		internalSaving = true;
		lastSaving = Date.now();
	} else {
		const diff = Date.now() - lastSaving;
		if (diff < 1000) {
			setTimeout(() => {
				internalSaving = false;
			}, 1000 - diff);
		} else {
			internalSaving = false;
		}
	}
</script>

<div class="as-relative as-w-8 as-h-8">
	<div
		class="as-transition-opacity {internalSaving ? 'as-animate-wiggle' : ''}"
		class:as-opacity-0={!internalSaving}
		class:as-opacity-100={internalSaving}
	>
		<MdSave />
	</div>
</div>
