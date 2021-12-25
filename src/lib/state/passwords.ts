import { cleanURL } from '$lib/cleanURL';
import { derived } from 'svelte/store';
import { writable } from 'svelte/store';
import { v4 } from 'uuid';
import { remoteStorage } from './remoteStorage';

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
		state[entry.id] = entry;
		upload(state);
		return state;
	});
}

export function updatePassword(id: string, url: string, username: string, password: string) {
	writablePasswords.update((state) => {
		const entry = state[id];
		if (entry) {
			entry.url = cleanURL(url);
			entry.username = username;
			entry.password = password;
			entry.updatedAt = new Date();
			upload(state);
		}
		return state;
	});
}

export function deletePassword(id: string) {
	writablePasswords.update((state) => {
		delete state[id];
		upload(state);
		return state;
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

function upload(state: IPasswords) {
	passwordsRS.storeObject(
		'passwords',
		`passwords.json`,
		Object.values(state).reduce((json, password) => {
			json[password.id] = passwordToJSON(password);
			return json;
		}, {} as IPasswordsJSON)
	);
}

function onSync() {
	passwordsRS.getObject('passwords.json', false).then((passwords: IPasswordsJSON | undefined) => {
		if (passwords) {
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
