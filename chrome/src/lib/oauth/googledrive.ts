import { GOOGLE_DRIVE_CLIENT_ID } from '@aicacia/secret/constants';
import { parse } from 'query-string';
import { openAndWait } from '../openAndWait';

const OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const REDIRECT_URI = 'https://aicacia.github.io/secrets';
const SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const GET_USER_URI = 'https://www.googleapis.com/drive/v2/about?fields=user';

export async function googledrive(): Promise<{ userAddress: string; token: string }> {
	let url = `${OAUTH_URL}?client_id=${encodeURIComponent(
		GOOGLE_DRIVE_CLIENT_ID
	)}&scope=${encodeURIComponent(SCOPE)}&redirect_uri=${encodeURIComponent(
		REDIRECT_URI
	)}&response_type=token`;

	url = await openAndWait(url, REDIRECT_URI);

	const hash = new URL(url).hash || '#';
	const params = parse(hash.slice(1));

	if (params.token_type !== 'Bearer' || !params.access_token) {
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
