<script lang="ts">
	import { base } from '$app/paths';

	import Layout from '$lib/components/Layout.svelte';
</script>

<Layout>
	<div class="min-w-min mx-auto p-4 mt-4 mb-8 bg-white">
		<h1 class="as-text-2xl">Privacy Policy</h1>
		<hr />
		<p>
			Simple privacy policy, your data is your data. We don't use it, we don't share it, and we
			don't sell it.
		</p>
		<div class="text-center mt-4">
			<a role="button" class="btn primary" href={`${base}/`}>Secrets</a>
		</div>
	</div>
</Layout>
