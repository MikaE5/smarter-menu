<script lang="ts">
  export let label: string;
  export let active: boolean = true;

  export let size: 1 | 2 | 3 | 4 | 5 | 6 = 5;
</script>

<div class="h{size}">
  <span class="badge" class:active class:inactive={!active}
    >{label}<slot /></span
  >
</div>

<style>
  .active {
    background-color: var(--smarter-menu-dark-accent);
    color: white;
  }

  .inactive {
    border: 2px solid var(--smarter-menu-dark-accent);
  }
</style>
