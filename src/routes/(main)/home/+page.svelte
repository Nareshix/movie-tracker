<script lang="ts">
	import { AspectRatio } from "$lib/components/ui/aspect-ratio";
	import { Progress } from "$lib/components/ui/progress";
	import { onMount } from "svelte";
  
	let value = $state(-1);
	//  To see the animation
	onMount(() => {
	  value = 66;
	});
  </script>
  
  <div class="px-1 pt-8">
	<h1 class="text-foreground text-3xl font-bold">Hi, Naresh</h1>
	<p class="text-muted-foreground text-base">
	  You've logged 3 movies and 1 anime this week.
	</p>
  </div>
  
  <div class="px-2">
	<div class="relative mt-4 overflow-hidden rounded-xl">
	  <AspectRatio ratio={16 / 9}>
		<img
		  src="https://image.tmdb.org/t/p/original/n6vVs6z8obNbExdD3QHTr4Utu1Z.jpg"
		  alt="The boys."
		  class="aspect-video w-full object-cover brightness-50"
		  loading="lazy"
		/>
	  </AspectRatio>
  
	  <div class="absolute inset-0 flex flex-col justify-end p-4">
		<div>
		  <h3 class="text-xl font-bold text-neutral-200">The Boys</h3>
		  <p class="text-sm text-neutral-300">Wacth Next • S2E6</p>
		</div>
		<div class="flex items-center gap-2">
		  <Progress {value} class="flex-grow" />
		  <!-- See note below -->
		  <p class="text-sm text-neutral-400">5/8</p>
		</div>
	  </div>
	</div>
	<div class="mt-6">
	  <h1 class="border-b text-xl font-bold">Upcoming From your lists</h1>
	  <div class="mt-3 flex flex-row gap-4 overflow-x-auto">
		{#each { length: 8 }, i}
		  <div class="w-50 shrink-0 md:w-72">
			<AspectRatio ratio={16 / 9}>
			  <img
				src="https://image.tmdb.org/t/p/original/1jw95TiRAvITZk22DJVMbhFeLSG.jpg"
				alt="Movie Poster"
				class="h-full w-full rounded-xl object-cover"
				loading="lazy"
			  />
			</AspectRatio>
			<p
			  class="text-muted-foreground pt-1.5 text-center text-sm md:text-base"
			>
			  S2E01 • test testing
			</p>
		  </div>
		{/each}
	  </div>
	</div>
	<div class="mt-6">
	  <h1 class="border-b text-xl font-bold">Recommendations</h1>
	  <div class="mt-3 flex flex-row gap-4 overflow-x-auto">
		{#each { length: 8 }, i}
		  <div class="w-32 shrink-0 md:w-52">
			<AspectRatio ratio={2 / 3}>
			  <img
				src="https://image.tmdb.org/t/p/original/1jw95TiRAvITZk22DJVMbhFeLSG.jpg"
				alt="Movie Poster"
				class="h-full w-full rounded-xl object-cover"
				loading="lazy"
			  />
			</AspectRatio>
			<p
			  class="text-muted-foreground pt-1.5 text-center text-sm md:text-base"
			>
			  Mr. Cold
			</p>
		  </div>
		{/each}
	  </div>
	</div>
	<div class="mt-6">
	  <h1 class="border-b text-xl font-bold">Watch List</h1>
	  <div class="mt-3 flex flex-row gap-4 overflow-x-auto">
		{#each { length: 8 }, i}
		  <div class="w-32 shrink-0 md:w-52">
			<AspectRatio ratio={2 / 3}>
			  <img
				src="https://image.tmdb.org/t/p/original/1jw95TiRAvITZk22DJVMbhFeLSG.jpg"
				alt="Movie Poster"
				class="h-full w-full rounded-xl object-cover"
				loading="lazy"
			  />
			</AspectRatio>
			<p
			  class="text-muted-foreground pt-1.5 text-center text-sm md:text-base"
			>
			  Mr. Cold
			</p>
		  </div>
		{/each}
	  </div>
	</div>
	<div class="mt-6">
	  <h1 class="border-b text-xl font-bold">Watch History</h1>
	  <div class="mt-3 flex flex-row gap-4 overflow-x-auto">
		{#each { length: 8 }, i}
		  <div class="w-50 shrink-0 md:w-62">
			<AspectRatio ratio={16 / 9}>
			  <img
				src="https://image.tmdb.org/t/p/original/1jw95TiRAvITZk22DJVMbhFeLSG.jpg"
				alt="Movie Poster"
				class="h-full w-full rounded-xl object-cover"
				loading="lazy"
			  />
			</AspectRatio>
			<p
			  class="text-muted-foreground pt-1.5 text-center text-sm md:text-base"
			>
			  S1E09 • yes
			</p>
		  </div>
		{/each}
	  </div>
	</div>
  </div>

  