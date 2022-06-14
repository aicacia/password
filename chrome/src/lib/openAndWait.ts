export async function openAndWait(url: string, expectedUrl: string) {
	const [finalURL, _window] = await Promise.all([
		new Promise<string>((resolve, reject) => {
			function updateCallback(
				_tabId: number,
				_changeInfo: chrome.tabs.TabChangeInfo,
				tab: chrome.tabs.Tab
			) {
				if (tab.url?.startsWith(expectedUrl)) {
					resolve(tab.url);
					if (tab.id) {
						chrome.tabs.remove(tab.id);
					}
					chrome.tabs.onUpdated.removeListener(updateCallback);
					chrome.tabs.onRemoved.removeListener(removeCallback);
				}
			}
			async function removeCallback(tabId: number) {
				const tab = await chrome.tabs.get(tabId);

				if (tab?.url?.startsWith(url) || tab?.url?.startsWith(expectedUrl)) {
					reject('tab-closed');
				}
			}
			chrome.tabs.onUpdated.addListener(updateCallback);
			chrome.tabs.onRemoved.addListener(removeCallback);
		}),
		chrome.windows.create({ url, type: 'popup', width: 480, height: 640 })
	]);
	return finalURL;
}
