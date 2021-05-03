<script lang="ts">
  import { Card, CardText, CardTitle, CardBody } from 'sveltestrap';
  import { getCategoryImagePath } from '../util/image.util';
  import { getPriceString } from '../util/price.util';
  import type { MenuItem } from './model/menu-item.interface';
  export let menuItem: MenuItem;

  const imgSrc = getCategoryImagePath(menuItem.image);
  const priceString = getPriceString(
    menuItem.price.amount,
    menuItem.price.unit
  );
</script>

<Card color="light">
  <CardBody>
    <CardTitle>{menuItem.name}</CardTitle>
    <CardText>{priceString}</CardText>
    <img src={imgSrc} class="img-fluid category-image" alt="" />
  </CardBody>
</Card>
