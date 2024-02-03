<script>
	import '../app.css';
	import Sidebar from '$lib/ui/Sidebar.svelte';
	import { navbarState } from '$lib/stores/navbar';
	import Header from '$lib/ui/Header.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="block">
	{#if $navbarState === 'normal-opened'}
		<Sidebar />
	{/if}

	<div class="flex flex-col w-full" in:fade>
		<Header />
		<main class="p-4">
			<slot />
		</main>
	</div>
</div>
