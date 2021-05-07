<script lang="ts">
  import {
    addToBookmarks,
    deleteFromBookmarks,
    getBookmarkMap,
    reduceBookmark,
  } from '../bookmarks/bookmarks.util';
  import { getMenuItems } from '../data/data.util';
  import type { MenuItem } from '../components/model/menu-item.interface';
  import { Table } from 'sveltestrap';
  import { getPriceString } from '../util/price.util';
  import ClickIcon from './shared/ClickIcon.svelte';
  import { onDestroy } from 'svelte';
  import Counter from './shared/Counter.svelte';

  export let emptyItemsMessage: string;
  let totalAmount: number;
  let defaultPriceUnit: string;
  let bookmarks: Array<{ count: number; item: MenuItem }> = [];
  const bookmarkSubscription = getBookmarkMap().subscribe((map) => {
    const menuItems: MenuItem[] = getMenuItems(Object.keys(map));
    bookmarks = menuItems.map((item) => {
      return {
        item,
        count: map[item.id],
      };
    });
    totalAmount = bookmarks.reduce(
      (previousCount: number, entry: { item: MenuItem; count: number }) =>
        (previousCount += entry.count * entry.item.price.amount),
      0
    );
    defaultPriceUnit = menuItems.length > 0 ? menuItems[0].price.unit : '';
  });

  onDestroy(() => {
    bookmarkSubscription.unsubscribe();
  });
</script>

{#if totalAmount !== 0}
  <Table borderless responsive>
    <tbody>
      {#each bookmarks as bookmark, i}
        <tr class={i === bookmarks.length - 1 ? '' : 'border-bottom'}>
          <td><span>{bookmark.item.name}</span></td>

          <td>
            <Counter
              counter={bookmark.count}
              increase={() => addToBookmarks(bookmark.item.id)}
              decrease={() => reduceBookmark(bookmark.item.id)}
            /></td
          >
          <td>
            <span class="d-flex justify-content-end">
              {getPriceString(
                bookmark.item.price.amount,
                bookmark.item.price.unit
              )}</span
            >
          </td>
          <!-- <td>
            <ClickIcon
              icon="x-square"
              click={() => deleteFromBookmarks(bookmark.item.id)}
            />
          </td> -->
        </tr>
      {/each}
      <tr class="border-top border-danger">
        <td />
        <td />
        <td
          ><span class="d-flex justify-content-end"
            >{getPriceString(totalAmount, defaultPriceUnit)}</span
          ></td
        >
        <!--   <td /> -->
      </tr>
    </tbody>
  </Table>
{:else}
  <p>{emptyItemsMessage}</p>
{/if}
