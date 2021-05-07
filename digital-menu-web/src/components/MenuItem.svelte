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
  } from '../bookmarks/bookmarks.util';
  import type { MenuItem } from '../data/model/menu-item.interface';
  import { getMenuItemImagePath } from '../util/image.util';
  import { getPriceString } from '../util/price.util';
  import Allergens from './Allergens.svelte';
  import Classifications from './Classifications.svelte';
  import Counter from './shared/Counter.svelte';
  import IconButton from './shared/IconButton.svelte';
  export let menuItem: MenuItem;

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

  let imageModalOpen = false;
  const toggleImageModal = () => (imageModalOpen = !imageModalOpen);

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
        <img
          on:click={toggleImageModal}
          src={imgSrc}
          alt=""
          class="menu-item-image mr-2"
        />
        <div class="flex-grow-1">
          <Row cols={1}>
            <Col>
              <div class="d-flex justify-content-between mr-2">
                <CardTitle>{menuItem.name}</CardTitle>
                <Counter
                  increase={() => addToBookmarks(menuItem.id)}
                  decrease={() => reduceBookmark(menuItem.id)}
                  counter={bookmarkCounter}
                />
              </div>
            </Col>
            {#if menuItem.classifications}
              <Col>
                <Classifications classificationIds={menuItem.classifications} />
              </Col>
            {/if}
            <Col
              ><div class="d-flex justify-content-between">
                <CardText>{priceString}</CardText>
                {#if menuItem.allergens}
                  <IconButton
                    label="Allergene"
                    icon="info-circle"
                    click={toggleAllergensModal}
                  />
                {/if}
              </div></Col
            >
          </Row>
        </div>
      </div>
    </CardHeader>
  </Card>

  <Modal isOpen={imageModalOpen} toggle={toggleImageModal}>
    <ModalHeader toggle={toggleImageModal}>{menuItem.name}</ModalHeader>
    <ModalBody>
      <img src={imgSrc} alt="" class="modal-image" />
    </ModalBody>
  </Modal>
  <Modal isOpen={allergensModalOpen} toggle={toggleAllergensModal}>
    <ModalHeader toggle={toggleAllergensModal}>{menuItem.name}</ModalHeader>
    <ModalBody>
      <Allergens allergenIds={menuItem.allergens} />
    </ModalBody>
  </Modal>
</div>

<style>
  .menu-item-image {
    object-fit: cover;
    width: 20vw;
    height: 20vw;
    min-width: 20vw;
    min-height: 20vw;
    max-width: 20vw;
    max-height: 20vw;
  }

  .modal-image {
    max-width: 100%;
  }
</style>
