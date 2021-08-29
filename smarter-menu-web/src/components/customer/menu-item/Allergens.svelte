<script lang="ts">
  import { Badge } from 'sveltestrap';
  import { getAllergensByIds } from '../../../data/data';
  import type { Allergen } from '../../../data/model/allergen.interface';
  import SmarterMenuBadge from '../shared/SmarterMenuBadge.svelte';

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
        <SmarterMenuBadge label={allergen.name} />
      </div>
    {/each}
  {/await}
</div>
