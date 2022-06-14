import './preflight.postcss';
import './index.postcss';
import Popup from './lib/components/Popup.svelte';

function main() {
	new Popup({
		target: document.body
	});
}

if (document.readyState === 'complete') {
	main();
} else {
	addEventListener('DOMContentLoaded', main);
}
