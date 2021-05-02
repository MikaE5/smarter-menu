<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Categories from './components/Categories.svelte';
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
  <main>
    <Route path="/">
      <Categories />
    </Route>
    <Route path="category/:category" let:params>
      <p>{decodeURIComponent(params.category)}</p>
    </Route>
  </main>
</Router>
