import { derived, get } from 'svelte/store';
import { writable } from 'svelte/store';
import type { PrivateKey, Key } from 'openpgp';
import { encrypt, decrypt, createMessage, readMessage } from 'openpgp';
import { getKeys } from './keys';
import { remoteStorage } from './remotestorage';
import { browser } from '$app/env';

export interface IPasswords {
	[app: string]: {
		[username: string]: string;
	};
}

const writablePasswords = writable<IPasswords>({});

export const passwords = derived(writablePasswords, (state) =>
	Object.entries(state).map<[app: string, usernames: { username: string; password: string }[]]>(
		([app, usernames]) => {
			return [
				app,
				Object.entries(usernames).map(([username, password]) => ({
					username,
					password
				}))
			];
		}
	)
);
export const apps = derived(writablePasswords, Object.keys);

export function setPassword(appKey: string, username: string, password: string) {
	writablePasswords.update((state) => {
		const app = state[appKey] || (state[appKey] = {});
		app[username] = password;
		return state;
	});
	requestUpdate();
}

export function deletePassword(appKey: string, username: string) {
	writablePasswords.update((state) => {
		const app = state[appKey] || (state[appKey] = {});
		delete app[username];
		return state;
	});
	requestUpdate();
}

let requesting = false;
async function requestUpdate() {
	if (requesting) {
		return;
	}
	try {
		const [privateKey, publicKey] = await getKeys();
		await update(privateKey, publicKey);
	} finally {
		requesting = false;
	}
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
}
