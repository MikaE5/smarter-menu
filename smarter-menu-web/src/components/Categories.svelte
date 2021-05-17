<script lang="ts">
  import { getCategoriesByType } from '../data/data.util';
  import Category from './Category.svelte';
  import type { Category as ICategory } from '../data/model/category.interface';
  import { Row, Col } from 'sveltestrap';
  import { CategoryType } from '../data/model/category-type.enum';

  const categories: ICategory[] = getCategoriesByType(CategoryType.C1);
</script>

<Row cols={1}>
  {#each categories as category}
    <Col>
      <div class="mb-1 mt-1">
        <Category {category} />
      </div>
    </Col>
  {/each}
</Row>
