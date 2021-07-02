<script lang="ts">
  import ClickIcon from './ClickIcon.svelte';

  export let counter: number;
  export let decrease: (e) => void;
  export let increase: (e) => void;
  export let iconSize : 1 | 2 | 3 | 4 | 5 | 6 = 3;
</script>

<div class="d-flex align-items-center">
  {#if counter > 0}
    <ClickIcon icon="dash-circle" click={decrease} size={iconSize} />
    <span class="mr-2 ml-2">{counter}</span>
  {/if}
  <ClickIcon icon="plus-circle" click={increase} size={iconSize}/>
</div>
