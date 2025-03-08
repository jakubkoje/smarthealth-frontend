<template>
  <div class="flex h-screen">
    <!-- Side Toolbar -->
    <div
      class="border-primary-200 bg-primary-100 flex w-16 flex-col items-center space-y-6 border-r py-4"
    >
      <NuxtLink to="/" class="hover:bg-primary-200 rounded-lg p-2">
        <UIcon name="i-lucide-home" class="text-primary-700 text-xl" />
      </NuxtLink>

      <UTooltip
        v-for="item in tools"
        :text="item.tooltipText"
        :shortcuts="item.tooltipShortcuts"
      >
        <UButton
          class="hover:bg-primary-200 rounded-lg p-2"
          :icon="item.iconName"
          variant="ghost"
          :id="item.id"
        >
        </UButton>
      </UTooltip>

      <UButton class="hover:bg-primary-200 rounded-lg p-2" variant="ghost">
        Area
      </UButton>

      <div class="flex-grow"></div>
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Top Header -->
      <header
        class="border-primary-200 bg-primary-50 flex h-16 items-center border-b px-6"
      >
        <div class="flex flex-1 items-center">
          <div class="flex items-center">
            <UIcon
              name="i-lucide-activity"
              class="text-primary-800 mr-2 text-xl"
            />
             <a href="/" class="text-primary-800 text-lg font-medium hover:text-primary-600 transition-colors cursor-pointer">smartHealth</a>
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

const tools = [
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
    iconName: "i-lucide-camera",
    tooltipText: "Snapshot area",
    tooltipShortcuts: [],
    id: "",
  },
  {
    iconName: "i-lucide-expand",
    tooltipText: "Full Screen",
    tooltipShortcuts: [],
    id: "full-screen",
  },
  {
    to: "",
    iconName: "i-lucide-square-dashed-mouse-pointer",
    tooltipText: "Select area for analysis",
    tooltipShortcuts: [],
  },
  {
    to: "",
    iconName: "i-lucide-message-circle-question",
    tooltipText: "Chat with AI",
    tooltipShortcuts: [],
  },
];
</script>
