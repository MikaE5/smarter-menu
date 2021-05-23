<script lang="ts">
  import { onMount } from 'svelte';

  import { useNavigate } from 'svelte-navigator';
  import { getBaseCustomerPath } from '../util/routes.util';

  const navigate = useNavigate();

  onMount(() => {
    navigate(getBaseCustomerPath('smarter-menu'));
  });
</script>

<div>.</div>
