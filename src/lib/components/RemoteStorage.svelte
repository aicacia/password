<script lang="ts">
	import { remoteStorage } from '$lib/state/remotestorage';
	import { onMount } from 'svelte';

	onMount(() => {
		import('remotestorage-widget').then(({ default: Widget }) => {
			const widget = new Widget(remoteStorage);
			widget.attach('remote-storage-widget');
		});
	});
</script>

<div class="absolute left-0 bottom-0">
	<div id="remote-storage-widget" />
</div>
