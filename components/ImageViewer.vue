<template>
  <div ref="viewerContainer" class="h-full w-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import OpenSeadragon, { Viewer } from "openseadragon";
import "openseadragon-select-plugin";
import { enableGeoTIFFTileSource } from "geotiff-tilesource";

const sampleGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [102.0, 0.5] },
      properties: { prop0: "value0" },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
          [105.0, 1.0],
        ],
      },
      properties: {
        prop0: "value0",
        prop1: 0.0,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0],
          ],
        ],
      },
      properties: {
        prop0: "value0",
        prop1: { this: "that" },
      },
    },
  ],
};

enableGeoTIFFTileSource(OpenSeadragon);

const props = defineProps({
  tileSource: String,
});

const viewerContainer = ref<HTMLElement | null>(null);
const viewerStore = useViewerStore();

let viewer: Viewer | null = null;
let selection: any = null;

onMounted(async () => {
  if (viewerContainer.value) {
    const tiffTileSources =
      await OpenSeadragon.GeoTIFFTileSource.getAllTileSources(
        props.tileSource,
        {
          logLatency: false,
        },
      );

    viewer = new Viewer({
      element: viewerContainer.value,
      crossOriginPolicy: "Anonymous",
      ajaxWithCredentials: true,
      tileSources: tiffTileSources,
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
