export async function openAndWait(url: string, expectedUrl: string) {
	await chrome.tabs.create({ url, active: true });

	return new Promise<string>((resolve, reject) => {
		function updateCallback(_tabId: number, _changeInfo, tab: chrome.tabs.Tab) {
			if (tab.url.startsWith(expectedUrl)) {
				resolve(tab.url);
				chrome.tabs.remove(tab.id);
				chrome.tabs.onUpdated.removeListener(updateCallback);
				chrome.tabs.onRemoved.removeListener(removeCallback);
			}
		}
		async function removeCallback(tabId: number) {
			const tab = await chrome.tabs.get(tabId);

			if (tab?.url.startsWith(url) || tab?.url.startsWith(expectedUrl)) {
				reject('tab-closed');
				chrome.tabs.onUpdated.removeListener(updateCallback);
				chrome.tabs.onRemoved.removeListener(removeCallback);
			}
		}
		chrome.tabs.onUpdated.addListener(updateCallback);
		chrome.tabs.onRemoved.addListener(removeCallback);
	});
}
