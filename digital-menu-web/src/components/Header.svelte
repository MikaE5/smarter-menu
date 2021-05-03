<script lang="ts">
  import { useNavigate, Link } from 'svelte-navigator';
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'sveltestrap';
  import { getCategories } from '../data/data.util';
  import { getRouteToCategory } from './util/category.util';

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
  const categories = getCategories();
  const navigate = useNavigate();
</script>

<Navbar color="light" light>
  <Link to="/">
    <NavbarBrand class="mr-auto">sveltestrap</NavbarBrand></Link
  >
  <NavbarToggler on:click={toggle} className="mr-2" />
  <Collapse {isOpen} navbar>
    <Nav navbar>
      {#each categories as category}
        <NavLink on:click={() => navigate(getRouteToCategory(category.id))}
          >{category.name}</NavLink
        >
      {/each}
    </Nav>
  </Collapse>
</Navbar>
