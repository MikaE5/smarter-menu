<script lang="ts">
  import ClickIcon from './ClickIcon.svelte';
  export let icon: string;
  export let counter: number | string;
  export let hideZero: boolean = true;
  export let size: 1 | 2 | 3 | 4 | 5 | 6 = 4;
  export let click: (e) => void;

  let counterText;

  let counterChanged = false;

  $: {
    if (typeof counter === 'number' && counter === 0 && hideZero) {
      counterText = '';
    } else {
      counterText = counter;
    }

    counterChanged = true;
    setTimeout(() => {
      counterChanged = false;
    }, 1000);
  }
</script>

<div class="d-flex">
  <span class="counter" class:highlight={counterChanged}>{counterText}</span>
  <ClickIcon {icon} {click} {size} highlight={counterChanged} />
</div>

<style>
  .counter {
    vertical-align: top;
    font-size: x-small;
    font-weight: bold;
  }

  .highlight {
    color: var(--smarter-menu-light-accent);
  }
</style>
