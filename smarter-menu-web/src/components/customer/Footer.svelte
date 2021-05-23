<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { NavLink, Nav, NavItem } from 'sveltestrap';
  export let slogan: string;
  export let dataPrivacy: string;

  const openExternal = (url: string) => {
    window.open(url, '_blank').focus();
  };
</script>

<div class="border-top">
  <Nav vertical>
    <NavItem>
      <NavLink on:click={() => openExternal('https://www.smarter-menu.de')}
        >{slogan}</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink><Link to="privacy">{dataPrivacy}</Link></NavLink>
    </NavItem>
  </Nav>
</div>
