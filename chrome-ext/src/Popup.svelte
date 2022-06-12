<svelte:options immutable />

<script lang="ts" context="module">
	function removeAllListeners<T extends Node>(element: T): T {
		const newElement = element.cloneNode(true) as T;
		element.parentNode?.replaceChild(newElement, element);
		return newElement;
	}

	function signIn(provider: 'dropbox' | 'googledrive') {
		chrome.runtime.sendMessage(['signIn', provider]);
	}

	function signOut() {
		chrome.runtime.sendMessage(['signOut']);
	}

	function getCurrent() {
		return new Promise<void>((resolve, reject) => {
			chrome.runtime.sendMessage(
				['getCurrent'],
				([provider, token]: [provider?: string, token?: string]) => {
					if (provider && token) {
						remoteStorage.remote.configure({
							token
						});
						remoteStorage.setBackend(provider);
						resolve();
					} else {
						reject();
					}
				}
			);
		});
	}
</script>

<script lang="ts">
	import RemoteStorage from '@aicacia/password/components/RemoteStorage.svelte';
	import Passwords from '@aicacia/password/components/Passwords.svelte';
	import Layout from '@aicacia/password/components/Layout.svelte';
	import { remoteStorage } from '@aicacia/password/remoteStorage';
	import { cleanURL } from '@aicacia/password/cleanURL';
	import type Widget from 'remotestorage-widget';
	import { onMount } from 'svelte';

	let widget: Widget | undefined;
	$: dropboxButton = widget?.rsChooseDropboxButton as HTMLElement;
	$: googledriveButton = widget?.rsChooseGoogleDriveButton as HTMLElement;

	let prevDropboxButton: HTMLElement | undefined;
	$: if (dropboxButton && dropboxButton !== prevDropboxButton) {
		prevDropboxButton = dropboxButton;
		dropboxButton = removeAllListeners(dropboxButton);
		dropboxButton.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			signIn('dropbox');
			return false;
		});
	}

	let prevGoogleDriveButton: HTMLElement | undefined;
	$: if (googledriveButton && dropboxButton !== prevGoogleDriveButton) {
		prevGoogleDriveButton = googledriveButton;
		googledriveButton = removeAllListeners(googledriveButton);
		googledriveButton.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			signIn('googledrive');
			return false;
		});
	}

	let connected = false;
	let url = '';

	onMount(() => {
		remoteStorage.on('ready', () => {
			getCurrent();
		});
		remoteStorage.on('connected', () => {
			connected = true;
		});
		remoteStorage.on('disconnected', () => {
			connected = false;
			signOut();
		});

		chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
			const tab = tabs[0];

			if (tab?.url) {
				url = cleanURL(tab.url);
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

<div class="min-w-[370px] min-h-[489px] h-1">
	<Layout>
		<div class="container mx-auto p-4 bg-white">
			<Passwords {url} />
		</div>
	</Layout>
</div>
<div class="absolute left-0" class:top-0={!connected} class:bottom-0={connected}>
	<RemoteStorage bind:widget />
</div>
