<script lang="ts">
  import { getMenuItemsForCategory } from '../../data/data';
  import { Row, Col } from 'sveltestrap';
  import type { MenuItem as MenuItemType } from '../../data/model/menu-item.interface';
  import MenuItem from './MenuItem.svelte';
  import BookmarkButton from './BookmarkButton.svelte';
  import {
    currentFilteredMenuItems$,
    currentMenuItems$,
  } from '../../stores/menu-items.stores';
  import FilterItems from './menu-item/FilterItems.svelte';

  export let categoryId: string;

  $: {
    // refetch menuItems if route param changes
    getMenuItemsForCategory(categoryId, true).then((items: MenuItemType[]) => {
      currentMenuItems$.set(items);
      currentFilteredMenuItems$.set(items);
    });
  }
</script>

<FilterItems />
<Row cols={1}>
  {#each $currentFilteredMenuItems$ as menuItem}
    <Col>
      <div class="mb-1 mt-1">
        <MenuItem {menuItem} />
      </div>
    </Col>
  {/each}
</Row>
<BookmarkButton />
