export function createURL(rawURL: string): URL | undefined {
	try {
		const url = new URL(rawURL);
		url.href = `${url.protocol}//${url.host}${url.pathname}`;
		if (url.hash) {
			url.href += `#${url.hash}`;
		}
		if (url.search) {
			url.href += `?${url.search}`;
		}
		return url;
	} catch (e) {
		return undefined;
	}
}

export function cleanURL(rawURL: string): string {
	return createURL(rawURL)?.toString() || rawURL.trim();
}
