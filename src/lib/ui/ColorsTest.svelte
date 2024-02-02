<script>
	let midnightColors = ['pitch', 'spider', 'metal', 'grease', 'crow'];
</script>

<div class="text-green-500 font-bold w-20 h-20 bg-silver-50">bg-silver-50</div>
<div class="text-green-500 font-bold w-20 h-20 bg-silver-100">bg-silver-100</div>

<hr />

{#each midnightColors as color}
	<div class={`text-green-500 font-bold w-20 h-20 bg-midnight-${color}`}>bg-midnight-{color}</div>
{/each}
