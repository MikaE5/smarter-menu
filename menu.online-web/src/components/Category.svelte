<script lang="ts">
  import { Icon, Card, CardHeader, CardTitle } from 'sveltestrap';
  import { getRouteToCategory } from './util/category.util';
  import { useNavigate } from 'svelte-navigator';
  import type { Category } from '../data/model/category.interface';
  export let category: Category;

  const navigate = useNavigate();
  const route = getRouteToCategory(category.id);
</script>

<div>
  <Card color="light" on:click={() => navigate(route)}>
    <CardHeader>
      <div class="d-flex justify-content-between">
        <CardTitle>{category.name}</CardTitle>
        <Icon name="arrow-right" />
      </div>
    </CardHeader>
  </Card>
</div>
