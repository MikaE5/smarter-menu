<script lang="ts">
  import {
    getCategoryNameForId,
    getMenuItemsForCategory,
  } from '../data/data.util';
  import { Row, Col } from 'sveltestrap';
  import type { MenuItem as MenuItemType } from '../data/model/menu-item.interface';
  import MenuItem from './MenuItem.svelte';

  export let categoryId: string;
  export let allergensLabel: string;

  let menuItems: MenuItemType[];
  let categoryName: string;
  $: {
    // refetch menuItems if route param changes
    menuItems = getMenuItemsForCategory(categoryId, true);
    categoryName = getCategoryNameForId(categoryId);
  }
</script>

<Row cols={1}>
  {#each menuItems as menuItem}
    <Col>
      <div class="mb-1 mt-1">
        <MenuItem {allergensLabel} {menuItem} />
      </div>
    </Col>
  {/each}
</Row>
