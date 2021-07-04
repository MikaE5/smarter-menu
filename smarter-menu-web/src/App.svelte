<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  import Customer from './components/customer/Customer.svelte';
  import type { PageConfig } from './data/model/page-config.interface';
  import { getBaseCustomerPath } from './util/routes.util';
  import pageConfigsJson from './page-configs.json';
  import SmarterMenuPage from './components/smarter-menu-page/SmarterMenuPage.svelte';
  import Imprint from './components/customer/Imprint.svelte';
  import DataPrivacy from './components/customer/DataPrivacy.svelte';
  import './app.css'

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
  <title>{title}</title>
</svelte:head>


  <Router>
    <Route path="/" primary={false}>
      <SmarterMenuPage></SmarterMenuPage>
    </Route>
    <Route path="/imprint" primary={false}>
      <Imprint></Imprint>
    </Route>
    <Route path="/privacy" primary={false}>
      <DataPrivacy></DataPrivacy>
    </Route>
  
    {#each pageConfigs as config}
      <Route path={getBaseCustomerPath(config.customer_id) + '/*'} primary={false}
        ><Customer pageConfig={config} /></Route
      >
    {/each}
  </Router>

