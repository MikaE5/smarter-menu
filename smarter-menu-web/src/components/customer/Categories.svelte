<script lang="ts">
  import { getCategoriesByType } from '../../data/data';
  import Category from './Category.svelte';
  import type { Category as ICategory } from '../../data/model/category.interface';
  import { Row, Col } from 'sveltestrap';
  import { CategoryType } from '../../data/model/category-type.enum';
import BookmarkButton from './BookmarkButton.svelte';

  const categories$: Promise<ICategory[]> = getCategoriesByType(
    CategoryType.C1
  );
</script>

{#await categories$ then categories}
  <Row cols={1}>
    {#each categories as category}
      <Col>
        <div class="mb-1 mt-1">
          <Category {category} />
        </div>
      </Col>
    {/each}
  </Row>
{/await}
<BookmarkButton></BookmarkButton>
