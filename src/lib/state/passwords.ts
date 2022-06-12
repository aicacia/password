import { cleanURL } from '$lib/cleanURL';
import { derived } from 'svelte/store';
import { writable } from 'svelte/store';
import { v4 } from 'uuid';
import { remoteStorage } from '../remoteStorage';
import { wrap } from './tasks';

remoteStorage.access.claim('passwords', 'rw');
remoteStorage.caching.enable('/passwords/');

export const passwordsRS = remoteStorage.scope('/passwords/');

passwordsRS.declareType('passwords', {
	type: 'object',
	properties: {
		'.*': {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'uuid'
				},
				url: {
					type: 'string',
					format: 'uri'
				},
				username: {
					type: 'string'
				},
				password: {
					type: 'string'
				},
				createdAt: {
					type: 'string',
					format: 'date-time'
				},
				updatedAt: {
					type: 'string',
					format: 'date-time'
				}
			},
			required: ['id', 'url', 'username', 'password', 'createdAt', 'updatedAt']
		}
	}
});

export interface IPassword {
	id: string;
	url: string;
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IPasswordJSON {
	id: string;
	url: string;
	username: string;
	password: string;
	createdAt: string;
	updatedAt: string;
}

export interface IPasswords {
	[id: string]: IPassword;
}

export interface IPasswordsJSON {
	[id: string]: IPasswordJSON;
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
	const id = v4();

	const entry: IPassword = {
		id,
		url: cleanURL(url),
		username,
		password,
		createdAt: new Date(),
		updatedAt: new Date()
	};

	writablePasswords.update((state) => {
		const newState = { ...state, [entry.id]: entry };
		upload(newState);
		return newState;
	});
}

export async function updatePassword(id: string, password: Partial<IPassword>) {
	let uploadTask: Promise<void> | undefined;
	writablePasswords.update((state) => {
		const entry = state[id];
		if (entry) {
			const newEntry = { ...entry, ...password, updatedAt: new Date() };
			newEntry.url = cleanURL(newEntry.url);
			const newState = {
				...state,
				[id]: newEntry
			};
			uploadTask = upload(newState);
			return newState;
		} else {
			return state;
		}
	});
	if (uploadTask) {
		await uploadTask;
	}
}

export function deletePassword(id: string) {
	writablePasswords.update((state) => {
		const newState = { ...state };
		delete newState[id];
		upload(newState);
		return newState;
	});
}

export function passwordToJSON(password: IPassword): IPasswordJSON {
	return {
		id: password.id,
		url: password.url,
		username: password.username,
		password: password.password,
		createdAt: password.createdAt.toJSON(),
		updatedAt: password.updatedAt.toJSON()
	};
}

export function passwordFromJSON(password: IPasswordJSON): IPassword {
	return {
		id: password.id,
		url: password.url,
		username: password.username,
		password: password.password,
		createdAt: new Date(password.createdAt),
		updatedAt: new Date(password.updatedAt)
	};
}

async function upload(state: IPasswords) {
	await wrap(
		passwordsRS.storeObject(
			'passwords',
			`passwords.json`,
			Object.values(state).reduce((json, password) => {
				json[password.id] = passwordToJSON(password);
				return json;
			}, {} as IPasswordsJSON)
		)
	);
}

function onSync() {
	passwordsRS.getObject('passwords.json', false).then((result) => {
		if (result) {
			const passwords = result as IPasswordsJSON;
			delete passwords['@context'];
			writablePasswords.update((state) => {
				Object.values(passwords).forEach((password) => {
					const prevPassword = state[password.id],
						newPassword = passwordFromJSON(password);

					if (!prevPassword || prevPassword.updatedAt < newPassword.updatedAt) {
						state[password.id] = newPassword;
					}
				});
				return state;
			});
		}
	});
}

remoteStorage.on('sync-done', onSync);
