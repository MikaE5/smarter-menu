<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { Button } from 'sveltestrap';

  export let to: string;
  export let label: string;
</script>

<Link {to}>
  <Button color="secondary">
    {label}
  </Button>
</Link>
