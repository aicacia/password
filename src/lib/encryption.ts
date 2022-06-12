import { createMessage, readMessage, encrypt, decrypt, type WebStream } from 'openpgp';

export async function encryptWithPassword(text: string, password: string) {
	return await encrypt({
		passwords: [password],
		message: await createMessage({ text: text, format: 'utf8' }),
		format: 'armored'
	});
}

export async function decryptWithPassword(message: WebStream<string>, password: string) {
	return await decrypt({
		passwords: [password],
		message: await readMessage({
			armoredMessage: message
		})
	});
}
