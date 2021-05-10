<script lang="ts">
  import { onDestroy } from 'svelte';

  import { useNavigate } from 'svelte-navigator';
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
  } from '../bookmarks/bookmarks';
  import { getPriceString } from '../util/price.util';
  import CounterIcon from './shared/CounterIcon.svelte';

  export let title: string;
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

  onDestroy(() => {
    removeBookmarkOverallPriceListener(priceListenerId);
  });
</script>

<Navbar color="secondary" light>
  <NavbarBrand class="mr-auto" on:click={() => navigateTo('/')}
    >{title}</NavbarBrand
  >
  <CounterIcon
    icon="bookmark"
    click={() => navigateTo('/bookmarks')}
    counter={overallPrice}
  />
  <NavbarToggler on:click={toggle} class="ml-2" />
  <Collapse {isOpen} navbar>
    <Nav navbar justified>
      {#each navItems as navItem}
        <NavLink on:click={() => navigateTo(navItem.route)}
          >{navItem.title}</NavLink
        >
      {/each}
    </Nav>
  </Collapse>
</Navbar>
