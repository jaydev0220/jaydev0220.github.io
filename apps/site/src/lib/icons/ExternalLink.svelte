<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import TablerIcon from './TablerIcon.svelte';

  let { ...attributes }: SVGAttributes<SVGSVGElement> = $props();
</script>

<TablerIcon pathData="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5" {...attributes} />
