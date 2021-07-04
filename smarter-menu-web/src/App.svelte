<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  import Customer from './components/customer/Customer.svelte';
  import type { PageConfig } from './data/model/page-config.interface';
  import { getBaseCustomerPath } from './util/routes.util';
  import DummyLink from './components/DummyLink.svelte';
  import pageConfigsJson from './page-configs.json';

  const pageConfigs: PageConfig[] = pageConfigsJson as any;

  const smarterMenuConfig = pageConfigs.find(
    (config) => config.customer_id === 'smarter-menu'
  );

  const title = smarterMenuConfig.page_content.header.title;
</script>

<svelte:head>
  <link rel="stylesheet" href={smarterMenuConfig.style.theme_url} />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
  />
  <link
    rel="stylesheet"
    href="./app.css"
  />
  <title>{title}</title>
</svelte:head>


  <Router>
    <Route path="/" primary={false}>
      <DummyLink />
    </Route>
  
    {#each pageConfigs as config}
      <Route path={getBaseCustomerPath(config.customer_id) + '/*'} primary={false}
        ><Customer pageConfig={config} /></Route
      >
    {/each}
  </Router>

