<svelte:options immutable />

<script lang="ts">
	import { loading } from '$lib/state/tasks';
	import MdSave from 'svelte-icons/md/MdSave.svelte';

	let saving = false;
	let lastSaving = Date.now();
	$: if ($loading) {
		saving = true;
		lastSaving = Date.now();
	} else {
		const diff = Date.now() - lastSaving;
		if (diff < 1000) {
			setTimeout(() => {
				saving = false;
			}, 1000 - diff);
		} else {
			saving = false;
		}
	}
</script>

<div class="as-relative as-w-8 as-h-8">
	<div
		class="as-transition-opacity {saving ? 'as-animate-wiggle' : ''}"
		class:as-opacity-0={!saving}
		class:as-opacity-100={saving}
	>
		<MdSave />
	</div>
</div>
