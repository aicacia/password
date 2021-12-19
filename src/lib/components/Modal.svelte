<script lang="ts">
	export let open = false;
</script>

<div
	class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
	class:hidden={!open}
>
	<div class="relative w-auto my-6 max-w-xl mx-auto">
		<div
			class="border-0 rounded shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
		>
			<div class="flex items-start justify-between p-2">
				<div>
					<slot name="title" />
				</div>
				<button
					class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
					on:click={() => (open = !open)}
				>
					<span
						class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none"
					>
						×
					</span>
				</button>
			</div>
			<div class="relative p-4 flex-auto">
				<slot />
			</div>
		</div>
	</div>
</div>
<div class="opacity-25 fixed inset-0 z-40 bg-black" class:hidden={!open} />
