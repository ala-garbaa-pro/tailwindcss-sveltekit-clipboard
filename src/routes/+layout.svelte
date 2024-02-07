<script lang="ts">
	import '../app.css';
	import '$lib/vendors/prismjs/prism.min.css';
	import '$lib/vendors/prismjs/prism.min.js';

	import Sidebar from '$lib/ui/Sidebar.svelte';
	import { isNavbarOpen, searchState } from '$lib/stores/navbar';
	import Header from '$lib/ui/Header.svelte';
	import { fade, slide } from 'svelte/transition';
	import SearchModal from '$lib/ui/SearchModal.svelte';
	import { onMount } from 'svelte';
	import { getLSData, userCacheStore } from '$lib/stores/userCacheStore';

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

	onMount(() => {
		// get cached user info from user browser local storage
		const data = getLSData();
		userCacheStore.set(data);
	});
</script>

<div class="relative flex" role="button" on:keydown={handleKeyDown} tabindex="0">
	{#if $searchState === 'opened'}
		<SearchModal />
	{/if}

	{#if $isNavbarOpen}
		<!-- <div class="hidden lg:block"> -->
		<div class="block">
			<Sidebar />
			<div out:slide={{ axis: 'x' }} class="w-[15rem] h-screen"></div>
		</div>
	{/if}

	<div class="flex flex-col w-full" in:fade={{ duration: 600 }}>
		<Header />
		<main class="container relative p-4 m-auto mt-10">
			<slot />
		</main>
		<div class="flex items-center justify-center px-2 py-3">
			Copyright © <span>{new Date().getFullYear()}</span>
			<a class="px-2 font-bold text-blue-500 hover:underline" href="https://alagarbaa.com/"
				>Ala GARBAA.</a
			>
		</div>
	</div>
</div>
