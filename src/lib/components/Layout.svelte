<script lang="ts">
	import Nav from './Nav.svelte';
	import Notifications from './Notifications.svelte';
</script>

<div class="h-screen w-screen bg-gray-50 flex flex-col">
	<Nav />
	<div class="container mx-auto h-full">
		<slot />
	</div>
</div>

<Notifications />
