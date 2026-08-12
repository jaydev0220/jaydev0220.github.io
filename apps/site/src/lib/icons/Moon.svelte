<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import TablerIcon from './TablerIcon.svelte';

  let { ...attributes }: SVGAttributes<SVGSVGElement> = $props();
</script>

<TablerIcon pathData="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z" {...attributes} />
