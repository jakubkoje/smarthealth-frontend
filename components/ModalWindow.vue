<template>
  <UModal
    :modelValue="isOpen"
    @close="$emit('close')"
    :ui="{
      container: 'flex min-h-screen items-center justify-center',
      width: 'sm:max-w-lg',
      background: 'bg-white dark:bg-gray-900',
      padding: 'p-0',
    }"
  >
    <div class="w-full">
      <slot></slot>
    </div>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
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
