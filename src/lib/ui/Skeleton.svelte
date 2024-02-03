{#each Array(8) as _}
	<div class="px-4 pt-5 mt-4 border rounded-md border-gray-50/10 hover:border-gray-50/15 sm:px-6">
		<div class="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
			<div class="mt-4 ml-4">
				<h3 class="text-base font-semibold leading-6 text-gray-200">
					<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-96 mb-2.5"></div>
				</h3>
				<div class="mt-1 text-sm text-gray-500">
					<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-60 mb-2.5"></div>
				</div>
			</div>
			<div class="flex-shrink-0 mt-4 ml-4">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
			</div>
		</div>
		<div class="flex justify-between pb-5">
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
		</div>
	</div>
{/each}
