<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { NavLink, Nav, NavItem } from 'sveltestrap';
  export let slogan: string;
  export let dataPrivacy: string;
</script>

<div class="border-top">
  <Nav vertical>
    <NavItem>
      <NavLink>{slogan}</NavLink>
    </NavItem>
    <NavItem>
      <NavLink><Link to="/privacy">{dataPrivacy}</Link></NavLink>
    </NavItem>
  </Nav>
</div>
