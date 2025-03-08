<template>
  <ClientOnly><ImageViewer></ImageViewer></ClientOnly>
</template>

<script setup lang="ts">
// VUE DEFS (params, meta, events, ...)
definePageMeta({
  layout: "viewer",
  colorMode: "light",
});
</script>
