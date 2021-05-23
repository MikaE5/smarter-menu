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
  } from '../../data/data.util';
  import { CategoryType } from '../../data/model/category-type.enum';
  import type { PageConfig } from '../../data/model/page-config.interface';
  import { getBaseCustomerPath } from '../../util/routes.util';

  export let pageConfig: PageConfig;

  let homePath: string;

  $: setBookmarkCustomer(pageConfig.customer_id);
  $: setDataCustomer(pageConfig.customer_id);
  $: homePath = getBaseCustomerPath(pageConfig.customer_id);

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

  const title = pageConfig.page_content.header.title;
  const emptyItemsMessage = pageConfig.page_content.bookmarks.no_items;
  const bookmarksTitle = pageConfig.page_content.bookmarks.title;
  const slogan = pageConfig.page_content.footer.slogan;
  const dataPrivacy = pageConfig.page_content.footer.data_privacy;
  const homeBreadCrumb = pageConfig.page_content.categories.home_bread_crumb;
  const allergensLabel = pageConfig.page_content.menu_items.allergens;

  setTimeout(() => {
    deleteOldLocalStorageVersions();
  }, 500);

  onDestroy(() => {
    removeDataCustomer();
    removeAllBookmarkSubscriptions();
  });
</script>

<svelte:head>
  <link rel="stylesheet" href={pageConfig.style.theme_url} />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
  />
  <title>{title}</title>
</svelte:head>

<div class="d-flex flex-column min-vh-100">
  <header>
    <Header {navItems} {title} {homePath} />
  </header>
  <main class="flex-grow-1">
    <Route path="/" primary={false}>
      <Categories />
    </Route>
    <Route path="category/:category" primary={false} let:params>
      <HomeBreadCrumb
        {homeBreadCrumb}
        {homePath}
        activeItem$={getCategoryNameForId(decodeURIComponent(params.category))}
      />
      <MenuItems
        {allergensLabel}
        categoryId={decodeURIComponent(params.category)}
      />
    </Route>
    <Route path="bookmarks" primary={false}>
      <HomeBreadCrumb
        {homePath}
        {homeBreadCrumb}
        activeItem$={Promise.resolve(bookmarksTitle)}
      />
      <Bookmarks {emptyItemsMessage} />
    </Route>
    <Route path="privacy">
      <HomeBreadCrumb
        {homePath}
        {homeBreadCrumb}
        activeItem$={Promise.resolve(dataPrivacy)}
      />
      <DataPrivacy />
    </Route>
  </main>
  <footer><Footer {slogan} {dataPrivacy} /></footer>
</div>
