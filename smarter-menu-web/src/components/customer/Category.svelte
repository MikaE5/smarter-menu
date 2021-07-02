<script lang="ts">
  import {
    Icon,
    Card,
    CardHeader,
    CardTitle,
    ListGroup,
    ListGroupItem,
  } from 'sveltestrap';
  import { getRouteToCategory } from './util/category.util';
  import { useNavigate } from 'svelte-navigator';
  import type { Category } from '../../data/model/category.interface';
  import { getCategoriesByIds } from '../../data/data';
  export let category: Category;
  const subCategories$: Promise<Category[]> = category.sub_categories
    ? getCategoriesByIds(category.sub_categories)
    : Promise.resolve([]);
  const route = getRouteToCategory(category.id);
  const navigate = useNavigate();
  const hasSubCategories = category.sub_categories
    ? category.sub_categories.length > 0
    : false;
  const navigateToParentCategory = (e: MouseEvent) => {
    navigate(route);
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
        <Icon name="arrow-right" />
      </div>
      <ListGroup>
        {#await subCategories$ then subCategories}
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
        {/await}
      </ListGroup>
    </CardHeader>
  </Card>
</div>
