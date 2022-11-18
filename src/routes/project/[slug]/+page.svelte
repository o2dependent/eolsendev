<script lang="ts">
	import Card from '$lib/Card.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:component this={data.page} />
