import { DROPBOX_CLIENT_ID } from '@aicacia/password/constants';
import { parse } from 'query-string';
import { openAndWait } from '../openAndWait';

const OAUTH_URL = 'https://www.dropbox.com/oauth2/authorize';
const REDIRECT_URI = 'https://www.dropbox.com/1/oauth2/redirect_receiver';

export async function dropbox(): Promise<string> {
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

	return params.access_token as string;
}
