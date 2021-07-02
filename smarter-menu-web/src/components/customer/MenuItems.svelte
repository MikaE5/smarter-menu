<script lang="ts">
  import { getMenuItemsForCategory } from '../../data/data';
  import { Row, Col } from 'sveltestrap';
  import type { MenuItem as MenuItemType } from '../../data/model/menu-item.interface';
  import MenuItem from './MenuItem.svelte';

  export let categoryId: string;
  export let allergensLabel: string;

  let menuItems$: Promise<MenuItemType[]>;
  $: {
    // refetch menuItems if route param changes
    menuItems$ = getMenuItemsForCategory(categoryId, true);
  }
</script>

{#await menuItems$ then menuItems}
  <Row cols={1}>
    {#each menuItems as menuItem}
      <Col>
        <div class="mb-1 mt-1">
          <MenuItem {allergensLabel} {menuItem} />
        </div>
      </Col>
    {/each}
  </Row>
{/await}
