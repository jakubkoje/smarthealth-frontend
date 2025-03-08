<template>
  <ClientOnly>
    <div id="openseadragon-viewer" class="h-full w-full"></div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useViewerStore } from "~/stores/viewer";

const viewerStore = useViewerStore();

onMounted(() => {
  viewerStore.initializeViewer(
    "openseadragon-viewer",
    "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi",
  );
});
</script>
