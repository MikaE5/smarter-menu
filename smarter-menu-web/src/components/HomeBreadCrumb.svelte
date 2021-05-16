<script lang="ts">
  import { BreadcrumbItem, Breadcrumb } from 'sveltestrap';
  import { Link } from 'svelte-navigator';

  export let activeItem: string;
  export let homeBreadCrumb: string;
</script>

<Breadcrumb>
  <BreadcrumbItem>
    <Link to="/">{homeBreadCrumb}</Link>
  </BreadcrumbItem>
  <BreadcrumbItem active>{activeItem}</BreadcrumbItem>
</Breadcrumb>
