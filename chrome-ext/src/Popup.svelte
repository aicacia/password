<script lang="ts" context="module">
	function removeAllListeners<T extends Node>(element: T): T {
		const newElement = element.cloneNode(true) as T;
		element.parentNode.replaceChild(newElement, element);
		return newElement;
	}

	function signIn(provider: 'dropbox' | 'googledrive') {
		chrome.runtime.sendMessage(['signIn', provider]);
	}

	function signOut() {
		chrome.runtime.sendMessage(['signOut']);
	}

	function getCurrent() {
		chrome.runtime.sendMessage(
			['getCurrent'],
			([provider, token]: [provider?: string, token?: string]) => {
				if (provider && token) {
					remoteStorage.remote.configure({
						token
					});
					remoteStorage.setBackend(provider);
				}
			}
		);
	}
</script>

<script lang="ts">
	import RemoteStorage from '@aicacia/password/components/RemoteStorage.svelte';
	import { remoteStorage } from '@aicacia/password/state/remoteStorage';
	import { cleanURL } from '@aicacia/password/cleanURL';
	import { onMount } from 'svelte';
	import Passwords from './Passwords.svelte';

	let widget: any;
	$: dropboxButton = widget?.rsChooseDropboxButton as HTMLDivElement;
	$: googledriveButton = widget?.rsChooseGoogleDriveButton as HTMLDivElement;

	let prevDropboxButton: HTMLDivElement;
	let prevGoogleDriveButton: HTMLDivElement;

	$: if (dropboxButton && dropboxButton !== prevDropboxButton) {
		prevDropboxButton = dropboxButton;
		dropboxButton = removeAllListeners(dropboxButton);
		dropboxButton.addEventListener('click', () => signIn('dropbox'));
	}
	$: if (googledriveButton && dropboxButton !== prevGoogleDriveButton) {
		prevGoogleDriveButton = googledriveButton;
		googledriveButton = removeAllListeners(googledriveButton);
		googledriveButton.addEventListener('click', () => signIn('googledrive'));
	}

	let connected = false;
	let url = '';

	onMount(() => {
		remoteStorage.on('ready', getCurrent);
		remoteStorage.on('connected', () => {
			connected = true;
		});
		remoteStorage.on('disconnected', () => {
			connected = false;
			signOut();
		});

		chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
			const tab = tabs[0];

			if (tab) {
				url = tab.url;
			}
		});
		chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, tab) => {
			if (tab.active) {
				if (tab.url) {
					url = cleanURL(tab.url);
				}
			}
		});
	});
</script>

<div class="w-96 min-h-max relative">
	<div class="absolute top-0 right-0 z-20">
		<RemoteStorage bind:widget />
	</div>
	{#if connected}
		<Passwords {url} />
	{/if}
</div>
