<script lang="ts">
  import { Badge } from 'sveltestrap';
  import { getAllergens } from '../data/data.util';
  import type { Allergen } from '../data/model/allergen.interface';

  export let allergenIds: string[];

  let allergens: Allergen[];

  $: {
    allergens = getAllergens(allergenIds);
  }
</script>

<div class="d-flex flex-wrap">
  {#each allergens as allergen}
    <Badge color="secondary" class="mr-1 mb-1">{allergen.name}</Badge>
  {/each}
</div>
