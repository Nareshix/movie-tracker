<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
  	import { goto } from "$app/navigation";
	// import { sendVerificationEmail } from "$lib/api/sendVerificationEmail";
	// import { toast } from "svelte-sonner";
	import { Eye, EyeOff } from "@lucide/svelte";
	

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);

	// Email validation regex
	const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	// Password strength validation
	const PASSWORD_REQUIREMENTS = [
		{ regex: /.{8,}/, text: 'At least 8 characters' },
		{ regex: /[0-9]/, text: 'At least 1 number' },
		{ regex: /[a-z]/, text: 'At least 1 lowercase letter' },
		{ regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
		{ regex: /[!-\/:-@[-`{-~]/, text: 'At least 1 special character' },
	];

	const STRENGTH_CONFIG = {
		colors: {
			0: 'bg-gray-200',
			1: 'bg-red-500',
			2: 'bg-orange-500',
			3: 'bg-amber-500',
			4: 'bg-amber-600',
			5: 'bg-emerald-500',
		} as Record<number, string>,
		texts: {
			0: 'Enter a password',
			1: 'Weak password',
			2: 'Medium password!',
			3: 'Strong password!!',
			4: 'Very Strong password!!!',
		} as Record<number, string>,
	};


	// Derived state for email validation
	let emailIsValid = $derived(EMAIL_REGEX.test(email));
	let showEmailError = $derived(email.length > 0 && !emailIsValid);

	// Derived state for password strength
	let passwordStrength = $derived.by(() => {
		const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
			met: req.regex.test(password),
			text: req.text,
		}));

		const score = requirements.filter((req) => req.met).length;

		return {
			score,
			requirements,
		};
	});

	
</script>
<div class="grid place-items-center h-svh">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input 
						id="email" 
						type="email" 
						placeholder="hi@example.com" 
						bind:value={email}
						class={showEmailError ? 'border-red-500' : ''}
						required 
					/>
					{#if showEmailError}
						<p class="text-red-500 text-xs mt-1">Please enter a valid email address</p>
					{/if}
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="##" class="ml-auto inline-block text-sm underline">
							Forgot your password?
						</a>
					</div>
					
					<!-- Enhanced Password Input -->
					<div class="relative">
						<Input 
							id="password" 
							type={showPassword ? 'text' : 'password'} 
							placeholder="••••••••••" 
							bind:value={password}
							required 
							class='pr-10'
						/>
						<button
							type="button"
							onclick={() => showPassword = !showPassword}
							class="absolute inset-y-0 right-0 flex items-center justify-center w-9 text-gray-500"
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{#if showPassword}
							<EyeOff />
							{:else}
							<Eye />
							{/if}
						</button>
					</div>

					<!-- Password Strength Indicator -->
					<div class="space-y-2">
						<!-- Strength Bar -->
						<div class="h-1 rounded-full bg-gray-200 overflow-hidden">
							<div 
								class="h-full transition-all duration-500 {STRENGTH_CONFIG.colors[passwordStrength.score]}"
								style="width: {(passwordStrength.score / 5) * 100}%"
							></div>
						</div>

						<!-- Strength Text -->
						<div class="flex justify-between text-sm">
							<span class="text-gray-600">Must contain:</span>
						</div>

						<!-- Requirements List -->
						<ul class="space-y-1" aria-label="Password requirements">
							{#each passwordStrength.requirements as req}
								<li class="flex items-center space-x-2">
									{#if req.met}
										<svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
										</svg>
									{:else}
										<svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
										</svg>
									{/if}
									<span class="text-xs {req.met ? 'text-emerald-600' : 'text-gray-500'}">
										{req.text}
									</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
				
                <Button onClickPromise={() => sendVerificationEmailToBackend(email, password)}
                type="submit"
                class="w-full text-foreground font-bold"
                disabled={passwordStrength.score < 5 || !emailIsValid || email.length === 0}>
                   <span class="font-semibold text-foreground dark:text-black">Login</span>
                </Button>
				<Button variant="outline" class="w-full">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
							fill="currentColor"
						/>
					</svg>
					Login with Google
				</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="##" class="underline"> Sign up </a>
			</div>
		</Card.Content>
	</Card.Root>
</div>