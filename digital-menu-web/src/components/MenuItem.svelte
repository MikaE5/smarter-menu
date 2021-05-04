<script lang="ts">
  import { Card, CardText, CardTitle, CardBody, CardHeader } from 'sveltestrap';
  import { addToBookmarks } from '../bookmarks/bookmarks.util';
  import { getCategoryImagePath } from '../util/image.util';
  import { getPriceString } from '../util/price.util';
  import type { MenuItem } from './model/menu-item.interface';
  import ClickIcon from './shared/ClickIcon.svelte';
  export let menuItem: MenuItem;

  let imgSrc: string;
  let priceString: string;

  $: {
    imgSrc = getCategoryImagePath(menuItem.image);
  }
  $: {
    priceString = getPriceString(menuItem.price.amount, menuItem.price.unit);
  }
</script>

<Card color="light">
  <CardHeader>
    <div class="d-flex justify-content-between">
      <CardTitle>{menuItem.name}</CardTitle>
      <ClickIcon click={() => addToBookmarks(menuItem.id)} icon="plus-circle" />
    </div>
    <CardText>{priceString}</CardText>
  </CardHeader>
  <CardBody>
    <img src={imgSrc} class="img-fluid category-image" alt="" />
  </CardBody>
</Card>
