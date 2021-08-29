<script lang="ts">
  export let label: string;
  export let active: boolean = true;
</script>

<span class="badge" class:active class:inactive={!active}>{label}<slot /></span>

<style>
  .active {
    background-color: var(--smarter-menu-dark-accent);
    color: white;
  }

  .inactive {
    border: 2px solid var(--smarter-menu-dark-accent);
  }
</style>
