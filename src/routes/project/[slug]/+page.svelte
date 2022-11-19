<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	console.log({ data });
</script>

<div
	class="text-green-500 font-mono max-w-prose mx-auto border-b-4 border-dashed border-green-500 flex flex-col gap-2 pb-4 mb-10"
>
	<h1 class="text-4xl">{data.metadata.title}</h1>
	{#each data.metadata.tags as tag}
		<div class="badge badge-outline border border-dashed border-green-500">{tag}</div>
	{/each}
	<p class="">{data.metadata.summary}</p>
</div>
<article
	class="font-mono prose prose-a:text-green-500 prose-a:underline prose-a:decoration-dashed prose-a:underline-offset-4 hover:prose-a:opacity-100 prose-a:transition-opacity prose-p:text-green-500 prose-headings:text-green-500 mx-auto lowercase text-green-500"
>
	<svelte:component this={data.page} />
</article>
