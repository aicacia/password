<script lang="ts">
	import RemoteStorage from './RemoteStorage.svelte';
	import Notifications from './Notifications.svelte';
</script>

<div class="h-screen w-screen bg-gray-50 flex flex-col overflow-auto">
	<div class="container mx-auto h-full my-8">
		<slot />
	</div>
	<RemoteStorage />
	<Notifications />
</div>
