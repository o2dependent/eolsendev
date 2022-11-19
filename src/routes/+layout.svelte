<script>
	import '../app.postcss';
</script>

<header class="w-full flex p-2 items-center justify-center text-green-500">
	<nav class="navbar container">
		<div class="navbar-start lowercase">
			<a
				data-sveltekit-prefetch
				href="/"
				class="btn btn-ghost normal-case text-xl font-medium rounded-none">ethan olsen</a
			>
		</div>
	</nav>
</header>
<main class="mx-auto container px-4">
	<slot />
</main>
