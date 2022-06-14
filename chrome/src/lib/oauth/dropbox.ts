import { DROPBOX_CLIENT_ID } from '@aicacia/secret/constants';
import { parse } from 'query-string';
import { openAndWait } from '../openAndWait';

const OAUTH_URL = 'https://www.dropbox.com/oauth2/authorize';
const REDIRECT_URI = 'https://www.dropbox.com/1/oauth2/redirect_receiver';
const GET_USER_URI = 'https://api.dropboxapi.com/2/users/get_current_account';

export async function dropbox(): Promise<{ userAddress: string; token: string }> {
	let url = `${OAUTH_URL}?client_id=${encodeURIComponent(
		DROPBOX_CLIENT_ID
	)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token`;

	url = await openAndWait(url, REDIRECT_URI);

	const hash = new URL(url).hash;
	if (!hash) {
		throw 'sync_malformed_response';
	}
	const params = parse(hash.slice(1));

	if (params.token_type !== 'bearer' || !params.access_token) {
		throw 'sync_malformed_response';
	}

	const res = await fetch(GET_USER_URI, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${params.access_token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(null)
	});
	if (!res.ok) {
		console.error(await res.text());
		throw 'sync_malformed_response';
	} else {
		const json = await res.json();
		return { userAddress: json.email, token: params.access_token as string };
	}
}
