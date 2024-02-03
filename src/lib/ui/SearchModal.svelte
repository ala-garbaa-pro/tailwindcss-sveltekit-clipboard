<script lang="ts">
	import { searchState } from '$lib/stores/navbar';

	let searchBy: 'title' | 'keywords' | 'content' = 'title';
</script>

<div
	class="cursor-default w-[38vw] absolute z-50 transform -translate-x-1/2 -translate-y-1/2 rounded-lg left-1/2 top-1/2 bg-midnight-metal h-96"
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
			type="text"
			placeholder="Search documentation"
			class="w-full bg-transparent outline-none"
		/>
		<button class="px-1 rounded-md bg-midnight-pitch">ESC</button>
	</div>
	<div class="flex p-4 border-b-[.25px] border-b-midnight-pitch">
		<div class="flex space-x-5">
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
</div>

<div
	class="absolute top-0 left-0 z-40 flex w-screen h-screen bg-midnight-crow/50 backdrop-blur-sm"
	on:click={() => searchState.set('closed')}
></div>
