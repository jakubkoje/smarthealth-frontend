<template>
  <ClientOnly>
    <div ref="viewerContainer" class="h-full w-full"></div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Viewer } from "openseadragon";
import "openseadragon-select-plugin";

const props = defineProps({
  tileSource: String,
});

const viewerContainer = ref<HTMLElement | null>(null);
let viewer: Viewer | null = null;

onMounted(async () => {
  await nextTick(); // Wait for Vue to apply refs

  if (viewerContainer.value) {
    viewer = new Viewer({
      element: viewerContainer.value,
      tileSources: props.tileSource,
      showNavigator: true,
      showNavigationControl: true,
      zoomInButton: "zoom-in",
      zoomOutButton: "zoom-out",
      homeButton: "reset",
      fullPageButton: "full-screen",
    });

    const selection = viewer.selection({
      onSelection: (rect, shape) => {
        console.log("Selected area:", rect);
      },
      keep: true,
    });

    selection.enable();
  } else {
    console.error("Viewer container element is still null.");
  }
});

onBeforeUnmount(() => {
  if (viewer) {
    viewer.destroy();
    viewer = null;
  }
});
</script>
