<script lang="ts">
  import { useNavigate } from 'svelte-navigator';
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
  } from 'sveltestrap';
  import ClickIcon from './shared/ClickIcon.svelte';

  export let title: string;
  export let navItems: Array<{ title: string; route: string }>;

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
  const navigate = useNavigate();
  const navigateTo = (route: string) => {
    if (isOpen) isOpen = false;
    navigate(route);
  };
</script>

<Navbar color="secondary" light>
  <NavbarBrand class="mr-auto" on:click={() => navigateTo('/')}
    >{title}</NavbarBrand
  >
  <ClickIcon icon="bookmark" click={() => navigateTo('/bookmarks')} />
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
