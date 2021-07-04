<script lang="ts">
  import { onDestroy } from 'svelte';

  import { Route } from 'svelte-navigator';
  import {
    deleteOldLocalStorageVersions,
    removeAllBookmarkSubscriptions,
    setBookmarkCustomer,
  } from '../../bookmarks/bookmarks';
  import Bookmarks from './Bookmarks.svelte';
  import Categories from './Categories.svelte';
  import Header from './Header.svelte';
  import HomeBreadCrumb from './HomeBreadCrumb.svelte';
  import MenuItems from './MenuItems.svelte';
  import DataPrivacy from './DataPrivacy.svelte';
  import Footer from './Footer.svelte';
  import { getRouteToCategory } from './util/category.util';
  import {
    getCategoriesByType,
    getCategoryNameForId,
    removeDataCustomer,
    setDataCustomer,
  } from '../../data/data';
  import { CategoryType } from '../../data/model/category-type.enum';
  import type { PageConfig } from '../../data/model/page-config.interface';
  import { getBaseCustomerPath } from '../../util/routes.util';
  import Imprint from './Imprint.svelte';
  import { homePathStore, pageConfigStore } from '../../stores/page-config.stores';

  export let pageConfig: PageConfig;


  $: setBookmarkCustomer(pageConfig.customer_id);
  $: setDataCustomer(pageConfig.customer_id);
  $: homePathStore.set(getBaseCustomerPath(pageConfig.customer_id))
  $: pageConfigStore.set(pageConfig);

  // get first level categories
  let navItems: Array<{ title: string; route: string }> = [];

  $: getCategoriesByType(CategoryType.C1)
    .then((categories) =>
      categories.map((category) => {
        return {
          title: category.name,
          route: getRouteToCategory(category.id),
        };
      })
    )
    .then((items) => (navItems = items));

  const bookmarksTitle = pageConfig.page_content.bookmarks.title;
  const dataPrivacy = pageConfig.page_content.footer.data_privacy;
  const imprint = pageConfig.page_content.footer.imprint;

  setTimeout(() => {
    deleteOldLocalStorageVersions();
  }, 500);

  onDestroy(() => {
    removeDataCustomer();
    removeAllBookmarkSubscriptions();
  });
</script>

<svelte:head>
  <link rel="stylesheet" href={$pageConfigStore.style.theme_url} />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
  />
  <title>{$pageConfigStore.page_content.header.title}</title>
</svelte:head>

<div class="d-flex flex-column min-vh-100">
  <header>
    <Header {navItems}/>
  </header>
  <main class="flex-grow-1">
    <Route path="/" primary={false}>
      <Categories />
    </Route>
    <Route path="category/:category" primary={false} let:params>
      <HomeBreadCrumb
        activeItem$={getCategoryNameForId(decodeURIComponent(params.category))}
      />
      <MenuItems
        categoryId={decodeURIComponent(params.category)}
      />
    </Route>
    <Route path="bookmarks" primary={false}>
      <HomeBreadCrumb
        activeItem$={Promise.resolve(bookmarksTitle)}
      />
      <Bookmarks/>
    </Route>
    <Route path="privacy">
      <HomeBreadCrumb
        activeItem$={Promise.resolve(dataPrivacy)}
      />
      <DataPrivacy />
    </Route>
    <Route path="imprint">
      <HomeBreadCrumb
        activeItem$={Promise.resolve(imprint)}
      />
      <Imprint />
    </Route>
  </main>
  <footer><Footer /></footer>
</div>
