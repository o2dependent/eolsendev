<script lang="ts">
	export let src: string;
	export let title: string;
	export let date: Date | undefined = undefined;
	export let summary: string;
	export let tags: string[] = [];
	export let href: string;
</script>

<a
	{href}
	data-sveltekit-prefetch
	class="card btn btn-ghost items-stretch justify-center h-fit duration-150 group max-w-96 lowercase rounded-none text-green-500 relative"
>
	<div class="card-border" />
	<!-- <div
		class="border-4 border-dashed border-green-500 border-opacity-25 absolute top-0 left-0 w-full h-full"
	/> -->
	<figure class="mt-4 mx-4">
		<img {src} alt={title} />
	</figure>
	<div class="card-body">
		<h2 class="card-title flex-wrap leading-none">
			{#each title.split(' ') as word, wordIdx}
				<span>
					{#each word.split('') as letter, letterIdx}
						<span
							style="--delay: {wordIdx > 0
								? title.split(' ')[wordIdx - 1].length * 15 + letterIdx * 15
								: letterIdx * 15}ms; transition-delay: var(--delay); transition-duration: 0ms;"
							class="group-hover:opacity-100 opacity-75"
						>
							{letter}
						</span>
					{/each}
				</span>
			{/each}
			{#if date && (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24) < 7}
				<div
					class="badge border border-dashed border-green-500 text-green-500 animate-pulse group-hover:opacity-100"
				>
					NEW
				</div>
			{/if}
		</h2>
		<p
			class="text-left text-green-500 text-opacity-75 transition-colors group-hover:text-opacity-100"
		>
			{summary}
		</p>
		<div class="card-actions justify-end">
			{#each tags as tag}
				<div class="badge badge-outline border border-dashed border-green-500">{tag}</div>
			{/each}
		</div>
	</div>
</a>

<style lang="postcss">
	.card-border {
		@apply border-4 border-dashed border-green-500 border-opacity-0 absolute top-0 left-0  group-hover:border-opacity-100 w-full h-full transition-all duration-500;
	}

	.group:hover .card-border {
		animation: clip-spread 500ms ease-in-out forwards;
		clip-path: circle(141.4% at 0 0);
	}

	@keyframes clip-spread {
		0% {
			clip-path: circle(0% at 0 0);
		}
		100% {
			clip-path: circle(141.4% at 0 0);
		}
	}
</style>
