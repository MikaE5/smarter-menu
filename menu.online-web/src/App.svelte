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
  import { getCategoriesByType, getCategoryNameForId } from './data/data.util';
  import pageContent from './data/menu-data/page-content.json';
  import { CategoryType } from './data/model/category-type.enum';

  // get first level categories
  const navItems: Array<{ title: string; route: string }> = getCategoriesByType(
    CategoryType.C1
  ).map((category) => {
    return {
      title: category.name,
      route: getRouteToCategory(category.id),
    };
  });
  const title = pageContent.header.title;
  const emptyItemsMessage = pageContent.bookmarks.noItems;
  const bookmarksTitle = pageContent.bookmarks.title;
  const { slogan, dataPrivacy } = pageContent['footer'];
  const homeBreadCrumb = pageContent['categories'].homeBreadCrumb;
  const allergensLabel = pageContent.menuItems.allergens;

  setTimeout(() => {
    deleteOldLocalStorageVersions();
  }, 500);

  onDestroy(() => {
    removeAllBookmarkSubscriptions();
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
  />
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
          activeItem={getCategoryNameForId(decodeURIComponent(params.category))}
        />
        <MenuItems
          {allergensLabel}
          categoryId={decodeURIComponent(params.category)}
        />
      </Route>
      <Route path="/bookmarks" primary={false}>
        <HomeBreadCrumb {homeBreadCrumb} activeItem={bookmarksTitle} />
        <Bookmarks {emptyItemsMessage} />
      </Route>
      <Route path="/privacy">
        <HomeBreadCrumb {homeBreadCrumb} activeItem={dataPrivacy} />
        <DataPrivacy />
      </Route>
    </main>
    <footer><Footer {slogan} {dataPrivacy} /></footer>
  </div>
</Router>
