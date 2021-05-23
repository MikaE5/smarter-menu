<script lang="ts">
  import { onDestroy } from 'svelte';

  import { Router, Route } from 'svelte-navigator';
  import {
    deleteOldLocalStorageVersions,
    removeAllBookmarkSubscriptions,
  } from './bookmarks/bookmarks';
  import Bookmarks from './components/Bookmarks.svelte';
  import Categories from './components/Categories.svelte';
  import DataPrivacy from './components/DataPrivacy.svelte';
  import Footer from './components/Footer.svelte';
  import Header from './components/Header.svelte';
  import HomeBreadCrumb from './components/HomeBreadCrumb.svelte';
  import MenuItems from './components/MenuItems.svelte';
  import { getRouteToCategory } from './components/util/category.util';
  import {
    getCategoriesByType,
    getCategoryNameForId,
    getPageConfig,
  } from './data/data.util';
  import { CategoryType } from './data/model/category-type.enum';

  // get first level categories
  let navItems: Array<{ title: string; route: string }> = [];

  getCategoriesByType(CategoryType.C1)
    .then((categories) =>
      categories.map((category) => {
        return {
          title: category.name,
          route: getRouteToCategory(category.id),
        };
      })
    )
    .then((items) => (navItems = items));
  const pageConfig = getPageConfig();

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

<Router>
  <div class="d-flex flex-column min-vh-100">
    <header>
      <Header {navItems} {title} />
    </header>
    <main class="flex-grow-1">
      <Route path="/" primary={false}>
        <Categories />
      </Route>
      <Route path="category/:category" primary={false} let:params>
        <HomeBreadCrumb
          {homeBreadCrumb}
          activeItem$={getCategoryNameForId(
            decodeURIComponent(params.category)
          )}
        />
        <MenuItems
          {allergensLabel}
          categoryId={decodeURIComponent(params.category)}
        />
      </Route>
      <Route path="/bookmarks" primary={false}>
        <HomeBreadCrumb
          {homeBreadCrumb}
          activeItem$={Promise.resolve(bookmarksTitle)}
        />
        <Bookmarks {emptyItemsMessage} />
      </Route>
      <Route path="/privacy">
        <HomeBreadCrumb
          {homeBreadCrumb}
          activeItem$={Promise.resolve(dataPrivacy)}
        />
        <DataPrivacy />
      </Route>
    </main>
    <footer><Footer {slogan} {dataPrivacy} /></footer>
  </div>
</Router>
