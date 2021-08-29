<script lang="ts">
  import { Link } from 'svelte-navigator';
  export let to: string = '';
  export let label: string;
</script>

{#if to.length !== 0}
  <div class="wrapper">
    <Link class="smarter-menu-link" {to}>{label}</Link>
  </div>
{:else}
  <div class="wrapper">
    <span class="smarter-menu-link with-link-styles">{label}</span>
  </div>
{/if}

<style>
  .wrapper :global(.smarter-menu-link) {
    color: var(--smarter-menu-dark-accent);
    font-weight: 400;
  }

  .with-link-styles {
    padding: 0.5rem 1rem;
  }
</style>
