<template>
  <div ref="viewerContainer" class="h-full w-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import OpenSeadragon, { Viewer } from "openseadragon";
import "openseadragon-select-plugin";
import { ShapeNames } from "openseadragon-select-plugin";
import { enableGeoTIFFTileSource } from "geotiff-tilesource";
import { createOSDAnnotator } from "@annotorious/openseadragon";
// Import essential CSS styles
import "@annotorious/openseadragon/annotorious-openseadragon.css";

enableGeoTIFFTileSource(OpenSeadragon);

const props = defineProps({
  tileSource: String,
});

const viewerContainer = ref<HTMLElement | null>(null);
const viewerStore = useViewerStore();

let viewer: Viewer | null = null;
let selection: any = null;
let anno: any = null;

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
      tileSources: {
        type: "image",
        url: "http://0.0.0.0:7030/ikem_api/images/view/cropped.png",
        crossOriginPolicy: "Anonymous",
        ajaxWithCredentials: false,
      },
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

    // Initialize the Annotorious plugin
    anno = createOSDAnnotator(viewer);

    anno.setStyle((annotation, state) => {
      const positiveValue = annotation.bodies.find(
        (body) => body.positive,
      )?.positive;

      // Determine the color based on the 'positive' value
      const color = positiveValue === "yes" ? "#ff0000" : "#00ff00";

      return {
        fill: color,
        stroke: color,
        opacity: 0.2,
        strokeOpacity: 1,
      };
    });
  } else {
    console.log("Error");
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
      viewer.selectionHandler.frontCanvas.drawer.drawerActiveShape =
        viewerStore.currentShape;
      console.log(viewer.selectionHandler.frontCanvas.drawer.drawerActiveShape);
    } else {
      selection.disable();
      viewer?.selectionHandler.clear();
      viewerStore.setSelectionComplete(false);
    }
  },
);

// Watch for changes in seeAnno from the store
watch(
  () => viewerStore.eyeOpen,
  (newValue) => {
    if (newValue) {
      // Actions to perform when seeAnno is true
      // Load annotations in W3C WebAnnotation format
      anno.setAnnotations(viewerStore.annotations);
    } else {
      // Actions to perform when seeAnno is false
      // Load annotations in W3C WebAnnotation format
      anno.clearAnnotations();
    }
  },
);
</script>
