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
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Login to continue</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="error"></p>
			<form
				method="POST"
				action="?/login"
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
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
					</div>

					<!-- Enhanced Password Input -->
					<div class="relative">
						<Input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••••"
							bind:value={password}
							required
							class="pr-10"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="text-primary absolute inset-y-0 right-0 flex w-9 items-center justify-center"
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{#if showPassword}
								<EyeOff class="w-4" />
							{:else}
								<Eye class="w-4" />
							{/if}
						</button>
					</div>


				</div>

				<Button
					type="submit"
					class="bg-primary"
					disabled={!emailIsValid || email.length === 0}
				>
					{#if loading}
					<span class="text-primary-foreground font-medium">Login</span>
					<LoaderCircle class="animate-spin"/>
					{:else}
					<span class="text-primary-foreground font-medium">Login</span>

					{/if}
				</Button>
			</form>
			<Button variant="outline" class="w-full">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
						fill="currentColor"
					/>
				</svg>
				<p class="font-semibold">Login with Google</p>
			</Button>

			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="/signup" class="underline"> Sign up </a>
			</div>
		</Card.Content>
	</Card.Root>
</div>