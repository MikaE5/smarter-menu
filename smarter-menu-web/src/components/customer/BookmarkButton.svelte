<script lang="ts">
  import { homePathStore } from '../../stores/page-config.stores';
import ButtonLink from './shared/ButtonLink.svelte';
</script>


<div class="d-flex w-100 justify-content-center mt-2 mb-2">
  <ButtonLink to={$homePathStore + '/bookmarks'} label={'Zur Merkliste'}></ButtonLink>
</div>

