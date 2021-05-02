<script lang="ts">
  import { Card, CardBody, CardFooter } from 'sveltestrap';
  import { getCategoryImagePath } from '../util/image.util';
  import type { Category } from './model/category.interface';
  import ButtonLink from './shared/ButtonLink.svelte';
  export let category: Category;

  const imgSrc = getCategoryImagePath(category.image);
</script>

<Card color="secondary">
  <CardBody>
    <img src={imgSrc} class="img-fluid category-image" alt="" />
  </CardBody>
  <CardFooter>
    <ButtonLink
      to={`category/${encodeURIComponent(category.id)}`}
      label={category.name}
    /></CardFooter
  >
</Card>
