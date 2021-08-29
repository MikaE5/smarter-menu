<script lang="ts">
  import { NavLink, Nav, NavItem } from 'sveltestrap';
  import { pageConfigStore } from '../../stores/page-config.stores';
  import SmarterMenuLink from './shared/SmarterMenuLink.svelte';

  const openMapsLink = (link: string) => {
    if (link === undefined) return;
    window.open(link, 'blank');
  };
</script>

<div class="border-top">
  <Nav vertical>
    {#if $pageConfigStore.customer_information !== undefined}
      <div
        on:click={() =>
          openMapsLink($pageConfigStore.customer_information.maps_link)}
      >
        <NavItem>
          <SmarterMenuLink label={$pageConfigStore.customer_information.name} />
          {#each $pageConfigStore.customer_information.address as addressPart}
            <SmarterMenuLink label={addressPart} />
          {/each}
        </NavItem>
      </div>
    {/if}

    <NavItem>
      <NavLink
        ><SmarterMenuLink
          to="/"
          label={$pageConfigStore.page_content.footer.slogan}
        /></NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink
        ><SmarterMenuLink
          to="privacy"
          label={$pageConfigStore.page_content.footer.data_privacy}
        /></NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink
        ><SmarterMenuLink
          to="imprint"
          label={$pageConfigStore.page_content.footer.imprint}
        /></NavLink
      >
    </NavItem>
  </Nav>
</div>
