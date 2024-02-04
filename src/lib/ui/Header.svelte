<script lang="ts">
	import { navbarState, searchState } from '$lib/stores/navbar';
	import { fly, slide } from 'svelte/transition';
	import AppName from './AppName.svelte';
	import Icon from './Icon.svelte';
</script>

<div class="flex items-center justify-between w-full px-3 pt-4 pr-2 overflow-hidden h-14">
	<div class="flex">
		{#if $navbarState !== 'normal-opened'}
			<div class="flex" out:slide={{ axis: 'x', duration: 500 }}>
				<button class="flex mr-2" on:click={() => navbarState.set('normal-opened')}>
					<Icon descriptors={['M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z']} />
				</button>
				<AppName />
			</div>
		{/if}
	</div>
	<div
		class={`relative z-0 flex items-center justify-center flex-1 px-2 animate-margin ${
			$navbarState !== 'normal-opened' ? 'mr-[15rem]' : ''
		}`}
	>
		<div class="w-full sm:max-w-xs">
			<button
				on:click={() => searchState.set('opened')}
				type="button"
				class="hidden w-full lg:flex items-center text-sm leading-6 text-silver-100 rounded-md ring-0 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-midnight-spider dark:highlight-white/5 dark:hover:bg-midnight-pitch"
				><svg width="24" height="24" fill="none" aria-hidden="true" class="flex-none mr-3"
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
				>Quick search...<span class="flex-none pl-3 ml-auto text-xs font-semibold">Ctrl K</span
				></button
			>
		</div>
	</div>
</div>
