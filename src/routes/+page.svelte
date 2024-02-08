<script lang="ts">
	import { clipboardsStore } from '$lib/stores/clipboards';
	import ClipboardPresenter from '$lib/ui/ClipboardPresenter.svelte';
	import Skeleton from '$lib/ui/Skeleton.svelte';
	import LoadMoreButton from '$lib/ui/LoadMoreButton.svelte';
	import { onMount } from 'svelte';
	import type { ClipboardStoreType } from '$lib/types/clipboard.type';


	let loading = false

	async function loadMore() {
		loading = true;
		const nextPage = $clipboardsStore.page + 1;
		try {
			const response = await fetch(`/api/clipboards?page=${nextPage}`);
			if (!response.ok) {
				// Handle error
				console.error(`Error fetching data. Status: ${response.status}`);
				return;
			}

			const apiResponse: ClipboardStoreType = await response.json();

			let cloneClipboardsStore = { ...$clipboardsStore };

			cloneClipboardsStore.page = nextPage;
			cloneClipboardsStore.items = [...$clipboardsStore.items, ...apiResponse.items];
			cloneClipboardsStore.loadedItems = $clipboardsStore.loadedItems + apiResponse.items.length;

			clipboardsStore.set(cloneClipboardsStore);
		} catch (error) {
			// Handle fetch or parsing error
			console.error('Error:', error);
		}

		loading = false;
	}

	onMount(async () => {
		try {
			const response = await fetch(`/api/clipboards?page=1`);
			if (!response.ok) {
				// Handle error
				console.error(`Error fetching data. Status: ${response.status}`);
				return;
			}

			const apiResponse: ClipboardStoreType = await response.json();
			clipboardsStore.set({ ...apiResponse, loadedItems: apiResponse.items.length });
		} catch (error) {
			// Handle fetch or parsing error
			console.error('Error:', error);
		}
	});
</script>

{#if $clipboardsStore && $clipboardsStore.items && $clipboardsStore.items.length === 0}
	<Skeleton />
{:else}
	<div class="block space-y-4">
		{#each $clipboardsStore.items as clipboard}
			<ClipboardPresenter
				id={clipboard.id}
				title={clipboard.title}
				keywords={clipboard.keywords}
				created={clipboard.created}
				updated={clipboard.updated}
			/>
		{/each}

		{#if !loading && $clipboardsStore.items.length !== $clipboardsStore.totalItems}
			<LoadMoreButton on:click={() => loadMore()} />
		{/if}

		<p>{$clipboardsStore.loadedItems} of {$clipboardsStore.totalItems} clipboards</p>
	</div>
{/if}
