<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import TablerIcon from './TablerIcon.svelte';

  let { ...attributes }: SVGAttributes<SVGSVGElement> = $props();
</script>

<TablerIcon pathData="M4 6h16M4 12h16M4 18h16" {...attributes} />
