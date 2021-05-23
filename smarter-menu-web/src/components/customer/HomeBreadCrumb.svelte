<script lang="ts">
  import { BreadcrumbItem, Breadcrumb } from 'sveltestrap';
  import { Link } from 'svelte-navigator';

  export let activeItem$: Promise<string>;
  export let homeBreadCrumb: string;
  export let homePath: string;
</script>

<Breadcrumb>
  <BreadcrumbItem>
    <Link to={homePath}>{homeBreadCrumb}</Link>
  </BreadcrumbItem>
  <BreadcrumbItem active
    >{#await activeItem$ then item}
      {item}
    {/await}</BreadcrumbItem
  >
</Breadcrumb>
