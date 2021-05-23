<script lang="ts">
  export let src: string;
  export let alt: string = '';
  export let click: (e) => void;

  let showImage = true;
</script>

{#if showImage}
  <img
    class={$$props.class}
    {src}
    {alt}
    on:click={click}
    on:error={() => (showImage = false)}
  />
{/if}
