<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/ui/Sidebar.svelte';
	import { navbarState, searchState } from '$lib/stores/navbar';
	import Header from '$lib/ui/Header.svelte';
	import { fade } from 'svelte/transition';
	import SearchModal from '$lib/ui/SearchModal.svelte';

	function handleKeyDown(event: KeyboardEvent) {
		// Check if the Ctrl (or Command on macOS) key is pressed and the key is 'K'
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			event.preventDefault(); // Prevent the default behavior of the key combination
			console.log('Ctrl + K pressed!');
			searchState.set('opened');
		}
		// Check if the Esc
		if (event.key === 'Escape') {
			event.preventDefault();
			searchState.set('closed');
		}
	}
</script>

<div class="relative flex" role="button" on:keydown={handleKeyDown} tabindex="0">
	{#if $searchState === 'opened'}
		<SearchModal />
	{/if}

	{#if $navbarState === 'normal-opened'}
		<Sidebar />
	{/if}

	<div class="flex flex-col w-full" in:fade={{ duration: 600 }}>
		<Header />
		<main class="p-4 w-[50vw] m-auto">
			<slot />
		</main>
	</div>
</div>
