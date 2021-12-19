<script lang="ts" context="module">
	function readFile(file: File): Promise<string> {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (event: any) => {
				const data = event.target.result;
				if (!data) {
					resolve('');
				}
				resolve(data);
			};
			reader.readAsText(file);
		});
	}
	function downloadKey(name: string, key: Key) {
		const file = new File([key.armor()], name, {
			type: 'application/pgp-key'
		});
		const a = document.createElement('a');
		a.href = URL.createObjectURL(file);
		a.download = file.name;
		a.click();
	}

	function findFileIndex(files: FileList, predicate: (file: File) => boolean): number {
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (predicate(file)) {
				return i;
			}
		}
		return -1;
	}
</script>

<script lang="ts">
	import type { Key, PrivateKey } from 'openpgp';
	import { keys, setKeys } from '$lib/state/keys';
	import Modal from './Modal.svelte';
	import { base } from '$app/paths';

	let importOpen = false;
	let importing = false;
	let publicKey: string;
	let privateKey: string;

	async function onImport() {
		importing = true;
		try {
			await setKeys(privateKey, publicKey, true);
		} finally {
			importOpen = false;
			importing = false;
		}
	}

	function onDownload(publicKey: Key, privateKey: PrivateKey) {
		downloadKey('aicacia-password-public.pub', publicKey);
		downloadKey('aicacia-password-private', privateKey);
	}
	async function onKeyChange(event: Event) {
		const files = (event.target as HTMLInputElement).files;
		if (!files || files.length < 2) return;
		const publicKeyIndex = findFileIndex(files, (file) => file.name.includes('.pub'));
		publicKey = await readFile(files[publicKeyIndex]);
		privateKey = await readFile(files[publicKeyIndex === 0 ? 1 : 0]);
	}
</script>

<div class="flex justify-between mb-2">
	<div>
		<button class="btn primary" on:click={() => (importOpen = !importOpen)}>Import</button>
		<button
			class="btn primary"
			on:click={() => onDownload($keys.publicKey, $keys.privateKey)}
			disabled={!$keys.publicKey || !$keys.privateKey}>Download</button
		>
	</div>
	<a class="btn primary" href={`${base}/passwords`}>Passwords</a>
</div>

<Modal bind:open={importOpen}>
	<label for="public-key-upload">Public and Private Keys</label>
	<input id="public-key-upload" type="file" multiple class="input" on:change={onKeyChange} />
	<button
		class="btn primary mt-8"
		on:click={onImport}
		disabled={importing || !privateKey || !publicKey}>Import</button
	>
</Modal>

<div class="grid grid-cols-2 gap-2">
	<div>
		<h1 class="border-b">Public Key</h1>
		<pre>
			{$keys.publicKey?.armor()}
		</pre>
	</div>
	<div>
		<h1 class="border-b">Private Key</h1>
		<pre>
			{$keys.privateKey?.armor()}
		</pre>
	</div>
</div>
