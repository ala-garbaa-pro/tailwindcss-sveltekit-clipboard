<!-- FILE: +page.svelte -->

<script lang="ts">
	import { searchState } from '$lib/stores/navbar.js';
	import { onMount } from 'svelte';
	import { initUI } from './lib/initUI.js';

	export let data;
	let { clipboard } = data;

	onMount(() => {
		initUI(searchState);
	});
</script>

{#if clipboard && Object.keys(clipboard).length > 0}
	<div class="px-6 py-[5vw] rounded lg:px-8">
		<div class="mx-auto text-base leading-7 text-gray-100">
			<p class="text-base font-semibold leading-7 text-blue-400">
				<a class="flex items-center mb-10" href="/"
					><svg
						class="mr-2"
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 16 16"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
						></path></svg
					>Return Home</a
				>
			</p>
			<p class="flex items-center mb-2 text-blue-500/40">#{clipboard.id}</p>

			<h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
				{clipboard.title}
			</h1>
			<p class="mt-6 text-xl leading-8 text-gray-50/50">{clipboard.keywords}</p>
			<div class="mt-10">{@html clipboard.content}</div>
		</div>
	</div>
{:else}
	Loading...
{/if}
