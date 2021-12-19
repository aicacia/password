<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="flex h-full justify-center items-center">
	<div class="flex-col">
		<h1>Welcome to Aicacia Password</h1>
		<div class="flex justify-center mt-2">
			<a class="btn primary" href={`${base}/passwords`}>Passwords</a>
			<a class="btn primary" href={`${base}/keys`}>Keys</a>
		</div>
	</div>
</div>
