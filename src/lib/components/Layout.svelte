<svelte:options immutable />

<script lang="ts">
	import Notifications from './Notifications.svelte';

	export let embeded = false;
</script>

<div class="as-relative as-flex as-w-full as-h-full">
	<div class="as-flex as-flex-col as-w-full as-h-full">
		<div class="as-flex as-flex-col as-flex-grow">
			<slot />
		</div>
		<div class="as-text-center as-text-xs as-mt-8">
			&copy; {new Date().getFullYear()}
			<a target={embeded ? '_blank' : undefined} href="https://aicacia.github.io/secrets/"
				>https://aicacia.github.io/secret/</a
			>
		</div>
		<div class="as-text-center as-text-xs as-my-2">
			<a
				target={embeded ? '_blank' : undefined}
				href="https://aicacia.github.io/secrets/privacy-policy">Privacy Policy</a
			>
			|
			<a
				target={embeded ? '_blank' : undefined}
				href="https://aicacia.github.io/secrets/terms-of-service">Terms of Service</a
			>
		</div>
	</div>
</div>
<Notifications />
