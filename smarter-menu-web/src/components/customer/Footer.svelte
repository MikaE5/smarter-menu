<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { NavLink, Nav, NavItem } from 'sveltestrap';
  import { pageConfigStore } from '../../stores/page-config.stores';

  const openExternal = (url: string) => {
    // do nothing for now
    //window.open(url, '_blank').focus();
  };
</script>

<div class="border-top">
  <Nav vertical>
    <NavItem>
      <NavLink on:click={() => openExternal('https://www.smarter-menu.de')}
        >{$pageConfigStore.page_content.footer.slogan}</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink><Link to="privacy">{$pageConfigStore.page_content.footer.data_privacy}</Link></NavLink>
    </NavItem>
    <NavItem>
      <NavLink><Link to="imprint">{$pageConfigStore.page_content.footer.imprint}</Link></NavLink>
    </NavItem>
  </Nav>
</div>
