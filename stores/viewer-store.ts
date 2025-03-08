import { defineStore } from "pinia";

// ✅ Define Store
export const useViewerStore = defineStore("viewer", () => {
  // ✅ State
  const selectionClicked = ref(false);
  const selectionComplete = ref(false);
  const rect = ref<object | null>(null);

  // ✅ Getters (computed properties)

  // ✅ Actions (methods)
  function setSelection(newSelection: boolean) {
    selectionClicked.value = newSelection;
  }

  function toggleSelection() {
    selectionClicked.value = !selectionClicked.value;
  }

  function toggleSelectionComplete() {
    selectionComplete.value = !selectionComplete.value;
  }

  function setRect(newRect: object) {
    rect.value = newRect;
  }

  // ✅ Expose State, Getters, and Actions
  return {
    /** STATE */
    selectionClicked,
    selectionComplete,
    rect,

    /** GETTERS */

    /** ACTIONS */
    setSelection,
    toggleSelection,
    toggleSelectionComplete,
    setRect,
  };
});
