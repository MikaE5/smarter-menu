<script lang="ts">
  import { Link } from 'svelte-navigator';

  export let to: string;
  export let label: string;
</script>

<Link {to}>
  <button class="btn smarter-menu-dark-accent-bg">
    {label}
  </button>
</Link>

