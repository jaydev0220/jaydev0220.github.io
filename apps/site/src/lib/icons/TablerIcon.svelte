<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  type Props = SVGAttributes<SVGSVGElement> & {
    pathData: string;
    filled?: boolean;
  };

  let {
    pathData,
    filled = false,
    width = '1em',
    height = '1em',
    ...attributes
  }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  {width}
  {height}
  fill={filled ? 'currentColor' : 'none'}
  stroke={filled ? 'none' : 'currentColor'}
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width={filled ? undefined : 2}
  focusable="false"
  {...attributes}
>
  <path d={pathData} />
</svg>
