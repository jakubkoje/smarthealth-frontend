import { defineStore } from "pinia";

// ✅ Define Store
export const useViewerStore = defineStore("viewer", () => {
  // ✅ State
  const selectionClicked = ref(false);
  const selectionComplete = ref(false);
  const eyeOpen = ref(false);
  const rect = ref<object | null>(null);

  // ✅ Getters (computed properties)

  // ✅ Actions (methods)
  function setSelection(newSelection: boolean) {
    selectionClicked.value = newSelection;
  }

  function toggleSelection() {
    selectionClicked.value = !selectionClicked.value;
  }

  function toggleEyeOpen() {
    eyeOpen.value = !eyeOpen.value;
  }

  function setSelectionComplete(val: boolean) {
    selectionComplete.value = val;
  }

  function setEyeOpen(val: boolean) {
    eyeOpen.value = val;
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
    eyeOpen,

    /** GETTERS */

    /** ACTIONS */
    setSelection,
    toggleSelection,
    toggleEyeOpen,
    setSelectionComplete,
    setEyeOpen,
    setRect,
  };
});
