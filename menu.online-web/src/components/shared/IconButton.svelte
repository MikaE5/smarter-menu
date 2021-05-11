<script lang="ts">
  import { Icon } from 'sveltestrap';

  export let label: string;
  export let icon: string;
  export let click: (e) => void;
  export let iconPosition: 'left' | 'right' = 'left';
</script>

<p class="label border border-secondary rounded pr-1 pl-1" on:click={click}>
  {#if iconPosition === 'left'}<Icon name={icon} /> {label}{:else}{label}
    <Icon name={icon} />{/if}
</p>

<style>
  .label {
    font-size: small;
  }
</style>
