<script lang="ts">
	import Home from '$lib/components/Home.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { keys } from '$lib/state/keys';

	$: if (!$keys.publicKey && $keys.loaded) {
		goto(`${base}/keys`);
	}
</script>

<Layout>
	<Home />
</Layout>
