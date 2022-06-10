<svelte:options immutable />

<script lang="ts">
	import RemoteStorage from './RemoteStorage.svelte';
	import Notifications from './Notifications.svelte';
</script>

<div class="flex w-full h-full">
	<div class="flex flex-col flex-grow">
		<slot />
	</div>
	<div class="absolute left-0 bottom-0 z-20">
		<RemoteStorage />
	</div>
	<Notifications />
</div>
