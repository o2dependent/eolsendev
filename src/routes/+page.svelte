<script lang="ts">
	import Card from '$lib/Card.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="text-green-500 flex flex-col gap-4">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="border-2 max-w-prose border-dashed border-green-500 flex flex-col gap-2">
			<h2 class="px-4 pt-4 pb-2 text-2xl border-b-2 border-green-500 border-dashed">About me</h2>
			<p class="px-4 pb-4 pt-2">
				I'm a full stack typescript cross platform developer. I have a love for writing clean code
				and learning how to clean up my "clean code".
			</p>
		</div>
		<div
			class="border-2 max-w-prose border-dashed border-green-500 text-green-500 flex flex-col gap-2"
		>
			<h2 class="px-4 pt-4 pb-2 text-2xl border-b-2 border-green-500 border-dashed">Skills</h2>
			<div class="px-4 pb-4 pt-2 flex gap-4">
				<ul class="list-disc list-inside">
					<li>Typescript</li>
					<li>React</li>
					<li>Nest.js</li>
					<li>Svelte</li>
					<li>Pocketbase</li>
					<li>GraphQL</li>
					<li>REST</li>
				</ul>
				<ul class="list-disc list-inside">
					<li>Postgres</li>
					<li>Typeorm</li>
					<li>CI/CD</li>
					<li>Capacitor</li>
					<li>AWS</li>
					<li>Vercel</li>
					<li>Netlify</li>
				</ul>
			</div>
		</div>
	</div>
	<h2 class="text-2xl border-b-4 border-green-500 border-dashed">Projects</h2>
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
		{#each data.projects as { summary, title, tags, date, slug }}
			<Card
				{title}
				{summary}
				{tags}
				{date}
				href={`/project/${slug}`}
				src="https://images.unsplash.com/photo-1668613964763-90d0bd6559f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
			/>
		{/each}
	</div>
</div>
