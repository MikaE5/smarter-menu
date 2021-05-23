<script lang="ts">
  import { Badge } from 'sveltestrap';
  import { getClassificationsByIds } from '../../data/data.util';
  import type { Classification } from '../../data/model/classification.interface';

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
        <Badge color="secondary">{classification.name}</Badge>
      </div>
    {/each}
  {/await}
</div>
