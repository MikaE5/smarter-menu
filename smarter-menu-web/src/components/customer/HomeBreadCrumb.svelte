<script lang="ts">
  import { BreadcrumbItem, Breadcrumb } from 'sveltestrap';
  import { Link } from 'svelte-navigator';
import { homePathStore, pageConfigStore } from '../../stores/page-config.stores';

  export let activeItem$: Promise<string>;
</script>

<Breadcrumb>
  <BreadcrumbItem>
    <Link to={$homePathStore}>{$pageConfigStore.page_content.categories.home_bread_crumb}</Link>
  </BreadcrumbItem>
  <BreadcrumbItem active
    >{#await activeItem$ then item}
      {item}
    {/await}</BreadcrumbItem
  >
</Breadcrumb>
