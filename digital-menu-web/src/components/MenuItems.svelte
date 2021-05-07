<script lang="ts">
  import {
    getCategoryNameForId,
    getMenuItemsForCategory,
  } from '../data/data.util';
  import { Row, Col } from 'sveltestrap';
  import type { MenuItem as MenuItemType } from './model/menu-item.interface';
  import MenuItem from './MenuItem.svelte';

  export let categoryId: string;

  let menuItems: MenuItemType[];
  let categoryName: string;
  $: {
    // refetch menuItems if route param changes
    menuItems = getMenuItemsForCategory(categoryId);
    categoryName = getCategoryNameForId(categoryId);
  }
</script>

<Row cols={1}>
  {#each menuItems as menuItem}
    <Col class="mb-1 mt-1">
      <MenuItem {menuItem} />
    </Col>
  {/each}
</Row>
