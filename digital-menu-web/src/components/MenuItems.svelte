<script lang="ts">
  import {
    getCategoryNameForId,
    getMenuItemsForCategory,
  } from '../data/data.util';
  import { Row, Col, BreadcrumbItem, Breadcrumb } from 'sveltestrap';
  import type { MenuItem as MenuItemType } from './model/menu-item.interface';
  import MenuItem from './MenuItem.svelte';
  import { Link } from 'svelte-navigator';

  export let categoryId: string;
  export let homeBreadCrumb: string;

  let menuItems: MenuItemType[];
  let categoryName: string;
  $: {
    // refetch menuItems if route param changes
    menuItems = getMenuItemsForCategory(categoryId);
    categoryName = getCategoryNameForId(categoryId);
  }
</script>

<Breadcrumb>
  <BreadcrumbItem>
    <Link to="/">{homeBreadCrumb}</Link>
  </BreadcrumbItem>
  <BreadcrumbItem active>{categoryName}</BreadcrumbItem>
</Breadcrumb>
<Row cols={1}>
  {#each menuItems as menuItem}
    <Col class="mb-1 mt-1">
      <MenuItem {menuItem} />
    </Col>
  {/each}
</Row>
