<script lang="ts">
  import { bookmarks, deleteFromBookmarks } from '../bookmarks/bookmarks.util';
  import { getMenuItems } from '../data/data.util';
  import type { MenuItem } from '../components/model/menu-item.interface';
  import { Table } from 'sveltestrap';
  import { getPriceString } from '../util/price.util';
  import ClickIcon from './shared/ClickIcon.svelte';

  export let emptyItemsMessage: string;

  let menuItems: MenuItem[];
  let totalAmount: number;
  let defaultPriceUnit: string;

  $: {
    menuItems = getMenuItems($bookmarks).reverse();
    totalAmount = menuItems.reduce((count: number, item: MenuItem) => {
      return count + item.price.amount;
    }, 0);
    defaultPriceUnit = menuItems.length > 0 ? menuItems[0].price.unit : '';
  }
</script>

{#if totalAmount !== 0}
  <Table borderless responsive>
    <tbody>
      {#each menuItems as item, i}
        <tr class={i === menuItems.length - 1 ? '' : 'border-bottom'}>
          <td>{item.name}</td>
          <td
            ><ClickIcon
              icon="dash-circle"
              click={() => deleteFromBookmarks(item.id)}
            /></td
          >
          <td>{getPriceString(item.price.amount, item.price.unit)}</td>
        </tr>
      {/each}
      <tr class="border-top border-danger">
        <td />
        <td />
        <td>{getPriceString(totalAmount, defaultPriceUnit)}</td>
      </tr>
    </tbody>
  </Table>
{:else}
  <p>{emptyItemsMessage}</p>
{/if}
