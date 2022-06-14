import { cleanApplication } from '$lib/util';
import { derived } from 'svelte/store';
import { writable } from 'svelte/store';
import { v4 } from 'uuid';
import { remoteStorage } from '../remoteStorage';
import { wrap } from './tasks';

remoteStorage.access.claim('secrets', 'rw');
remoteStorage.caching.enable('/secrets/');

export const secretsRS = remoteStorage.scope('/secrets/');

secretsRS.declareType('secrets', {
	type: 'object',
	properties: {
		'.*': {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'uuid'
				},
				type: {
					type: 'string',
					enum: ['password', 'text']
				},
				application: {
					type: 'string',
					format: {
						type: 'oneOf',
						items: [{ type: 'uri' }, { type: 'string' }]
					}
				},
				username: {
					type: 'string'
				},
				secret: {
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
			required: ['id', 'type', 'application', 'username', 'secret', 'createdAt', 'updatedAt']
		}
	}
});

export type ISecretType = 'password' | 'text';

export interface ISecret {
	id: string;
	type: ISecretType;
	application: string;
	username: string;
	secret: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISecretJSON {
	id: string;
	type: ISecretType;
	application: string;
	username: string;
	secret: string;
	createdAt: string;
	updatedAt: string;
}

export interface ISecrets {
	[id: string]: ISecret;
}

export interface ISecretsJSON {
	[id: string]: ISecretJSON;
}

const writableSecrets = writable<ISecrets>({});

export const secrets = derived(writableSecrets, (state) => Object.values(state));
export const secretsById = derived(writableSecrets, (state) => state);
export const secretsByApplication = derived(writableSecrets, (state) =>
	Object.values(state).reduce((acc, entry) => {
		const applicationEntry = acc[entry.application] || (acc[entry.application] = []);
		applicationEntry.push(entry);
		return acc;
	}, {} as { [url: string]: ISecret[] })
);

export interface IAddSecret {
	type: ISecretType;
	application: string;
	username: string;
	secret: string;
}

export function addSecret(secret: IAddSecret) {
	const id = v4();

	const entry: ISecret = {
		id,
		type: secret.type,
		application: cleanApplication(secret.application),
		username: secret.username,
		secret: secret.secret,
		createdAt: new Date(),
		updatedAt: new Date()
	};

	writableSecrets.update((state) => {
		const newState = { ...state, [entry.id]: entry };
		upload(newState);
		return newState;
	});
}

export async function updateSecret(id: string, secret: Partial<ISecret>) {
	let uploadTask: Promise<void> | undefined;
	writableSecrets.update((state) => {
		const entry = state[id];
		if (entry) {
			const newEntry = { ...entry, ...secret, updatedAt: new Date() };
			newEntry.application = cleanApplication(newEntry.application);
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

export function deleteSecret(id: string) {
	writableSecrets.update((state) => {
		const newState = { ...state };
		delete newState[id];
		upload(newState);
		return newState;
	});
}

export function secretToJSON(secret: ISecret): ISecretJSON {
	return {
		id: secret.id,
		type: secret.type,
		application: secret.application,
		username: secret.username,
		secret: secret.secret,
		createdAt: secret.createdAt.toJSON(),
		updatedAt: secret.updatedAt.toJSON()
	};
}

export function secretFromJSON(secret: ISecretJSON): ISecret {
	return {
		id: secret.id,
		type: secret.type,
		application: secret.application,
		username: secret.username,
		secret: secret.secret,
		createdAt: new Date(secret.createdAt),
		updatedAt: new Date(secret.updatedAt)
	};
}

async function upload(state: ISecrets) {
	await wrap(
		secretsRS.storeObject(
			'secrets',
			`secrets.json`,
			Object.values(state).reduce((json, secret) => {
				json[secret.id] = secretToJSON(secret);
				return json;
			}, {} as ISecretsJSON)
		)
	);
}

function onSync() {
	secretsRS.getObject('secrets.json', false).then((result) => {
		if (result) {
			const secrets = result as ISecretsJSON;
			delete secrets['@context'];
			writableSecrets.update((state) => {
				Object.values(secrets).forEach((secret) => {
					const prevSecret = state[secret.id],
						newSecret = secretFromJSON(secret);

					if (!prevSecret || prevSecret.updatedAt < newSecret.updatedAt) {
						state[secret.id] = newSecret;
					}
				});
				return state;
			});
		}
	});
}

remoteStorage.on('sync-done', onSync);
