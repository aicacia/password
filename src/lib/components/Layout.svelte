<svelte:options immutable />

<script lang="ts">
	import Notifications from './Notifications.svelte';
</script>

<div class="relative flex w-full h-full">
	<div class="flex flex-col w-full h-full">
		<div class="flex flex-col flex-grow">
			<slot />
		</div>
		<div class="text-center mt-8 mb-2">
			&copy; {new Date().getFullYear()}
			<a target="_blank" href="https://aicacia.github.io/password/"
				>https://aicacia.github.io/password/</a
			>
		</div>
	</div>
</div>
<Notifications />
