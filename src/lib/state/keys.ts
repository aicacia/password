import type { Key, PrivateKey } from 'openpgp';
import { generateKey, readPrivateKey, readKey } from 'openpgp';
import localforage from 'localforage';
import type { Readable } from 'svelte/store';
import { get } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/env';
import ee3 from 'eventemitter3';

export interface Keys {
	loaded: boolean;
	generating: boolean;
	privateKey?: PrivateKey;
	publicKey?: Key;
}

const writableKeys = writable<Keys>({
	loaded: false,
	generating: false
});

const emitter = new ee3.EventEmitter<{ ready(): void }>();

export const keys: Readable<Keys> = writableKeys;

export async function createKey() {
	writableKeys.update((state) => {
		state.loaded = false;
		state.generating = true;
		return state;
	});
	try {
		const { privateKey: privateKeyArmored, publicKey: publicKeyArmored } = await generateKey({
			type: 'rsa',
			userIDs: [{ name: 'Unknown' }],
			format: 'armored'
		});

		const [privateKey, publicKey] = await Promise.all([
			readPrivateKey({ armoredKey: privateKeyArmored }),
			readKey({ armoredKey: publicKeyArmored }),
			localforage.setItem('privateKey', privateKeyArmored),
			localforage.setItem('publicKey', publicKeyArmored)
		]);

		writableKeys.update((state) => {
			state.privateKey = privateKey;
			state.publicKey = publicKey;
			return state;
		});

		emitter.emit('ready');
	} finally {
		writableKeys.update((state) => {
			state.loaded = false;
			state.generating = false;
			return state;
		});
	}
}

export function getKeys(): Promise<[privateKey: PrivateKey, publicKey: Key]> {
	const currentKeys = get(keys);

	if (!currentKeys.loaded || currentKeys.generating) {
		return new Promise((resolve) => {
			emitter.once('ready', () => {
				const currentKeys = get(keys);
				resolve([currentKeys.privateKey, currentKeys.publicKey]);
			});
		});
	} else {
		return Promise.resolve([currentKeys.privateKey, currentKeys.publicKey]);
	}
}

if (browser) {
	Promise.all([
		localforage.getItem<string>('privateKey'),
		localforage.getItem<string>('publicKey')
	]).then(async ([privateKeyArmored, publicKeyArmored]) => {
		try {
			const [privateKey, publicKey] = await Promise.all([
				readPrivateKey({ armoredKey: privateKeyArmored }),
				readKey({ armoredKey: publicKeyArmored })
			]);

			writableKeys.update((state) => {
				state.privateKey = privateKey;
				state.publicKey = publicKey;
				return state;
			});

			emitter.emit('ready');
		} finally {
			writableKeys.update((state) => {
				state.loaded = true;
				return state;
			});
		}
	});
}
