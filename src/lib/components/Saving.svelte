<script lang="ts">
	import { fade } from 'svelte/transition';
	import { loading, tasks } from '$lib/state/tasks';
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

{#if saving}
	<div transition:fade>
		<div class="relative">
			<div class="animate-bounce w-6 h-6">
				<MdSave />
			</div>
			<span
				class="rounded-full bg-black text-white text-xs w-4 h-4 inline-block text-center leading-[1rem] absolute -bottom-1 -right-1"
				>{$tasks}</span
			>
		</div>
	</div>
{:else}
	<div class="h-1" />
{/if}
