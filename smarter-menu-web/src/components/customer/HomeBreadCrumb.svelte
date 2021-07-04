<script lang="ts">
  import { BreadcrumbItem, Breadcrumb } from 'sveltestrap';
import { homePathStore, pageConfigStore } from '../../stores/page-config.stores';
import SmarterMenuLink from './shared/SmarterMenuLink.svelte';

  export let activeItem$: Promise<string>;
</script>

<Breadcrumb>
  <BreadcrumbItem>
    <SmarterMenuLink to={$homePathStore} label={$pageConfigStore.page_content.categories.home_bread_crumb}></SmarterMenuLink>
  </BreadcrumbItem>
  <BreadcrumbItem active
    >{#await activeItem$ then item}
      {item}
    {/await}</BreadcrumbItem
  >
</Breadcrumb>
