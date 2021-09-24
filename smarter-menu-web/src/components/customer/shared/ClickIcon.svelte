<script lang="ts">
  import { Icon } from 'sveltestrap';

  export let icon: string;
  export let click: (e) => void;
  export let size: 1 | 2 | 3 | 4 | 5 | 6 = 4;
  export let smarterMenuIcon = false;
  export let highlight = false;
</script>

<div class={`h${size} reset-margin`} on:click={click}>
  <Icon
    class={smarterMenuIcon ? 'smarter-menu-icon' : highlight ? 'highlight' : ''}
    name={icon}
  />
</div>

<style>
  .reset-margin {
    margin-bottom: 0 !important;
  }
  .reset-margin :global(.smarter-menu-icon) {
    color: var(--smarter-menu-dark-accent) !important;
  }
  .reset-margin :global(.highlight) {
    color: var(--smarter-menu-light-accent) !important;
  }
</style>
