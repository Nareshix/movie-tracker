<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let count = $state(5);

	const timer = setInterval(() => {
		count--;
		if (count <= 0) {
			clearInterval(timer); 
			goto('/'); 
		}
	}, 1000);
</script>

{#if data.success}
	<h1>
		Password reset successful. <br /> You will be redirected to the
		<a href="/home" class="underline">home page</a>
		in {count}
	</h1>
{:else}
	<h1>{data.errorMsg}</h1>
{/if}
