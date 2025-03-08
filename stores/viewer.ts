import { defineStore } from "pinia";

export const useViewerStore = defineStore("viewer", () => {
  const viewer = ref<any>(null);

  const initializeViewer = async (viewerId: string, tileSource: string) => {
    if (import.meta.server) return; // Prevent execution on the server

    const OpenSeadragon = (await import("openseadragon")).default;

    viewer.value = OpenSeadragon({
      element: document.getElementById(viewerId) as HTMLElement,
      tileSources: tileSource,
      showNavigator: true,
      showNavigationControl: true, // Hide default OpenSeadragon UI
      zoomInButton: "zoom-in", // Bind custom Zoom In button
      zoomOutButton: "zoom-out", // Bind custom Zoom Out button
      homeButton: "reset", // Bind custom Reset button
      fullPageButton: "full-screen", // Bind custom Fullscreen button
    });
  };

  return {
    /** STATE */
    viewer,

    /** ACTIONS */
    initializeViewer,
  };
});
