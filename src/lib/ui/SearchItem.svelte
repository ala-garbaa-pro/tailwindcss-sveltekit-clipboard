<script lang="ts">
	import { addRecent, userCacheStore } from '$lib/stores/userCacheStore';
	import type { Clipboard } from '$lib/types/clipboard.type';
	import { formatTimeAgo } from '$lib/utils/date/formatTimeAgo';

	export let clipboard: Clipboard;
</script>

<button
	on:click={(event) => {
		event.preventDefault();

		const newData = addRecent(clipboard);

		userCacheStore.set(newData);

		window.location.href = `/${clipboard.id}`;
	}}
	class="flex justify-between w-full px-4 py-2 rounded-md bg-midnight-spider hover:bg-midnight-pitch"
>
	<div class="flex flex-row justify-between sm:flex-col">
		<h1 class="font-semibold">{clipboard.title}</h1>
		<h3 class="text-[10px]">#{clipboard.id}</h3>
	</div>

	<div class="flex flex-row justify-between sm:flex-col">
		<h3 class="text-sm">{clipboard.keywords}</h3>
		<h3 class="text-xs">Updated {formatTimeAgo(clipboard.updated)}</h3>
	</div>
</button>
