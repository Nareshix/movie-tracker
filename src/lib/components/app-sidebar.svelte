<script lang="ts" module>
	import { Popcorn, TrendingUpDown, Layers, Home } from '@lucide/svelte';
	import AnimatedHamburger from './animated-hamburger.svelte';
	
	// This is sample data - removed isActive since we'll calculate it dynamically
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		navMain: [
			{
				title: 'Home',
				url: '/home',
				icon: Home
			},
			{
				title: 'Discover', 
				url: '/discover',
				icon: TrendingUpDown
			},
			{
				title: 'Lists',
				url: '/lists',
				icon: Layers
			},
		]
	};
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	
	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root variant="floating" {collapsible} {...restProps}>
	<Sidebar.Header class="pb-0">
		<AnimatedHamburger />
	</Sidebar.Header>
	<Sidebar.Separator />
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>