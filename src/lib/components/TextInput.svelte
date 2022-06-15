<svelte:options immutable />

<script lang="ts">
	import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
	import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';
	import IoIosCopy from 'svelte-icons/io/IoIosCopy.svelte';
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';
	import MdFileUpload from 'svelte-icons/md/MdFileUpload.svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let text: string;
	export let onUploadFile: (text: string) => void = () => undefined;
	export let onInput: (
		e: Event & { currentTarget: (EventTarget & HTMLInputElement) | HTMLTextAreaElement }
	) => void = () => undefined;
	export let onShow: () => void = () => undefined;
	export let show = false;

	function toggleShow() {
		show = !show;
		if (show === false) {
			disabled = true;
		} else {
			onShow();
		}
	}

	async function onCopy() {
		navigator.clipboard.writeText(text);
	}
	let disabled = !show;
	function onEdit() {
		disabled = !disabled;
		if (disabled === false) {
			show = true;
		}
	}
	let fileInput: HTMLInputElement;
	function onUpload() {
		fileInput.click();
	}
	function onFileUpload(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!e.currentTarget.files) {
			return;
		}
		const file = e.currentTarget.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				text = e.target?.result as string;
				onUploadFile(text);
			};
			reader.readAsText(file);
		}
	}
</script>

<div class="as-flex as-relative">
	{#if show}
		<textarea
			{id}
			{name}
			rows={8}
			class="as-textarea as-flex-1 as-max-h-32 as-resize-none"
			type="text"
			placeholder="Enter a Password"
			{disabled}
			bind:value={text}
			on:input={onInput}
		/>
	{:else}
		<input {id} {name} class="as-input as-flex-1" type="password" placeholder="Hidden" {disabled} />
	{/if}
	<div class="as-absolute as-top-0 as-right-0 as-flex-row as-flex">
		<button class="as-btn as-primary as-p-2" on:click={onUpload}>
			<input bind:this={fileInput} type="file" multiple={false} hidden on:input={onFileUpload} />
			<div class="as-w-5 as-h-5">
				<MdFileUpload />
			</div>
		</button>
		<button class="as-btn as-primary as-p-2" class:as-secondary={!disabled} on:click={onEdit}>
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
