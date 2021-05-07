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

<div class="d-flex">
  {#each allergens as allergen, i}
    <Badge color="secondary">{allergen.name}</Badge>
  {/each}
</div>
