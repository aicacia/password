import { GOOGLE_DRIVE_CLIENT_ID } from '@aicacia/password/constants';
import { parse } from 'query-string';
import { openAndWait } from '../openAndWait';

const OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const REDIRECT_URI = 'https://aicacia.github.io/password';
const SCOPE = 'https://www.googleapis.com/auth/drive.appdata';

export async function googledrive(): Promise<string> {
	let url = `${OAUTH_URL}?client_id=${encodeURIComponent(
		GOOGLE_DRIVE_CLIENT_ID
	)}&scope=${encodeURIComponent(SCOPE)}&redirect_uri=${encodeURIComponent(
		REDIRECT_URI
	)}&response_type=token`;

	url = await openAndWait(url, REDIRECT_URI);

	const hash = new URL(url).hash || '#';
	const params = parse(hash.slice(1));

	console.log(params);

	if (params.token_type !== 'Bearer' || !params.access_token) {
		throw 'sync_malformed_response';
	}

	return params.access_token as string;
}
