<template>
  <ClientOnly><ImageViewer :tileSource="file"></ImageViewer></ClientOnly>
</template>

<script setup lang="ts">
// VUE DEFS (params, meta, events, ...)
definePageMeta({
  layout: "viewer",
  colorMode: "light",
});

const file =
  "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif";
</script>
