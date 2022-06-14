import { createMessage, readMessage, encrypt, decrypt, type WebStream } from 'openpgp';

export async function encryptWithSecret(text: string, secret: string) {
	return await encrypt({
		secrets: [secret],
		message: await createMessage({ text: text, format: 'utf8' }),
		format: 'armored'
	});
}

export async function decryptWithSecret(message: WebStream<string>, secret: string) {
	return await decrypt({
		secrets: [secret],
		message: await readMessage({
			armoredMessage: message
		})
	});
}
