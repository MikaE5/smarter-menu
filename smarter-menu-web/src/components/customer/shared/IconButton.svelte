<script lang="ts">
  import { Icon } from 'sveltestrap';

  export let label: string;
  export let icon: string;
  export let click: (e) => void;
  export let iconPosition: 'left' | 'right' = 'left';
  export let size: 1 | 2 | 3 | 4 | 5 | 6 = 1;
</script>

<div
  class="h${size} border border-secondary rounded pr-1 pl-1"
  on:click={click}
>
  {#if iconPosition === 'left'}<Icon name={icon} /> {label}{:else}{label}
    <Icon name={icon} />{/if}
</div>
