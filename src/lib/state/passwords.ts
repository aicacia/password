import { derived, get } from 'svelte/store';
import { writable } from 'svelte/store';
import type { PrivateKey, Key } from 'openpgp';
import { v4 } from 'uuid';
import { encrypt, decrypt, createMessage, readMessage } from 'openpgp';
import { getKeys } from './keys';
import { remoteStorage } from './remotestorage';
import { browser } from '$app/env';

export interface IPassword {
	id: string;
	url: string;
	username: string;
	password: string;
}

export interface IPasswords {
	[id: string]: IPassword;
}

const writablePasswords = writable<IPasswords>({});

export const passwords = derived(writablePasswords, (state) => Object.values(state));
export const passwordsById = derived(writablePasswords, (state) => state);
export const passwordsByUrl = derived(writablePasswords, (state) =>
	Object.values(state).reduce((acc, entry) => {
		const urlEntry = acc[entry.url] || (acc[entry.url] = []);
		urlEntry.push(entry);
		return acc;
	}, {} as { [url: string]: IPassword[] })
);

export function addPassword(url: string, username: string, password: string) {
	const id = v4(),
		fullURL = new URL(url);

	fullURL.pathname = fullURL.pathname.replace(/\/$/, '');

	const entry = {
		id,
		url: fullURL.toString(),
		username,
		password
	};

	writablePasswords.update((state) => {
		state[entry.id] = entry;
		return state;
	});
	requestUpdate();
}

export function updatePassword(id: string, url: string, username: string, password: string) {
	writablePasswords.update((state) => {
		const entry = state[id];
		if (entry) {
			const fullURL = new URL(url);
			fullURL.pathname = fullURL.pathname.replace(/\/$/, '');
			entry.url = fullURL.toString();
			entry.username = username;
			entry.password = password;
		}
		return state;
	});
	requestUpdate();
}

export function deletePassword(id: string) {
	writablePasswords.update((state) => {
		delete state[id];
		return state;
	});
	requestUpdate();
}

let requesting = false;
async function requestUpdate() {
	if (requesting) {
		return;
	}
	requesting = true;
	setTimeout(async () => {
		try {
			const [privateKey, publicKey] = await getKeys();
			await update(privateKey, publicKey);
		} finally {
			requesting = false;
		}
	}, 300);
}

function cleanUpPasswords(passwords: IPasswords): IPasswords {
	return Object.entries(passwords).reduce((acc, [app, usernames]) => {
		if (!acc[app] || !Object.keys(usernames).length) {
			delete acc[app];
		}
		return acc;
	}, passwords);
}

async function update(privateKey: PrivateKey, publicKey: Key) {
	const passwords = cleanUpPasswords(get(writablePasswords));

	const encryptedPasswords = await encrypt({
		message: await createMessage({
			text: JSON.stringify(passwords),
			filename: 'passwords.json.pgp'
		}),
		encryptionKeys: publicKey,
		signingKeys: privateKey
	});

	await remoteStorage
		.scope('/')
		.storeFile('pgp', 'passwords.json.pgp', encryptedPasswords as string);
}

async function download(privateKey: PrivateKey, publicKey: Key) {
	const encryptedPasswords = await remoteStorage
		.scope('/')
		.getFile('/passwords.json.pgp')
		.then(({ data }) => data as string);

	if (encryptedPasswords) {
		const { data: passwordsJSON } = await decrypt({
			message: await readMessage({
				armoredMessage: encryptedPasswords
			}),
			verificationKeys: publicKey,
			decryptionKeys: privateKey
		});

		writablePasswords.set(cleanUpPasswords(JSON.parse(passwordsJSON)));
	}
}

if (browser) {
	getKeys().then(([privateKey, publicKey]) => download(privateKey, publicKey));
	remoteStorage.on('sync-done', async () => {
		const [privateKey, publicKey] = await getKeys();
		download(privateKey, publicKey);
	});
}
