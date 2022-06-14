import { fuzzyEquals } from '@aicacia/string-fuzzy_equals';
import type { ISecret } from './state/secrets';

export function searchSecret(secret: ISecret, search: string) {
	return (
		fuzzyEquals(search, secret.application) ||
		fuzzyEquals(search, secret.username) ||
		fuzzyEquals(search, secret.secret)
	);
}

export function cleanURL(rawURL: string): string | undefined {
	try {
		const url = new URL(rawURL);
		const pathname = url.pathname.endsWith('/')
			? url.pathname.slice(0, url.pathname.length - 1)
			: url.pathname;
		let href = `${url.protocol}//${url.host}${pathname}`;
		if (url.hash) {
			href += `#${url.hash}`;
		}
		if (url.search) {
			href += `?${url.search}`;
		}
		return href;
	} catch (e) {
		return undefined;
	}
}

export function cleanApplication(rawURL: string): string {
	return cleanURL(rawURL) || rawURL.trim();
}

export function createURL(rawURL: string): URL | undefined {
	const url = cleanURL(rawURL);
	if (url) {
		return new URL(url);
	} else {
		return undefined;
	}
}

export function createInsecureID() {
	return Math.random().toString(36).slice(2);
}
