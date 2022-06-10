<svelte:options immutable />

<script lang="ts" context="module">
	let ID = 0;
</script>

<script lang="ts">
	import { remoteStorage } from '$lib/remoteStorage';
	import { onMount } from 'svelte';

	export let element: HTMLDivElement | undefined = undefined;
	export let widget: any = undefined;

	const id = `remote-storage-widget-${++ID}`;

	onMount(() => {
		import('remotestorage-widget').then(({ default: Widget }) => {
			const w = new Widget(remoteStorage);
			w.attach(id);
			(function onWidgetReady() {
				if (w.rsWidget) {
					widget = w;
					element = w.rsWidget;
				} else {
					setTimeout(onWidgetReady, 1000);
				}
			})();
		});
	});
</script>

<div {id} />
