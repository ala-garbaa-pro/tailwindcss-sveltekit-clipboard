<script lang="ts">
	import { isNavbarOpen, searchState } from '$lib/stores/navbar';
	import { slide } from 'svelte/transition';
	import AppName from './AppName.svelte';
	import Icon from './Icon.svelte';

	// const isMobileOrNavClosed = $navbarState !== 'normal-opened' || $navbarState === 'mobile-closed';
</script>

<div class="flex items-center justify-between w-full px-1 pt-4 pr-2 overflow-hidden sm:px-3 h-14">
	<div class="flex">
		{#if isNavbarOpen}
			<div class="flex" out:slide={{ axis: 'x', duration: 500 }}>
				<button class="flex mr-2" on:click={() => isNavbarOpen.set(!$isNavbarOpen)}>
					<Icon descriptors={['M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z']} />
				</button>
				<AppName />
			</div>
		{/if}
	</div>
	<div
		class={`relative z-0 flex items-center justify-center flex-1 px-2 animate-margin ${
			!isNavbarOpen ? 'mr-[15rem]' : ''
		}`}
	>
		<div class="w-full sm:max-w-xs">
			<button
				on:click={() => searchState.set('opened')}
				type="button"
				class="w-full sm:flex items-center text-sm leading-6 text-silver-100 rounded-md ring-0 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 sm:dark:bg-midnight-spider sm:dark:highlight-white/5 sm:dark:hover:bg-midnight-pitch"
			>
				<svg width="24" height="24" fill="none" aria-hidden="true" class="flex-none ml-auto sm:mr-3"
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
					></circle>
				</svg>
				<div class="items-center hidden w-full sm:flex">
					Quick search...
					<span class="flex-none pl-3 ml-auto text-xs font-semibold">Ctrl K</span>
				</div>
			</button>
		</div>
	</div>
</div>
