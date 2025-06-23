<script lang="ts">
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

</script>

{#if data.error}
	{data.error}
{:else}
	<div>
		<p>
			Hi you should automatically be redirected to the home page. If you did not redirec
			automtaically <u><a href="/">Click here</a></u>
		</p>
	</div>
{/if}
