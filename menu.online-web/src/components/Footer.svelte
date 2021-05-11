<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { NavLink, Nav, NavItem } from 'sveltestrap';
  export let slogan: string;
  export let dataPrivacy: string;
</script>

<Nav vertical class="border-top">
  <NavItem>
    <NavLink color="primary">{slogan}</NavLink>
  </NavItem>
  <NavItem>
    <NavLink><Link to="/privacy">{dataPrivacy}</Link></NavLink>
  </NavItem>
</Nav>
