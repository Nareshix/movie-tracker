<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { House, Layers, TrendingUpDown, User } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/state';

	const defaultTransition = {
		in: { fn: fly, props: { duration: 250, delay: 150, y: 10 } },
		out: { fn: fade, props: { duration: 150 } }
	};

	// page.data.
	let pageTransition = $derived(page.data.transition || defaultTransition);
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="flex h-dvh flex-col">
	<div class="flex flex-1 overflow-hidden">
		<Sidebar.Provider>
			<AppSidebar class="hidden shrink-0 md:block" />

			<!-- This div is now just a container for the animated page content -->
			<div class="flex-1 min-w-0 ">
				{#key data.pathname}
					<!-- REMOVE overflow-y-auto from here. Let child layouts handle scrolling. -->
					<main
						class="h-full flex flex-col"
						in:pageTransition.in.fn={pageTransition.in.props}
						out:pageTransition.out.fn={pageTransition.out.props}
					>
						{@render children?.()}
					</main>
				{/key}
			</div>
		</Sidebar.Provider>
	</div>

	<footer
		class="bg-sidebar border-sidebar-border flex shrink-0 justify-around border-t pt-1 pb-1 md:hidden"
	>
		<a href="/home"> <House /> </a>
		<a href="/lists"> <Layers /> </a>
		<a href="/discover"> <TrendingUpDown /> </a>
		<a href="/profile"> <User /> </a>
	</footer>
</div>
