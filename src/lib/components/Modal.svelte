<svelte:options immutable />

<script lang="ts">
	import Portal from 'svelte-portal/src/Portal.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { createInsecureID } from '$lib/util';
	import { beforeUpdate } from 'svelte';

	export let onClose: () => void = () => undefined;
	export let open = false;

	let key = createInsecureID();
	let prevOpen: boolean;
	$: if (prevOpen !== open) {
		key = createInsecureID();
		prevOpen = open;
	}

	function close() {
		open = false;
		onClose();
	}
</script>

<Portal>
	<div class="as-relative as-z-10" role="dialog" aria-modal="true">
		<div class="as-fixed as-inset-0 as-bg-gray-500 as-bg-opacity-25" class:as-hidden={!open} />
		<div class="as-fixed as-z-10 as-inset-0 as-overflow-y-auto" class:as-hidden={!open}>
			<div
				class="as-flex as-items-end sm:as-items-center as-justify-center as-min-h-full as-p-4 as-text-center sm:as-p-0"
			>
				<div
					class="as-relative as-bg-white as-text-left as-overflow-hidden as-shadow-xl sm:as-my-8 sm:as-container sm:as-w-full"
				>
					<div class="as-flex as-items-start as-justify-between as-px-4 as-pt-4">
						<div class="as-flex-grow">
							{#key key}
								<slot name="title" />
							{/key}
						</div>
						<button
							class="as-bg-transparent as-border-0 as-text-black as-outline-none focus:as-outline-none"
							on:click={close}
						>
							<div class="as-w-6 as-h-6"><MdClose /></div>
						</button>
					</div>
					<div class="as-relative as-p-4 as-flex-auto">
						{#key key}
							<slot />
						{/key}
					</div>
				</div>
			</div>
		</div>
	</div>
</Portal>
