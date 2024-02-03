<script lang="ts">
	import { formatDateTime } from '$lib/utils/date/formatDateTime';
	import { formatTimeAgo } from '$lib/utils/date/formatTimeAgo';

	export let id: string;
	export let title: string;
	export let keywords: string;
	export let created: string;
	export let updated: string;
</script>

<div class="px-4 pt-5 border rounded-md border-gray-50/10 hover:border-gray-50/15 sm:px-6">
	<div class="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
		<div class="mt-4 ml-4">
			<h3 class="text-base font-semibold leading-6 text-gray-200">{title}</h3>
			<p class="mt-1 text-sm text-gray-500">{keywords}</p>
		</div>
		<div class="flex-shrink-0 mt-4 ml-4">
			<a
				href={`/${id}`}
				class="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
				>Open</a
			>
		</div>
	</div>
	<div class="flex justify-between pb-5">
		<span title={formatDateTime(created)} class="flex items-center"
			><svg
				class="mr-1"
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
					d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48"
				></path><path
					d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90 218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0z"
				></path></svg
			>
			{formatTimeAgo(created)}</span
		>
		{#if updated !== created}
			<span title={formatDateTime(created)} class="flex items-center">
				<svg
					stroke="currentColor"
                    class="mr-1"
					fill="currentColor"
					stroke-width="0"
					viewBox="0 0 512 512"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill="none"
						stroke-linecap="round"
						stroke-miterlimit="10"
						stroke-width="32"
						d="m400 148-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128"
					></path><path
						d="M464 97.42V208a16 16 0 0 1-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z"
					></path></svg
				>
				{formatTimeAgo(updated)}</span
			>
		{/if}
	</div>
</div>
