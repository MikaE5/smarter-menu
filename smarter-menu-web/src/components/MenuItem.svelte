<script lang="ts">
  import { onDestroy } from 'svelte';

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
  import {
    addToBookmarks,
    reduceBookmark,
    addBookmarkCountListener,
    removeBookmarkCountListener,
  } from '../bookmarks/bookmarks';
  import type { MenuItem } from '../data/model/menu-item.interface';
  import { getMenuItemImagePath } from '../util/image.util';
  import { getPriceString } from '../util/price.util';
  import Allergens from './menu-item/Allergens.svelte';
  import Classifications from './menu-item/Classifications.svelte';
  import Counter from './shared/Counter.svelte';
  import IconButton from './shared/IconButton.svelte';
  import ItemLabel from './menu-item/ItemLabel.svelte';
  export let menuItem: MenuItem;
  export let allergensLabel: string;

  let imgSrc: string;
  let priceString: string;
  let bookmarkCounter: number = 0;
  let bookmarkCounterListenerId: number;

  $: {
    imgSrc = getMenuItemImagePath(menuItem.image);
  }
  $: {
    priceString = getPriceString(menuItem.price.amount, menuItem.price.unit);
  }

  $: {
    bookmarkCounterListenerId = addBookmarkCountListener(
      menuItem.id,
      (count: number) => (bookmarkCounter = count)
    );
  }

  let allergensModalOpen = false;
  const toggleAllergensModal = () => (allergensModalOpen = !allergensModalOpen);

  onDestroy(() => {
    removeBookmarkCountListener(menuItem.id, bookmarkCounterListenerId);
  });
</script>

<div>
  <Card color="light">
    <CardHeader>
      <div class="d-flex">
        <div class="flex-grow-1">
          <Row cols={1}>
            <Col>
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <ItemLabel
                  name={menuItem.name}
                  itemNumber={menuItem.item_number}
                />

                <Counter
                  increase={() => addToBookmarks(menuItem.id)}
                  decrease={() => reduceBookmark(menuItem.id)}
                  counter={bookmarkCounter}
                />
              </div>
            </Col>
            {#if menuItem.description}
              <Col>
                <div class="mb-1">
                  <p class="description mb-0">{menuItem.description}</p>
                </div>
              </Col>
            {/if}
            {#if menuItem.classifications}
              <Col>
                <div class="mb-1">
                  <Classifications
                    classificationIds={menuItem.classifications}
                  />
                </div>
              </Col>
            {/if}
            <Col
              ><div class="d-flex justify-content-between">
                {#if menuItem.allergens}
                  <IconButton
                    label={allergensLabel}
                    icon="info-circle"
                    click={toggleAllergensModal}
                  />
                {/if}
                <div class="ml-auto">
                  <CardText>{priceString}</CardText>
                </div>
              </div></Col
            >
          </Row>
        </div>
      </div>
    </CardHeader>
  </Card>

  <Modal isOpen={allergensModalOpen} toggle={toggleAllergensModal}>
    <ModalHeader toggle={toggleAllergensModal}>{menuItem.name}</ModalHeader>
    <ModalBody>
      <Allergens allergenIds={menuItem.allergens} />
    </ModalBody>
  </Modal>
</div>

<style>
  .description {
    font-size: medium;
  }
</style>
