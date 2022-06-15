import '../wrapped-preflight.postcss';
import '../index.postcss';
import { GENERATE_PASSOWORD_MSG_ID } from './constants';

chrome.runtime.onMessage.addListener(([type, ...args]: [type: string, ...args: unknown[]]) => {
	switch (type) {
		case GENERATE_PASSOWORD_MSG_ID: {
			const input = document.activeElement;
			break;
		}
	}
});

export function main() {}

if (document.readyState === 'complete') {
	main();
} else {
	addEventListener('load', main);
}
