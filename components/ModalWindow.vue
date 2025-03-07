<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-30 flex items-center justify-center bg-slate-600 bg-opacity-50 px-24 py-12"
        @click.self="closeModal"
      >
        <!-- Modal Content -->
        <div
          class="relative h-full w-full rounded-lg border border-slate-300 bg-white p-8 pt-10 shadow-lg"
        >
          <button
            @click="closeModal"
            class="absolute right-1 top-1 rotate-45 rounded-full px-1 py-1 text-slate-600 transition-colors hover:text-red-500"
          >
            <IconPlus></IconPlus>
          </button>
          <div
            class="h-full max-h-[calc(100dvh-6rem)] w-full overflow-y-scroll px-2"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
