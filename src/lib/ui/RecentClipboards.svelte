<script lang="ts">
	import { userCacheStore } from '$lib/stores/userCacheStore';
	import { formatTimeAgo } from '$lib/utils/date/formatTimeAgo';
</script>

<h2 class="text-xl">Recent</h2>

{#if $userCacheStore.history.length > 0}
	{#each $userCacheStore.history as clipboard}
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
			<div class="flex flex-col justify-between w-5">
				<span class="cursor-pointer hover:text-red-400"
					><svg width="20" height="20" viewBox="0 0 20 20">
						<title>Remove from recent</title>
						<path
							class="fill-current"
							d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
							stroke="currentColor"
							fill="none"
							fill-rule="evenodd"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
                    </svg></span
				>
				<span class="cursor-pointer hover:text-yellow-400"
					><svg width="20" height="20" viewBox="0 0 20 20">
						<title>Add to favorites</title>
						<path
							class="stroke-current"
							d="M10 14.2L5 17l1-5.6-4-4 5.5-.7 2.5-5 2.5 5 5.6.8-4 4 .9 5.5z"
							stroke="currentColor"
							fill="none"
							fill-rule="evenodd"
							stroke-linejoin="round"
						></path></svg
					></span
				>
			</div>
		</div>
	{/each}
{/if}
