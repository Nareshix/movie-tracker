<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { enhance } from '$app/forms';
	import { Eye, EyeOff, LoaderCircle, Mail } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	import type { PageProps } from './$types';
	let { data, form }: PageProps = $props();

	let loading = $state(false);

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);

	let emailsent = $state(false);

	// Email validation regex
	const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	// Password strength validation
	const PASSWORD_REQUIREMENTS = [
		{ regex: /.{8,}/, text: 'At least 8 characters' },
		{ regex: /[0-9]/, text: 'At least 1 number' },
		{ regex: /[a-z]/, text: 'At least 1 lowercase letter' },
		{ regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
		{ regex: /[!-\/:-@[-`{-~]/, text: 'At least 1 special character' }
	];

	const STRENGTH_CONFIG = {
		colors: {
			0: 'bg-gray-200',
			1: 'bg-red-500',
			2: 'bg-orange-500',
			3: 'bg-amber-500',
			4: 'bg-amber-600',
			5: 'bg-emerald-500'
		} as Record<number, string>,
		texts: {
			0: 'Enter a password',
			1: 'Weak password',
			2: 'Medium password!',
			3: 'Strong password!!',
			4: 'Very Strong password!!!'
		} as Record<number, string>
	};

	// Derived state for email validation
	let emailIsValid = $derived(EMAIL_REGEX.test(email));
	let showEmailError = $derived(email.length > 0 && !emailIsValid);

	// Derived state for password strength
	let passwordStrength = $derived.by(() => {
		const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
			met: req.regex.test(password),
			text: req.text
		}));

		const score = requirements.filter((req) => req.met).length;

		return {
			score,
			requirements
		};
	});
	$effect(() => {
		if (form?.ErrorMsg) {
			toast.error(form.ErrorMsg);
		}
	});
</script>

{#if emailsent}
	<div class="grid h-svh place-items-center">
		<Card.Root class="w-full max-w-sm text-center">
			<Card.Header>
				<div class="grid place-items-center">
					<Mail class="mb-4" />

					<Card.Title class="mb-1">An email has been sent to you</Card.Title>
					<Card.Description
						>Please check your Spam/Junk if u did not recieve it in your primary inbox!</Card.Description
					>
				</div>
			</Card.Header>
			<Card.Footer>
				<div class="grid place-items-center">
					If you did not recieve any email within 5 minutes, please retry the process again.
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
{:else}
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
							emailsent = true;
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
						<Label for="password">New Password</Label>

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

						<!-- Password Strength Indicator -->
						<div class="space-y-2">
							<!-- Strength Bar -->
							<div class="bg-secondary h-1 overflow-hidden rounded-full">
								<div
									class="h-full transition-all duration-500 {STRENGTH_CONFIG.colors[
										passwordStrength.score
									]}"
									style="width: {(passwordStrength.score / 5) * 100}%"
								></div>
							</div>

							<!-- Strength Text -->
							<div class="flex justify-between text-sm">
								<span class="text-primary">Must contain:</span>
							</div>

							<!-- Requirements List -->
							<ul class="space-y-1" aria-label="Password requirements">
								{#each passwordStrength.requirements as req}
									<li class="flex items-center space-x-2">
										{#if req.met}
											<svg class="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												></path>
											</svg>
										{:else}
											<svg
												class="text-muted-foreground h-4 w-4"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fill-rule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clip-rule="evenodd"
												></path>
											</svg>
										{/if}
										<span class="text-xs {req.met ? 'text-emerald-600' : 'text-muted-foreground'}">
											{req.text}
										</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>

					<Button
						type="submit"
						class="bg-primary"
						disabled={passwordStrength.score < 5 || !emailIsValid || email.length === 0}
					>
						{#if loading}
							<LoaderCircle class="animate-spin" />
						{:else}
							<span class="text-primary-foreground font-medium">Send verification link</span>
						{/if}
					</Button>
				</form>
				<div class="text-center text-sm">
					Remembered your password?
					<a href="/login" class="underline"> Login </a>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
{/if}
