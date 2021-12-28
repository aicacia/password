<script lang="ts">
	export let messages: string[] = [];
</script>

{#each messages as message}
	<span class="text-red-500">{message}</span>
{/each}
