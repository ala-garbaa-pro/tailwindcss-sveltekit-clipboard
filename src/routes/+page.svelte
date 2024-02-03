<script lang="ts">
	import { clipboardsStore } from '$lib/stores/clipboards';
	import ClipboardPresenter from '$lib/ui/ClipboardPresenter.svelte';
	import Skeleton from '$lib/ui/Skeleton.svelte';
	import LoadMoreButton from '$lib/ui/LoadMoreButton.svelte';
	import { onMount } from 'svelte';
	import type { ClipboardStoreType } from '$lib/types/clipboard.type';

	function loadMore() {}

	onMount(async () => {
		try {
			const response = await fetch(`/api/clipboards?page=1`);
			if (!response.ok) {
				// Handle error
				console.error(`Error fetching data. Status: ${response.status}`);
				return;
			}

			const apiResponse: ClipboardStoreType = await response.json();
			clipboardsStore.set(apiResponse);
		} catch (error) {
			// Handle fetch or parsing error
			console.error('Error:', error);
		}
	});
</script>

{#if $clipboardsStore && $clipboardsStore.items && $clipboardsStore.items.length === 0}
	<Skeleton />
{:else}
	{#each $clipboardsStore.items as clipboard}
		<ClipboardPresenter
			id={clipboard.id}
			title={clipboard.title}
			keywords={clipboard.keywords}
			created={clipboard.created}
			updated={clipboard.updated}
		/>
	{/each}

	<p>{$clipboardsStore.items.length} of {$clipboardsStore.totalItems} clipboards</p>

	<LoadMoreButton on:click={() => loadMore()} />
{/if}
