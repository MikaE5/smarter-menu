<script lang="ts">
  import {
    addToBookmarks,
    reduceBookmark,
    addBookmarksListener,
    removeBookmarksListener,
  } from '../../bookmarks/bookmarks';
  import { Table } from 'sveltestrap';
  import { getPriceString } from '../../util/price.util';
  import { onDestroy } from 'svelte';
  import Counter from './shared/Counter.svelte';
  import type {
    BookmarkInfo,
    BookmarkItem,
  } from '../../bookmarks/model/bookmark-info.interface';
  import ItemLabel from './menu-item/ItemLabel.svelte';
import { pageConfigStore } from '../../stores/page-config.stores';

  let totalPrice: string;
  let bookmarks: BookmarkItem[] = [];
  const listenerId = addBookmarksListener((info: BookmarkInfo) => {
    totalPrice = getPriceString(info.priceInfo.price, info.priceInfo.unit);
    bookmarks = info.items;
  });
  onDestroy(() => {
    removeBookmarksListener(listenerId);
  });
</script>

{#if bookmarks.length !== 0}
  <Table borderless responsive>
    <tbody>
      {#each bookmarks as bookmark, i}
        <tr class={i === bookmarks.length - 1 ? '' : 'border-bottom'}>
          <td
            ><ItemLabel
              name={bookmark.item.name}
              itemNumber={bookmark.item.item_number}
              size={6}
            /></td
          >

          <td>
            <Counter
              counter={bookmark.amount}
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
      <tr class="border-top smarter-menu-border">
        <td />
        <td />
        <td><span class="d-flex justify-content-end">{totalPrice}</span></td>
        <!--   <td /> -->
      </tr>
    </tbody>
  </Table>
{:else}
  <p>{$pageConfigStore.page_content.bookmarks.no_items}</p>
{/if}

<style>
  .smarter-menu-border {
    border-color: var(--smarter-menu-light-accent) !important;
  }
</style>
