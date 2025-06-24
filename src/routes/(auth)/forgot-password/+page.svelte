<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { enhance } from '$app/forms';
	import { Eye, EyeOff, LoaderCircle, LoaderCircleIcon } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	import type { PageProps } from './$types';
	let { data, form }: PageProps = $props();

	let loading = $state(false);

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);

	// Email validation regex
	const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// Derived state for email validation
	let emailIsValid = $derived(EMAIL_REGEX.test(email));
	let showEmailError = $derived(email.length > 0 && !emailIsValid);

	$effect(() => {
		if (form?.ErrorMsg) {
			toast.error(form.ErrorMsg);
		}
	});
</script>

<div class="grid h-svh place-items-center">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Reset Password</Card.Title>
			<Card.Description>Enter your email to receive a reset password link</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="error"></p>
			<form
				method="POST"
				action="?/reset"
				class="grid gap-4 pb-3"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
					};
				}}
			>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						placeholder="hi@example.com"
						bind:value={email}
						class={showEmailError ? 'border-red-500' : ''}
						required
					/>
					{#if showEmailError}
						<p class="mt-1 text-xs text-red-500">Please enter a valid email address</p>
					{/if}
				</div>

				<Button type="submit" class="bg-primary" disabled={!emailIsValid || email.length === 0}>
					{#if loading}
						<span class="text-primary-foreground font-medium">Login</span>
						<LoaderCircle class="animate-spin" />
					{:else}
						<span class="text-primary-foreground font-medium">Login</span>
					{/if}
				</Button>
			</form>

			<div class="text-center text-sm">
				Remembered your password?
				<a href="/login" class="underline"> Log in </a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
