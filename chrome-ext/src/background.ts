import { oauth } from './oauth';

const OAUTH: { provider?: string; token?: string } = {};

chrome.runtime.onMessage.addListener(
	async ([name, ...args]: [name: string, ...args: unknown[]], _sender, sendResponse) => {
		switch (name) {
			case 'signIn': {
				const provider = args[0] as 'dropbox' | 'googledrive',
					token = await oauth(provider);
				OAUTH.provider = provider;
				OAUTH.token = token;
				break;
			}
			case 'getCurrent': {
				sendResponse([OAUTH.provider, OAUTH.token]);
				break;
			}
			case 'signOut': {
				OAUTH.provider = undefined;
				OAUTH.token = undefined;
				break;
			}
		}
	}
);
