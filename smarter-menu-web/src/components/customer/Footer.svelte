<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { NavLink, Nav, NavItem } from 'sveltestrap';
  export let slogan: string;
  export let dataPrivacy: string;
  export let imprint: string;

  const openExternal = (url: string) => {
    // do nothing for now
    //window.open(url, '_blank').focus();
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
    <NavItem>
      <NavLink><Link to="imprint">{imprint}</Link></NavLink>
    </NavItem>
  </Nav>
</div>
