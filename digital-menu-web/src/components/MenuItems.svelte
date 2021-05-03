<script lang="ts">
  import { getMenuItemsForCategory } from '../data/data.util';
  import { Row, Col } from 'sveltestrap';
  import type { MenuItem as MenuItemType } from './model/menu-item.interface';
  import MenuItem from './MenuItem.svelte';

  export let categoryId: string;

  const menuItems: MenuItemType[] = getMenuItemsForCategory(categoryId);
</script>

<Row cols={1}>
  {#each menuItems as menuItem}
    <Col class="mb-1 mt-1">
      <MenuItem {menuItem} />
    </Col>
  {/each}
</Row>
