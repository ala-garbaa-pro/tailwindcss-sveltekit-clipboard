<script lang="ts">
	import { searchState } from '$lib/stores/navbar';
	import { type Clipboard } from '$lib/types/clipboard.type';
	import type { SearchClipboardByType } from '$lib/types/clipboard.type';
	import { afterUpdate } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import RecentClipboards from './RecentClipboards.svelte';
	import FavoriteClipboards from './FavoriteClipboards.svelte';
	import SearchItemSkeleton from './SearchItemSkeleton.svelte';
	import SearchItem from './SearchItem.svelte';

	let searchedClipboards: Clipboard[];
	let inputElement: HTMLInputElement;

	let searchValue: string;

	let searching = false;

	let firstSearchBy: SearchClipboardByType = 'title';
	let searchBy: SearchClipboardByType = 'title';

	let debounceTimer: NodeJS.Timeout;

	const onSearchHandler = async () => {
		if (searchValue !== undefined && searchValue.trim() === '') return;
		searchedClipboards = [];
		try {
			const response = await fetch(
				`/api/clipboards/search?searchValue=${searchValue.trim()}&searchBy=${searchBy}`
			);

			if (!response.ok) {
				// Handle error
				console.error(`Error fetching data. Status: ${response.status}`);
				searching = false;
				return;
			}

			searchedClipboards = await response.json();
			searching = false;
		} catch (error) {
			// Handle fetch or parsing error
			console.error('Error:', error);
		}
	};

	const handleInput = () => {
		if (searchValue.trim() === '') return;
		searching = true;
		// Clear the previous timer
		clearTimeout(debounceTimer);

		// Set a new timer
		debounceTimer = setTimeout(() => {
			console.log('B');
			onSearchHandler();
		}, 500);
	};

	afterUpdate(() => {
		if (inputElement) {
			inputElement.focus();
		}
	});

	$: if (searchBy !== firstSearchBy && searchValue) {
		onSearchHandler();
	}
</script>

<div
	out:fly
	in:fade
	class="cursor-default w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[38vw] fixed z-50 transform -translate-x-1/2 -translate-y-1/2 rounded-lg left-1/2 top-1/2 bg-midnight-metal h-[500px]"
>
	<div class="flex p-4 border-b-[.25px] border-b-midnight-pitch">
		<svg width="24" height="24" fill="none" aria-hidden="true" class="flex-none mr-3"
			><path
				d="m19 19-3.5-3.5"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path><circle
				cx="11"
				cy="11"
				r="6"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			></circle></svg
		>
		<input
			bind:this={inputElement}
			bind:value={searchValue}
			on:input={handleInput}
			type="text"
			placeholder="Search documentation"
			class="w-full bg-transparent outline-none"
		/>
		<button class="px-1 rounded-md bg-midnight-pitch" on:click={() => searchState.set('closed')}
			>ESC</button
		>
	</div>

	<div class="flex flex-col">
		<div
			class="flex flex-col sm:flex-row sm:items-center px-4 pb-4 border-b-[.25px] border-b-midnight-pitch flex-wrap"
		>
			<div class="mt-4 text-sm font-semibold text-white">Search by</div>
			<div class="flex items-center mt-4 ml-4 gap-x-2">
				<input
					id="title"
					name="search-by"
					type="radio"
					on:click={() => (searchBy = 'title')}
					checked={searchBy === 'title'}
					class="w-4 h-4 cursor-pointer text-silver-100 border-white/10 bg-white/5 focus:ring-silver-100 focus:ring-offset-gray-900"
				/>
				<label
					for="title"
					class="block text-sm font-medium leading-4 text-white cursor-pointer select-none"
					>Title</label
				>
			</div>

			<div class="flex items-center mt-4 ml-4 gap-x-2">
				<input
					id="keywords"
					name="search-by"
					type="radio"
					on:click={() => (searchBy = 'keywords')}
					checked={searchBy === 'keywords'}
					class="w-4 h-4 cursor-pointer text-silver-100 border-white/10 bg-white/5 focus:ring-silver-100 focus:ring-offset-gray-900"
				/>
				<label
					for="keywords"
					class="block text-sm font-medium leading-4 text-white cursor-pointer select-none"
					>Keywords</label
				>
			</div>

			<div class="flex items-center mt-4 ml-4 gap-x-2">
				<input
					id="content"
					name="search-by"
					type="radio"
					on:click={() => (searchBy = 'content')}
					checked={searchBy === 'content'}
					class="w-4 h-4 cursor-pointer text-silver-100 border-white/10 bg-white/5 focus:ring-silver-100 focus:ring-offset-gray-900"
				/>
				<label
					for="content"
					class="block text-sm font-medium leading-4 text-white cursor-pointer select-none"
					>Content</label
				>
			</div>
		</div>
	</div>
	<div class="flex flex-col py-4 pl-4 pr-2">
		<div class="flex flex-col h-[355px] overflow-y-scroll space-y-2">
			{#if searchValue && searchValue.trim() !== '' && searchedClipboards && searchedClipboards.length > 0}
				{#each searchedClipboards as clipboard}
					<SearchItem {clipboard} />
				{/each}
			{/if}

			{#if searchValue && searchValue.trim() !== '' && !searching && searchedClipboards && searchedClipboards.length === 0}
				<p>No results for "{searchValue.trim()}"</p>
			{/if}

			{#if (!searching && searchValue === undefined) || (searchValue && searchValue.trim() === '')}
				<RecentClipboards />
				<FavoriteClipboards />
			{/if}

			{#if searching}
				{#each new Array(9) as _}
					<SearchItemSkeleton />
				{/each}
			{/if}
		</div>
	</div>
</div>

<div
	role="presentation"
	class="absolute top-0 left-0 z-40 flex w-screen h-screen bg-midnight-crow/50 backdrop-blur-sm"
	on:click={() => searchState.set('closed')}
></div>
