<script lang="ts">
  import { onMount } from 'svelte';
  import { Collapse, Icon } from 'sveltestrap';
  import { getClassificationsByIds } from '../../../data/data';
  import type { Classification } from '../../../data/model/classification.interface';
  import type { MenuItem } from '../../../data/model/menu-item.interface';
  import {
    currentFilteredMenuItems$,
    currentMenuItems$,
  } from '../../../stores/menu-items.stores';
  import { isSubset } from '../../../util/array.util';
  import IconButton from '../shared/IconButton.svelte';
  import SmarterMenuBadge from '../shared/SmarterMenuBadge.svelte';

  let activeClassifications: Classification[] = [];
  let inactiveClassifications: Classification[] = [];
  let allItems: MenuItem[] = [];

  let filtersOpen = false;

  const removeFromAndAddTo = (
    classification: Classification,
    removeFrom: Classification[],
    addTo: Classification[]
  ): [Classification[], Classification[]] => [
    removeFrom.filter(
      (fromCategory: Classification) => fromCategory.id !== classification.id
    ),
    [...addTo, classification],
  ];

  const filterMenuItems = () => {
    if (activeClassifications.length <= 0) {
      currentFilteredMenuItems$.set(allItems);
    } else {
      currentFilteredMenuItems$.set(
        allItems.filter(
          (item: MenuItem) =>
            item.classifications &&
            isSubset(
              activeClassifications.map((classification) => classification.id),
              item.classifications
            )
        )
      );
    }
  };

  const makeActive = (classification: Classification) => {
    [inactiveClassifications, activeClassifications] = removeFromAndAddTo(
      classification,
      inactiveClassifications,
      activeClassifications
    );
    filterMenuItems();
  };
  const makeInactive = (classification: Classification) => {
    [activeClassifications, inactiveClassifications] = removeFromAndAddTo(
      classification,
      activeClassifications,
      inactiveClassifications
    );
    filterMenuItems();
  };

  const resetFilters = async () => {
    const idSet: Set<string> = new Set();
    allItems.forEach((item: MenuItem) => {
      if (item.classifications) {
        item.classifications.forEach((id: string) => idSet.add(id));
      }
    });

    inactiveClassifications = await getClassificationsByIds(Array.from(idSet));
    activeClassifications = [];
    filterMenuItems();
  };

  onMount(() => {
    currentMenuItems$.subscribe(async (items: MenuItem[]) => {
      const idSet: Set<string> = new Set();
      items.forEach((item: MenuItem) => {
        if (item.classifications) {
          item.classifications.forEach((id: string) => idSet.add(id));
        }
      });

      allItems = items;
      inactiveClassifications = await getClassificationsByIds(
        Array.from(idSet)
      );
      activeClassifications = [];
    });
  });
</script>

{#if activeClassifications.length > 0 || inactiveClassifications.length > 0}
  <div class="d-flex filter-button-container">
    <IconButton
      label="Filter"
      icon={filtersOpen ? 'arrow-up' : 'funnel'}
      click={() => (filtersOpen = !filtersOpen)}
      iconPosition="right"
    />
    {#if filtersOpen && activeClassifications.length > 0}
      <IconButton
        label="Alle zurücksetzen"
        iconPosition="right"
        icon="x"
        click={() => resetFilters()}
      />
    {/if}
  </div>

  <Collapse isOpen={filtersOpen}>
    <div class="mt-1 mb-1">
      <div class="d-flex">
        {#each inactiveClassifications as classification, i}
          <div
            on:click={() => makeActive(classification)}
            class={i === inactiveClassifications.length - 1 ? '' : 'mr-1'}
          >
            <SmarterMenuBadge label={classification.name} active={false} />
          </div>
        {/each}
      </div>

      <div class="d-flex">
        {#each activeClassifications as classification, i}
          <div
            on:click={() => makeInactive(classification)}
            class={i === activeClassifications.length - 1 ? '' : 'mr-1'}
          >
            <SmarterMenuBadge label={classification.name} active={true}>
              <Icon name="x" />
            </SmarterMenuBadge>
          </div>
        {/each}
      </div>
    </div>
  </Collapse>
{/if}

<style>
  .filter-button-container {
    width: fit-content;
  }

  .filter-button-container :global(p) {
    margin-block-end: 0;
  }
</style>
