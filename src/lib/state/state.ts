import { remoteStorage } from '$lib/remoteStorage';
import { derived, writable } from 'svelte/store';

const stateWritable = writable<'connected' | 'disconnected'>('disconnected');

export const state = derived(stateWritable, (state) => state);

remoteStorage.on('connected', () => {
	stateWritable.set('connected');
});
remoteStorage.on('disconnected', () => {
	stateWritable.set('disconnected');
});
