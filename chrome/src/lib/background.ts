import {
	GENERATE_PASSOWORD_MSG_ID,
	SIGN_IN_ERROR_NOTIFICATION_ID,
	SIGN_IN_MSG_ID,
	SIGN_IN_SUCCESS_NOTIFICATION_ID,
	SIGN_OUT_MSG_ID
} from './constants';
import { oauth } from './oauth';

chrome.contextMenus.create({
	id: GENERATE_PASSOWORD_MSG_ID,
	title: 'Generate Secret',
	contexts: ['editable']
});

chrome.contextMenus.onClicked.addListener(
	(info: chrome.contextMenus.OnClickData, _tab?: chrome.tabs.Tab) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const tab = tabs[0];
			if (tab?.id) {
				chrome.tabs.sendMessage(tab?.id, [GENERATE_PASSOWORD_MSG_ID, info]);
			}
		});
	}
);

chrome.runtime.onMessage.addListener(
	async ([name, ...args]: [name: string, ...args: unknown[]]) => {
		switch (name) {
			case SIGN_IN_MSG_ID: {
				const provider = args[0] as 'dropbox' | 'googledrive';
				try {
					const { userAddress, token } = await oauth(provider);
					await chrome.storage.local.set({
						provider,
						userAddress,
						token
					});
					chrome.notifications.create(SIGN_IN_SUCCESS_NOTIFICATION_ID, {
						type: 'basic',
						iconUrl: 'images/icon-16x16.png',
						title: `Signed in as ${userAddress}`,
						message: `You are now signed in with ${provider}`,
						priority: 2,
						eventTime: Date.now()
					});
				} catch (e) {
					chrome.notifications.create(SIGN_IN_ERROR_NOTIFICATION_ID, {
						type: 'basic',
						iconUrl: 'images/icon-16x16.png',
						title: 'Failed to sign in',
						message: (e as Error).message,
						priority: 2,
						eventTime: Date.now()
					});
				}
				break;
			}
			case SIGN_OUT_MSG_ID: {
				await chrome.storage.local.remove(['provider', 'userAddress', 'token']);
				break;
			}
		}
	}
);
