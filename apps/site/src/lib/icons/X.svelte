<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import TablerIcon from './TablerIcon.svelte';

  let { ...attributes }: SVGAttributes<SVGSVGElement> = $props();
</script>

<TablerIcon pathData="M18 6L6 18M6 6l12 12" {...attributes} />
