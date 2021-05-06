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
  import { getBookmarkMap } from '../bookmarks/bookmarks.util';
  import ClickIcon from './shared/ClickIcon.svelte';
  import CounterIcon from './shared/CounterIcon.svelte';

  export let title: string;
  export let navItems: Array<{ title: string; route: string }>;
  let counter: number = 0;
  const bookmarkSubscription = getBookmarkMap().subscribe((map) => {
    counter = Object.values(map).reduce(
      (counter, item) => (counter += item),
      0
    );
  });

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
  const navigate = useNavigate();
  const navigateTo = (route: string) => {
    if (isOpen) isOpen = false;
    navigate(route);
  };

  onDestroy(() => {
    bookmarkSubscription.unsubscribe();
  });
</script>

<Navbar color="secondary" light>
  <NavbarBrand class="mr-auto" on:click={() => navigateTo('/')}
    >{title}</NavbarBrand
  >
  <CounterIcon
    icon="bookmark"
    click={() => navigateTo('/bookmarks')}
    {counter}
  />
  <NavbarToggler on:click={toggle} class="ml-2" />
  <Collapse {isOpen} navbar>
    <Nav navbar>
      {#each navItems as navItem}
        <NavLink on:click={() => navigateTo(navItem.route)}
          >{navItem.title}</NavLink
        >
      {/each}
    </Nav>
  </Collapse>
</Navbar>
