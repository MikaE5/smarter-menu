<script lang="ts">
  import { Icon } from 'sveltestrap';

  export let icon: string;
  export let click: (e) => void;
  export let size: 1 | 2 | 3 | 4 | 5 | 6 = 4;
</script>

<div class={`h${size} reset-margin`} on:click={click}>
  <Icon name={icon} />
</div>

<style>
  .reset-margin {
    margin-bottom: 0 !important;
  }
</style>
