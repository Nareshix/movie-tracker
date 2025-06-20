<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { page } from '$app/state';
	
	let {
		items,
	}: {
		items: {
			title: string;
			url: string;
			icon?: any;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
			}[];
		}[];
	} = $props();
	
	// Simple function to check if current item is active
	function isActive(itemUrl: string): boolean {
		// Exact match or starts with the URL (for subdirectories)
		return page.url.pathname === itemUrl || 
			   (itemUrl !== '/' && page.url.pathname.startsWith(itemUrl + '/'));
	}
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#each items as item (item.title)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton 
					tooltipContent={item.title} 
					isActive={isActive(item.url)}
				>
					{#snippet child({ props })}
						<a href={item.url} {...props}>
							{#if item.icon}
								<item.icon />
							{/if}
							<span>{item.title}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>