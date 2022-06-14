<svelte:options immutable />

<script lang="ts" context="module">
	function removeAllListeners<T extends Node>(element: T): T {
		const newElement = element.cloneNode(true) as T;
		element.parentNode?.replaceChild(newElement, element);
		return newElement;
	}

	function signIn(provider: 'dropbox' | 'googledrive') {
		chrome.runtime.sendMessage([SIGN_IN_MSG_ID, provider]);
	}

	function signOut() {
		chrome.runtime.sendMessage([SIGN_OUT_MSG_ID]);
	}

	function onReady() {
		chrome.storage.local
			.get(['provider', 'userAddress', 'token'])
			.then(({ provider, userAddress, token }) => {
				if (provider && userAddress && token) {
					remoteStorage.setBackend(provider);
					remoteStorage[provider].configure({ userAddress, token });
					remoteStorage[provider].connect();
					remoteStorage._emit('connected');
				}
			});
	}

	remoteStorage.on('ready', onReady);
	remoteStorage.on('disconnected', signOut);
</script>

<script lang="ts">
	import RemoteStorage from '@aicacia/secret/components/RemoteStorage.svelte';
	import Secrets from '@aicacia/secret/components/Secrets.svelte';
	import Layout from '@aicacia/secret/components/Layout.svelte';
	import { remoteStorageState } from '@aicacia/secret/state/remoteStorageState';
	import { remoteStorage } from '@aicacia/secret/remoteStorage';
	import { cleanApplication } from '@aicacia/secret/util';
	import type Widget from 'remotestorage-widget';
	import { onMount } from 'svelte';
	import { SIGN_IN_MSG_ID, SIGN_OUT_MSG_ID } from '../constants';

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

	let application = '';

	onMount(() => {
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
			const tab = tabs[0];

			if (tab?.url) {
				application = cleanApplication(tab.url);
			}
		});
		chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, tab) => {
			if (tab.active) {
				if (tab.url) {
					application = cleanApplication(tab.url);
				}
			}
		});
	});
</script>

<div class="as-min-w-[370px] as-min-h-[508px] as-h-1">
	<Layout>
		{#if $remoteStorageState === 'connected'}
			<div class="as-container as-mx-auto as-p-4 as-bg-white">
				<Secrets {application} />
			</div>
		{:else}
			<h3 class="as-text-center as-text-lg as-py-8">Please connect to a Storage Provider</h3>
		{/if}
	</Layout>
</div>
<div class="as-absolute as-left-0 as-bottom-0">
	<RemoteStorage bind:widget />
</div>
