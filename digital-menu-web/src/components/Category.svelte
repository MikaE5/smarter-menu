<script lang="ts">
  import { Icon, Card, CardHeader, CardTitle } from 'sveltestrap';
  import type { Category } from './model/category.interface';
  import { getRouteToCategory } from './util/category.util';
  import { useNavigate } from 'svelte-navigator';
  export let category: Category;
  const navigate = useNavigate();
  const route = getRouteToCategory(category.id);
</script>

<Card color="light" on:click={() => navigate(route)}>
  <CardHeader>
    <div class="d-flex justify-content-between">
      <CardTitle>{category.name}</CardTitle>
      <Icon name="arrow-right" />
    </div>
  </CardHeader>
</Card>
