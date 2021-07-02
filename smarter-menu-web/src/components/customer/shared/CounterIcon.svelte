<script lang="ts">
  import ClickIcon from './ClickIcon.svelte';
  export let icon: string;
  export let counter: number | string;
  export let hideZero: boolean = true;
  export let size: 1 | 2 | 3 | 4 | 5 | 6 = 4;
  export let click: (e) => void;

  let counterText;

  $: {
    if (typeof counter === 'number' && counter === 0 && hideZero) {
      counterText = '';
    } else {
      counterText = counter;
    }
  }
</script>

<div class="d-flex">
  <span class="counter">{counterText}</span>
  <ClickIcon {icon} {click} {size}/>
</div>

<style>
  .counter {
    vertical-align: top;
    font-size: x-small;
    font-weight: bold;
  }
</style>
