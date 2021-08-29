<script lang="ts">
  import { getClassificationsByIds } from '../../../data/data';
  import type { Classification } from '../../../data/model/classification.interface';
  import SmarterMenuBadge from '../shared/SmarterMenuBadge.svelte';

  export let classificationIds: string[];

  let classifications$: Promise<Classification[]>;

  $: {
    classifications$ = getClassificationsByIds(classificationIds);
  }
</script>

<div class="d-flex">
  {#await classifications$ then classifications}
    {#each classifications as classification, i}
      <div class={i === classifications.length - 1 ? '' : 'mr-1'}>
        <SmarterMenuBadge label={classification.name} />
      </div>
    {/each}
  {/await}
</div>
