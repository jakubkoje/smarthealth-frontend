<template>
  <div ref="viewerContainer" class="h-full w-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Viewer } from "openseadragon";
import "openseadragon-select-plugin";

const props = defineProps({
  tileSource: String,
});

const viewerContainer = ref<HTMLElement | null>(null);
const viewerStore = useViewerStore();

let viewer: Viewer | null = null;
let selection: any = null;

onMounted(() => {
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

    selection = viewer.selection({
      onSelection: (rect, shape) => {
        // send rect here
        viewerStore.setRect(rect);
        viewerStore.setSelectionComplete(true);
        console.table(viewerStore.rect);
      },
      keep: true,
    });
  } else {
    console.error("Viewer container element is null.");
  }
});

onBeforeUnmount(() => {
  if (viewer) {
    viewer.destroy();
    viewer = null;
  }
});

// Watch for changes in selectionClicked from the store
watch(
  () => viewerStore.selectionClicked,
  (newValue) => {
    if (!selection) return;
    if (newValue) {
      selection.enable();
    } else {
      selection.disable();
      viewer?.selectionHandler.clear();
      viewerStore.setSelectionComplete(false);
    }
  },
);
</script>
