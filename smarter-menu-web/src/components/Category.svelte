<script lang="ts">
  import {
    Icon,
    Card,
    CardHeader,
    CardTitle,
    ListGroup,
    ListGroupItem,
    CardBody,
  } from 'sveltestrap';
  import { getRouteToCategory } from './util/category.util';
  import { useNavigate } from 'svelte-navigator';
  import type { Category } from '../data/model/category.interface';
  import { getCategories } from '../data/data.util';
  export let category: Category;
  const subCategories: Category[] = category.sub_categories
    ? getCategories(category.sub_categories)
    : [];
  const route = getRouteToCategory(category.id);
  const hasSubCategories = subCategories.length > 0;
  const navigate = useNavigate();
  const navigateToParentCategory = (e: MouseEvent) => {
    if (!hasSubCategories) {
      navigate(route);
    }
  };
</script>

<div>
  <Card color="light">
    <CardHeader>
      <div
        class="d-flex justify-content-between"
        on:click={navigateToParentCategory}
      >
        <CardTitle>{category.name}</CardTitle>
        {#if !hasSubCategories}
          <Icon name="arrow-right" />
        {/if}
      </div>
      <ListGroup>
        {#each subCategories as subCategory}
          <ListGroupItem
            ><div
              class="d-flex justify-content-between"
              on:click={() => navigate(getRouteToCategory(subCategory.id))}
            >
              <CardTitle>{subCategory.name}</CardTitle>
              <Icon name="arrow-right" />
            </div></ListGroupItem
          >
        {/each}
      </ListGroup>
    </CardHeader>
  </Card>
</div>
