<script lang="ts">
	import Secrets from '$lib/components/Secrets.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import RemoteStorage from '$lib/components/RemoteStorage.svelte';
	import { remoteStorageState } from '$lib/state/remoteStorageState';
</script>

<Layout>
	{#if $remoteStorageState === 'connected'}
		<div class="as-container as-mx-auto as-p-4 as-mt-4 as-mb-8 as-bg-white">
			<Secrets />
		</div>
	{:else}
		<h3 class="as-text-center as-py-8 as-text-lg">Please connect to a Storage Provider</h3>
	{/if}
</Layout>
<div class="as-absolute as-left-0 as-bottom-0">
	<RemoteStorage />
</div>
