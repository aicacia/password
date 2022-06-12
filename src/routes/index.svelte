<script lang="ts">
	import Passwords from '$lib/components/Passwords.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import RemoteStorage from '$lib/components/RemoteStorage.svelte';
</script>

<Layout>
	<div class="container mx-auto p-4 mt-4 mb-8 bg-white">
		<Passwords />
	</div>
</Layout>
<div class="absolute left-0 bottom-0">
	<RemoteStorage />
</div>
