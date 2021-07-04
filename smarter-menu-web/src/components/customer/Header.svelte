<script lang="ts">
  import { onDestroy } from 'svelte';

  import { Link, useNavigate } from 'svelte-navigator';
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
  } from 'sveltestrap';
  import {
    addBookmarkOverallPriceListener,
    removeBookmarkOverallPriceListener,
  } from '../../bookmarks/bookmarks';
  import { homePathStore, pageConfigStore } from '../../stores/page-config.stores';
  import { getPriceString } from '../../util/price.util';
  import CounterIcon from './shared/CounterIcon.svelte';

  export let navItems: Array<{ title: string; route: string }>;

  let overallPrice: string = '';
  const priceListenerId = addBookmarkOverallPriceListener(
    (price: number, unit: string) => {
      overallPrice = price > 0 ? getPriceString(price, unit) : '';
    }
  );

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
  const navigate = useNavigate();
  const navigateTo = (route: string) => {
    if (isOpen) isOpen = false;
    navigate(route);
  };
  const closeIfOpen = () => {
    if (isOpen) toggle();
  };

  onDestroy(() => {
    removeBookmarkOverallPriceListener(priceListenerId);
  });
</script>

<div class="smarter-menu-dark-accent-bg header-wrapper">
<Navbar light>
  <div class="mr-auto" on:click={closeIfOpen}>
    <Link to={$homePathStore}>
      <NavbarBrand>{$pageConfigStore.page_content.header.title}</NavbarBrand>
    </Link>
  </div>
  <CounterIcon
    icon="bookmark"
    click={() => navigateTo('bookmarks')}
    counter={overallPrice}
    size={3}
  />
  <NavbarToggler on:click={toggle} class="ml-2 smarter-menu-navbar-toggler" />
  <Collapse {isOpen} navbar>
    <Nav navbar justified>
      {#each navItems as navItem}
        <div class="d-flex justify-content-center w-100 p-1 nav-item-text" on:click={() => navigateTo(navItem.route)}
          >{navItem.title}</div
        > 
      {/each}
      <div class="d-flex justify-content-center w-100 p-1 border-top nav-item-bookmarks" on:click={() => navigateTo('bookmarks')}>{$pageConfigStore.page_content.bookmarks.to_bookmarks}</div>
    </Nav>
  </Collapse>
</Navbar>
</div>

<style>
  .header-wrapper :global(.smarter-menu-navbar-toggler) {
    background-color: var(--smarter-menu-dark-accent) !important;
  }
  .header-wrapper :global(.nav-item-text) {
    color: black !important;
  }
  .header-wrapper :global(.nav-item-bookmarks) {
    color: black !important;
    border-color: var(--smarter-menu-light-accent) !important;
  }
</style>
