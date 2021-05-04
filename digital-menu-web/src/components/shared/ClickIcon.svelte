<script lang="ts">
  import { Icon } from 'sveltestrap';

  export let icon: string;
  export let click: (e) => void;
</script>

<div on:click={click}>
  <Icon name={icon} />
</div>
