import { dropbox } from './dropbox';
import { googledrive } from './googledrive';

export async function oauth(
	provider: 'dropbox' | 'googledrive'
): Promise<{ userAddress: string; token: string }> {
	if (provider === 'dropbox') {
		return dropbox();
	} else if (provider === 'googledrive') {
		return googledrive();
	} else {
		throw `unknown_provider:${provider}`;
	}
}
