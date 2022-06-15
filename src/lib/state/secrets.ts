import { cleanApplication } from '$lib/util';
import { derived, get } from 'svelte/store';
import { writable } from 'svelte/store';
import { v4 } from 'uuid';
import { remoteStorage } from '../remoteStorage';
import { decryptSecret, encryptSecret } from './password';

remoteStorage.access.claim('secrets', 'rw');
remoteStorage.caching.enable('/secrets/');

export const SCHEMA_NAME = 'secret';
export const secretsRS = remoteStorage.scope('/secrets/');

secretsRS.declareType(SCHEMA_NAME, {
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
		encryptedSecret: {
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
	required: ['id', 'type', 'application', 'username', 'encryptedSecret', 'createdAt', 'updatedAt']
});

export type ISecretType = 'password' | 'text';

export interface ISecret {
	id: string;
	type: ISecretType;
	application: string;
	username: string;
	secret?: string;
	encryptedSecret: string;
	createdAt: Date;
	updatedAt: Date;
}

export function secretToJSON(secret: ISecret): ISecretJSON {
	return {
		id: secret.id,
		type: secret.type,
		application: secret.application,
		username: secret.username,
		encryptedSecret: secret.encryptedSecret,
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
		encryptedSecret: secret.encryptedSecret,
		createdAt: new Date(secret.createdAt),
		updatedAt: new Date(secret.updatedAt)
	};
}

export interface ISecretJSON {
	id: string;
	type: ISecretType;
	application: string;
	username: string;
	encryptedSecret: string;
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
	Object.values(state).reduce((acc, secret) => {
		const applicationSecret = acc[secret.application] || (acc[secret.application] = []);
		applicationSecret.push(secret);
		return acc;
	}, {} as { [url: string]: ISecret[] })
);

export interface IAddSecret {
	type: ISecretType;
	application: string;
	username: string;
	secret: string;
}

export async function addSecret(data: IAddSecret) {
	const id = v4();

	const secret: ISecret = {
		id,
		type: data.type,
		application: cleanApplication(data.application),
		username: data.username,
		secret: data.secret,
		encryptedSecret: await encryptSecret(data.secret),
		createdAt: new Date(),
		updatedAt: new Date()
	};

	let storeTask: Promise<void> | undefined;
	writableSecrets.update((state) => {
		const newState = { ...state, [secret.id]: secret };
		storeTask = rsStoreSecret(secret);
		return newState;
	});
	if (storeTask) {
		await storeTask;
	}
}

export interface IUpdateSecret {
	type: ISecretType;
	application: string;
	username: string;
	secret: string;
}

export async function updateSecret(id: string, data: IUpdateSecret) {
	let storeTask: Promise<void> | undefined;
	const encryptedSecret = await encryptSecret(data.secret);

	writableSecrets.update((state) => {
		const secret = state[id];
		if (secret) {
			const newSecret = { ...secret, ...data, id, updatedAt: new Date() };
			newSecret.application = cleanApplication(newSecret.application);
			newSecret.encryptedSecret = encryptedSecret;
			const newState = {
				...state,
				[id]: newSecret
			};
			storeTask = rsStoreSecret(newSecret);
			return newState;
		} else {
			return state;
		}
	});
	if (storeTask) {
		await storeTask;
	}
}

export async function showSecret(secret: ISecret) {
	if (!secret.secret) {
		const decryptedSecret = (await decryptSecret(secret.encryptedSecret)) as string;
		writableSecrets.update((state) => {
			const stateSecret = state[secret.id];
			if (secret) {
				const newSecret = { ...stateSecret };
				newSecret.secret = decryptedSecret;
				const newState = {
					...state,
					[stateSecret.id]: newSecret
				};
				return newState;
			} else {
				return state;
			}
		});
	}
}

export async function deleteSecret(id: string) {
	let deleteTask: Promise<void> | undefined;
	writableSecrets.update((state) => {
		const newState = { ...state };
		delete newState[id];
		deleteTask = rsDeleteSecret(id);
		return newState;
	});
	if (deleteTask) {
		await deleteTask;
	}
}

async function rsStoreSecret(secret: ISecret) {
	await secretsRS.storeObject(SCHEMA_NAME, `${secret.id}.json`, secretToJSON(secret));
}

async function rsDeleteSecret(id: string) {
	await secretsRS.remove(`${id}.json`);
}

async function onSync() {
	const secrets = (await secretsRS.getAll('', false)) as ISecretsJSON;

	writableSecrets.update((state) => {
		const newState = { ...state };
		Object.values(secrets).forEach((secret) => {
			const prevSecret = newState[secret.id],
				newSecret = secretFromJSON(secret);

			if (!prevSecret || prevSecret.updatedAt < newSecret.updatedAt) {
				newState[secret.id] = newSecret;
			}
		});
		return newState;
	});
}

remoteStorage.on('sync-done', onSync);
