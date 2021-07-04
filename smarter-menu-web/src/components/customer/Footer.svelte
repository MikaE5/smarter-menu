<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { NavLink, Nav, NavItem } from 'sveltestrap';
  import { pageConfigStore } from '../../stores/page-config.stores';
  import SmarterMenuLink from './shared/SmarterMenuLink.svelte';
</script>

<div class="border-top">
  <Nav vertical>
    <NavItem>
      <NavLink
        ><SmarterMenuLink to="/" label={$pageConfigStore.page_content.footer.slogan}></SmarterMenuLink></NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink><SmarterMenuLink to="privacy" label={$pageConfigStore.page_content.footer.data_privacy}></SmarterMenuLink></NavLink>
    </NavItem>
    <NavItem>
   
      <NavLink><SmarterMenuLink to="imprint" label={$pageConfigStore.page_content.footer.imprint}></SmarterMenuLink></NavLink>
    </NavItem>
  </Nav>
</div>
