<script lang="ts">
  import { buildItemLabel } from '../../util/menu-item.util';
  export let name: string;
  export let itemNumber: number = undefined;

  export let size: 1 | 2 | 3 | 4 | 5 | 6 = 5;
</script>

<p class={`h${size} mb-0`}>
  {buildItemLabel(name, itemNumber)}
</p>
