<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<Card class="w-full max-w-md">
		<CardHeader class="text-center">
			<CardTitle>Are you sure you want to log out?</CardTitle>
		</CardHeader>

		<CardFooter class="flex justify-center gap-3">
			<Button variant="outline" onclick={() => window.history.back()}>No, go back 😖</Button>
			<form action="?/logout" method="POST" use:enhance >
				<Button variant="destructive" type="submit">Yes 🫡</Button>
			</form>
		</CardFooter>
	</Card>
</div>
