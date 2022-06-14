import { remoteStorage } from '$lib/remoteStorage';
import { derived, writable } from 'svelte/store';

const remoteStorageStateWritable = writable<'connected' | 'disconnected'>('disconnected');

export const remoteStorageState = derived(remoteStorageStateWritable, (state) => state);

remoteStorage.on('connected', () => {
	remoteStorageStateWritable.set('connected');
});
remoteStorage.on('disconnected', () => {
	remoteStorageStateWritable.set('disconnected');
});
