<script lang="ts">
	import { searchState } from '$lib/stores/navbar';
	import type {
		ClipboardSearchResponseType,
		SearchClipboardByType
	} from '$lib/types/clipboard.type';
	import { formatTimeAgo } from '$lib/utils/date/formatTimeAgo';
	import { afterUpdate } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let searchedClipboards: ClipboardSearchResponseType[];
	let inputElement: HTMLInputElement;

	let searchValue: string;

	let searching = false;

	let searchBy: SearchClipboardByType = 'title';

	let debounceTimer: NodeJS.Timeout;

	const onSearchHandler = async () => {
		if (searchValue.trim() === '') return;
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
		searching = true;
		// Clear the previous timer
		clearTimeout(debounceTimer);

		// Set a new timer
		debounceTimer = setTimeout(() => {
			onSearchHandler();
		}, 1000);
	};

	afterUpdate(() => {
		if (inputElement) {
			inputElement.focus();
		}
	});

	$: if (searchBy) {
		onSearchHandler();
	}
</script>

<div
	out:fly
	in:fade
	class="cursor-default w-[38vw] fixed z-50 transform -translate-x-1/2 -translate-y-1/2 rounded-lg left-1/2 top-1/2 bg-midnight-metal h-[500px]"
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
		<div class="flex p-4 space-x-5 border-b-[.25px] border-b-midnight-pitch">
			<p class="text-sm font-semibold text-white">Search by</p>
			<div class="flex items-center gap-x-2">
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

			<div class="flex items-center gap-x-2">
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

			<div class="flex items-center gap-x-2">
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
			{#if searchedClipboards && searchedClipboards.length > 0}
				{#each searchedClipboards as clipboard}
					<a
						href={`/${clipboard.id}`}
						class="block w-full px-4 py-2 rounded-md bg-midnight-spider hover:bg-midnight-pitch"
					>
						<div class="flex justify-between">
							<h1 class="font-semibold">{clipboard.title}</h1>
							<h3 class="text-[10px]">#{clipboard.id}</h3>
						</div>

						<div class="flex justify-between">
							<h3 class="text-sm">{clipboard.keywords}</h3>
							<h3 class="text-xs">Updated {formatTimeAgo(clipboard.updated)}</h3>
						</div>
					</a>
				{/each}
			{/if}

			{#if searching}
				{#each new Array(9) as _}
					<div class="flex">
						<div class="block w-full px-4 py-2 rounded-md bg-midnight-spider">
							<div class="flex justify-between">
								<h1 class="font-semibold">
									<div class="h-2.5 bg-gray-300 mt-1 rounded-full dark:bg-gray-600 w-96"></div>
								</h1>
								<h3 class="text-[10px] flex justify-center items-center">
									# <div class="ml-1 h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
								</h3>
							</div>

							<div class="flex justify-between">
								<h3 class="text-sm">
									<div class="w-32 h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
								</h3>
								<h3 class="flex items-center justify-center text-xs">
									Updated <div
										class="h-2 ml-1 bg-gray-200 rounded-full w-14 dark:bg-gray-700"
									></div>
								</h3>
							</div>
						</div>
						<div class="w-4 h-1"></div>
					</div>
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
