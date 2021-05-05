<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Bookmarks from './components/Bookmarks.svelte';
  import Categories from './components/Categories.svelte';
  import DataPrivacy from './components/DataPrivacy.svelte';
  import Footer from './components/Footer.svelte';
  import Header from './components/Header.svelte';
  import MenuItems from './components/MenuItems.svelte';
  import { getRouteToCategory } from './components/util/category.util';
  import { getCategories } from './data/data.util';
  import pageContent from './data/page-content.json';

  const navItems: Array<{ title: string; route: string }> = getCategories().map(
    (category) => {
      return {
        title: category.name,
        route: getRouteToCategory(category.id),
      };
    }
  );
  const title = pageContent.header.title;
  const emptyItemsMessage = pageContent.bookmarks.noItems;
  const { slogan, dataPrivacy } = pageContent['footer'];
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
      <Route path="/">
        <Categories />
      </Route>
      <Route path="category/:category" primary={false} let:params>
        <MenuItems categoryId={decodeURIComponent(params.category)} />
      </Route>
      <Route path="/bookmarks">
        <Bookmarks {emptyItemsMessage} />
      </Route>
      <Route path="/privacy">
        <DataPrivacy />
      </Route>
    </main>
    <footer><Footer {slogan} {dataPrivacy} /></footer>
  </div>
</Router>
