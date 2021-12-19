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

<nav class="relative h-16">
	<div class="absolute inset-y-0 right-0 z-10">
		<div id="remote-storage-widget" />
	</div>
</nav>
