<script lang="ts">
	export let descriptors: string[];
</script>

<svg
	class="w-7 h-6 px-[0.5px] text-silver-100 cursor-pointer hover:bg-midnight-spider rounded"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	><title>Close sidebar</title>

	{#each descriptors as d}
		<path fill="currentColor" {d} />
	{/each}
</svg>
