<svelte:options immutable />

<script lang="ts">
	export let messages: string[] = [];
</script>

<ul>
	{#each messages as message}
		<li class="as-text-red-500">{message}</li>
	{/each}
</ul>
