<script lang="ts">
  import { Badge } from 'sveltestrap';
  import { getAllergensByIds } from '../../data/data.util';
  import type { Allergen } from '../../data/model/allergen.interface';

  export let allergenIds: string[];

  let allergens$: Promise<Allergen[]>;

  $: {
    allergens$ = getAllergensByIds(allergenIds);
  }
</script>

<div class="d-flex flex-wrap badge-parent">
  {#await allergens$ then allergens}
    {#each allergens as allergen}
      <div class="mr-1 mb-1">
        <Badge color="secondary">{allergen.name}</Badge>
      </div>
    {/each}
  {/await}
</div>
