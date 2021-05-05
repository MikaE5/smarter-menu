<script lang="ts">
  import {
    Card,
    CardText,
    CardTitle,
    CardHeader,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
  } from 'sveltestrap';
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

  let open = false;
  const toggle = () => (open = !open);
</script>

<div>
  <Card color="light">
    <CardHeader>
      <div class="d-flex">
        <img
          on:click={toggle}
          src={imgSrc}
          alt=""
          class="menu-item-image mr-2"
        />
        <div class="flex-grow-1">
          <Row cols={1}>
            <Col>
              <div class="d-flex justify-content-between">
                <CardTitle>{menuItem.name}</CardTitle>
                <ClickIcon
                  click={() => addToBookmarks(menuItem.id)}
                  icon="plus-circle"
                />
              </div>
            </Col>
            <Col><CardText>{priceString}</CardText></Col>
          </Row>
        </div>
      </div>
    </CardHeader>
    <!--  <CardBody>
      <img src={imgSrc} class="img-fluid category-image" alt="" />
    </CardBody> -->
  </Card>

  <Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>{menuItem.name}</ModalHeader>
    <ModalBody>
      <img src={imgSrc} alt="" class="modal-image" />
    </ModalBody>
  </Modal>
</div>

<style>
  .menu-item-image {
    object-fit: cover;
    width: 20vw;
    height: 20vw;
    max-width: 20vw;
    max-height: 20vw;
  }

  .modal-image {
    max-width: 100%;
  }
</style>
