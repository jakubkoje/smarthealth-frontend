<template>
  <div class="relative flex h-screen">
    <!-- Selection Info -->
    <Transition name="slide-up">
      <div
        v-if="viewerStore.selectionComplete"
        class="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center border-t border-t-primary-200 bg-primary-50 bg-opacity-80 p-4 shadow-lg"
      >
        <UButton class="">Process patch</UButton>
      </div>
    </Transition>

    <!-- Side Toolbar -->
    <div
      class="z-20 flex w-16 flex-col items-center space-y-6 border-r border-primary-200 bg-primary-100 py-4"
    >
      <NuxtLink to="/" class="rounded-lg p-2 hover:bg-primary-200">
        <UIcon name="i-lucide-home" class="text-xl text-primary-700" />
      </NuxtLink>

      <UTooltip
        v-for="item in tools"
        :text="item.tooltipText"
        :shortcuts="item.tooltipShortcuts"
      >
        <UButton
          class="rounded-lg p-2 hover:bg-primary-200"
          :icon="item.iconName"
          variant="ghost"
          :id="item.id"
        >
        </UButton>
      </UTooltip>

      <UTooltip
        :text="
          viewerStore.selectionClicked
            ? 'Close selection'
            : 'Select region of interest'
        "
      >
        <UButton
          icon="i-lucide-square-dashed-mouse-pointer"
          class="rounded-lg p-2 hover:bg-primary-200"
          :variant="viewerStore.selectionClicked ? 'solid' : 'ghost'"
          @click="viewerStore.toggleSelection()"
        >
        </UButton>
      </UTooltip>

      <div class="flex-grow"></div>
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Top Header -->
      <header
        class="flex h-16 items-center border-b border-primary-200 bg-primary-50 px-6"
      >
        <div class="flex flex-1 items-center">
          <div class="flex items-center">
            <UIcon
              name="i-lucide-activity"
              class="mr-2 text-xl text-primary-800"
            />
            <a
              href="/"
              class="cursor-pointer text-lg font-medium text-primary-800 transition-colors hover:text-primary-600"
              >smartHealth</a
            >
          </div>
        </div>

        <div class="flex items-center gap-4">
          <UButton
            icon="i-lucide-help-circle"
            color="primary"
            variant="ghost"
            class="rounded-full"
          />
          <UButton
            icon="i-lucide-user"
            color="primary"
            variant="ghost"
            to="/"
            class="rounded-full"
          />
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto bg-white">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
const viewerStore = useViewerStore();

const tools = [
  {
    iconName: "i-lucide-refresh-ccw",
    tooltipText: "Refresh view",
    tooltipShortcuts: [],
    id: "reset",
  },
  {
    iconName: "i-lucide-zoom-in",
    tooltipText: "Zoom In",
    tooltipShortcuts: [],
    id: "zoom-in",
  },
  {
    iconName: "i-lucide-zoom-out",
    tooltipText: "Zoom Out",
    tooltipShortcuts: [],
    id: "zoom-out",
  },
  {
    iconName: "i-lucide-expand",
    tooltipText: "Full Screen",
    tooltipShortcuts: [],
    id: "full-screen",
  },
  {
    to: "",
    iconName: "i-lucide-message-circle-question",
    tooltipText: "Chat with AI",
    tooltipShortcuts: [],
  },
];
</script>

<style scoped>
/* Vue Transition - Slide Up */
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
