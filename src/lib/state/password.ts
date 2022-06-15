import * as openpgp from 'openpgp';
import { derived, get, writable } from 'svelte/store';

const passwordWritable = writable<string | null>(null);
const askingForPasswordWritable = writable(false);

export const password = derived(passwordWritable, (state) => state);
export const askingForPassword = derived(askingForPasswordWritable, (state) => state);

export function setPassword(password: string) {
	passwordWritable.set(password);
}

export function cancelAskingForPassword() {
	askingForPasswordWritable.set(false);
}

export async function waitForPassword() {
	return new Promise<string>((resolve, reject) => {
		let first = true;
		const unsubscribe = derived([password, askingForPassword], ([password, askingForPassword]) => {
			if (!first && !askingForPassword && !password) {
				reject('No password set');
				setTimeout(unsubscribe, 1);
			} else if (password) {
				askingForPasswordWritable.set(false);
				resolve(password);
				setTimeout(unsubscribe, 1);
			} else {
				askingForPasswordWritable.set(true);
			}
			first = false;
		}).subscribe(() => undefined);
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
