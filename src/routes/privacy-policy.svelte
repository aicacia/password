<script lang="ts">
	import { base } from '$app/paths';

	import Layout from '$lib/components/Layout.svelte';
</script>

<Layout>
	<div class="as-container as-mx-auto as-p-4 as-mt-4 as-mb-8 as-bg-white">
		<h1 class="as-text-2xl">Privacy Policy</h1>
		<hr />
		<p>
			Simple privacy policy, your data is your data. We don't use it, we don't share it, and we
			don't sell it.
		</p>
		<div class="as-text-center as-mt-4">
			<a role="button" class="as-underline" href={`${base}/`}>Secrets</a>
		</div>
	</div>
</Layout>
