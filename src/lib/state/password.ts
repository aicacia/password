import * as openpgp from 'openpgp';
import ee3 from 'eventemitter3';
import { derived, get, writable } from 'svelte/store';
import { remoteStorage } from '$lib/remoteStorage';

interface IEmitter {
	password(password: string): void;
	cancel(): void;
	error(error: Error): void;
}

export const passwordEmitter = new ee3.EventEmitter<IEmitter>();
export const passwordWritable = writable<string | null>(null);

export const password = derived(passwordWritable, (state) => state);
export const askingForPassword = writable(false);

export function setPassword(password: string) {
	passwordWritable.set(password);
	passwordEmitter.emit('password', password);
}

export function clearPassword() {
	passwordWritable.set(null);
}

remoteStorage.on('disconnected', clearPassword);

export function cancelAskingForPassword() {
	passwordEmitter.emit('cancel');
	askingForPassword.set(false);
}

export async function waitForPassword() {
	return new Promise<string>((resolve, reject) => {
		const currentPassowrd = get(password);
		if (currentPassowrd) {
			resolve(currentPassowrd);
		} else {
			askingForPassword.set(true);
			passwordEmitter.once('password', resolve);
			passwordEmitter.once('cancel', () => {
				reject(new Error('Cancelled'));
			});
			passwordEmitter.once('error', reject);
		}
	});
}

export async function encryptSecret(secret: string) {
	const password = await waitForPassword();
	const message = await openpgp.createMessage({
		text: secret,
		format: 'utf8'
	});
	const encryptMessage = await openpgp.encrypt({
		passwords: [password],
		message,
		format: 'armored'
	});
	return encryptMessage as string;
}

export async function decryptSecret(encryptedSecret: string) {
	try {
		const password = await waitForPassword();
		const message = await openpgp.readMessage({
			armoredMessage: encryptedSecret
		});
		const decryptMessage = await openpgp.decrypt({
			passwords: [password],
			message
		});
		return decryptMessage.data;
	} catch (e) {
		passwordWritable.set(null);
		throw e;
	}
}
