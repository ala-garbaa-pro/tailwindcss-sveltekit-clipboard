<script lang="ts">
	import { removeFavorite, userCacheStore } from '$lib/stores/userCacheStore';
	import type { Clipboard } from '$lib/types/clipboard.type';
	import { formatTimeAgo } from '$lib/utils/date/formatTimeAgo';

	let busy = false;

	const handleFavoriteClick = (clipboard: Clipboard) => {
		if (busy) return;
		busy = true;
		const newData = removeFavorite(clipboard.id);
		userCacheStore.set(newData);
		busy = false;
	};
</script>

{#if $userCacheStore.favorites.length > 0}
	<h2 class="text-xl">Favorite</h2>

	{#each $userCacheStore.favorites.slice(0, 3) as clipboard}
		<div class="flex w-full px-4 py-2 rounded-md bg-midnight-spider hover:bg-midnight-pitch">
			<a href={`/${clipboard.id}`} class="w-full pr-6">
				<div class="flex flex-col justify-between sm:flex-row">
					<h1 class="font-semibold">{clipboard.title}</h1>
					<h3 class="text-[10px]">#{clipboard.id}</h3>
				</div>

				<div class="flex flex-col justify-between sm:flex-row">
					<h3 class="text-sm">{clipboard.keywords}</h3>
					<h3 class="text-xs">Updated {formatTimeAgo(clipboard.updated)}</h3>
				</div>
			</a>
			<div class="flex flex-col justify-center w-5">
				<button
					on:click={() => handleFavoriteClick(clipboard)}
					class="text-yellow-400 cursor-pointer hover:text-gray-500"
					><svg width="20" height="20" viewBox="0 0 20 20">
						<title>Remove from favorites</title>
						<path
							class="stroke-current"
							d="M10 14.2L5 17l1-5.6-4-4 5.5-.7 2.5-5 2.5 5 5.6.8-4 4 .9 5.5z"
							stroke="currentColor"
							fill="currentColor"
							fill-rule="evenodd"
							stroke-linejoin="round"
						></path></svg
					></button
				>
			</div>
		</div>
	{/each}
{/if}
