import './index.css';
import Popup from './Popup.svelte';

function main() {
	new Popup({
		target: document.body
	});
}

addEventListener('load', main);
