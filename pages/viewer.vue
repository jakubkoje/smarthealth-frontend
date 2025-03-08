<template>
  <ClientOnly
    ><ImageViewer
      tileSource="https://openseadragon.github.io/example-images/highsmith/highsmith.dzi"
    ></ImageViewer
  ></ClientOnly>
</template>

<script setup lang="ts">
// VUE DEFS (params, meta, events, ...)
definePageMeta({
  layout: "viewer",
  colorMode: "light",
});
</script>
