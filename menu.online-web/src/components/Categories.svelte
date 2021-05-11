<script lang="ts">
  import { getCategories } from '../data/data.util';
  import Category from './Category.svelte';
  import type { Category as CategoryType } from '../data/model/category.interface';
  import { Row, Col } from 'sveltestrap';

  const categories: CategoryType[] = getCategories();
</script>

<Row cols={1}>
  {#each categories as category}
    <Col class="mb-1 mt-1">
      <Category {category} />
    </Col>
  {/each}
</Row>
