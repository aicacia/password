import { v4 } from 'uuid';
import { oauth } from './oauth';

chrome.runtime.onMessage.addListener(
	async ([name, ...args]: [name: string, ...args: unknown[]], _sender, sendResponse) => {
		switch (name) {
			case 'signIn': {
				const provider = args[0] as 'dropbox' | 'googledrive';
				const token = await oauth(provider);
				localStorage.setItem('remotestorage:backend', provider);
				localStorage.setItem('remotestorage:wireclient', JSON.stringify({ token }));
				chrome.notifications.create(v4(), {
					type: 'basic',
					iconUrl: 'images/icon-16x16.png',
					title: 'Sign in successful',
					message: `You are now signed in with ${provider}`,
					priority: 2,
					eventTime: Date.now()
				});
				break;
			}
			case 'signOut': {
				localStorage.removeItem('remotestorage:backend');
				localStorage.removeItem('remotestorage:token');
				break;
			}
			case 'getCurrent': {
				const provider = localStorage.getItem('remotestorage:backend');
				const wireclient = localStorage.getItem('remotestorage:wireclient');
				let token: string | null = null;
				if (wireclient) {
					try {
						token = JSON.parse(wireclient).token;
					} catch (_error) {}
				}
				sendResponse([provider, token]);
				break;
			}
		}
	}
);
