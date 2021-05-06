<script lang="ts">
  import ClickIcon from './ClickIcon.svelte';
  export let icon: string;
  export let counter: number;
  export let click: (e) => void;

  let counterText;

  $: {
    counterText = counter > 0 ? counter : '';
  }
</script>

<div class="d-flex">
  <span class="counter">{counterText}</span>
  <ClickIcon {icon} {click} />
</div>

<style>
  .counter {
    vertical-align: top;
    font-size: x-small;
    font-weight: bold;
  }
</style>
