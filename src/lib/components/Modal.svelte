<svelte:options immutable />

<script lang="ts">
	import MdClose from 'svelte-icons/md/MdClose.svelte';

	export let onClose: () => void = () => undefined;
	export let open = false;

	function close() {
		open = false;
		onClose();
	}
</script>

<div
	class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
	class:hidden={!open}
>
	<div class="relative my-4 w-96 xl:w-1/3 mx-auto">
		<div
			class="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
		>
			<div class="flex items-start justify-between px-4 pt-4">
				<div class="flex-grow">
					<slot name="title" />
				</div>
				<button
					class="bg-transparent border-0 text-black outline-none focus:outline-none"
					on:click={close}
				>
					<div class="w-6 h-6"><MdClose /></div>
				</button>
			</div>
			<div class="relative p-4 flex-auto">
				<slot />
			</div>
		</div>
	</div>
</div>
<div class="opacity-25 fixed inset-0 z-40 bg-black" class:hidden={!open} />
