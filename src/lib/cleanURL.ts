export function cleanURL(rawURL: string): string {
	try {
		const { protocol, host, pathname, hash, search } = new URL(rawURL);
		let url = `${protocol}//${host}${pathname}`;
		if (hash) {
			url += `#${hash}`;
		}
		if (search) {
			url += `?${search}`;
		}
		return url;
	} catch (e) {
		return rawURL.trim();
	}
}
