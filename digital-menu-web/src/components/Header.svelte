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
    addBookmarkOverallCountListener,
    removeBookmarkOverallCountListener,
  } from '../bookmarks/bookmarks.util';
  import CounterIcon from './shared/CounterIcon.svelte';

  export let title: string;
  export let navItems: Array<{ title: string; route: string }>;
  let counter: number = 0;
  const counterListenerId = addBookmarkOverallCountListener(
    (count: number) => (counter = count)
  );

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
  const navigate = useNavigate();
  const navigateTo = (route: string) => {
    if (isOpen) isOpen = false;
    navigate(route);
  };

  onDestroy(() => {
    removeBookmarkOverallCountListener(counterListenerId);
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
