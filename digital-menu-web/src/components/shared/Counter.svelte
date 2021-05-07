<script lang="ts">
  import ClickIcon from './ClickIcon.svelte';

  export let counter: number;
  export let decrease: (e) => void;
  export let increase: (e) => void;
</script>

<div class="d-flex">
  {#if counter > 0}
    <ClickIcon icon="dash-circle" click={decrease} />
    <span class="mr-1 ml-1">{counter}</span>
  {/if}
  <ClickIcon icon="plus-circle" click={increase} />
</div>
