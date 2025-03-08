<template>
  <div class="h-screen">
    <!-- Top Header -->
    <header
      class="flex h-16 items-center border-b border-primary-200 bg-primary-50 pl-5 pr-6"
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
            >KiNET Analyzer</a
          >
        </div>
      </div>

      <div class="flex items-center gap-4">
        <UButton
          icon="i-lucide-help-circle"
          color="primary"
          variant="ghost"
          class="rounded-full text-primary-700"
        />
        <UButton
          icon="i-lucide-user"
          color="primary"
          variant="ghost"
          to="/"
          class="rounded-full text-primary-700"
        />
      </div>
    </header>

    <div class="flex h-[calc(100vh-4rem)]">
      <!-- Side Toolbar -->
      <div
        class="z-20 flex w-16 flex-col items-center space-y-6 border-r border-primary-200 bg-primary-100 py-4"
      >
        <UTooltip
          v-for="item in tools"
          :text="item.tooltipText"
          :shortcuts="item.tooltipShortcuts"
        >
          <UButton
            class="rounded-lg p-2 text-primary-700 hover:bg-primary-200"
            :icon="item.iconName"
            variant="ghost"
            :id="item.id"
          >
          </UButton>
        </UTooltip>

        <UTooltip
          :text="viewerStore.eyeOpen ? 'Hide annotations' : 'Show annotations'"
        >
          <UButton
            :icon="viewerStore.eyeOpen ? 'i-lucide-eye' : 'i-lucide-eye-closed'"
            :class="[
              'rounded-lg p-2',
              viewerStore.eyeOpen
                ? 'text-primary-50 hover:bg-primary-400'
                : 'text-primary-700 hover:bg-primary-200',
            ]"
            :variant="viewerStore.eyeOpen ? 'solid' : 'ghost'"
            @click="viewerStore.toggleEyeOpen()"
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
            :icon="
              viewerStore.selectionClicked
                ? 'i-lucide-x'
                : 'i-lucide-square-dashed-mouse-pointer'
            "
            :class="[
              'rounded-lg p-2',
              viewerStore.selectionClicked
                ? 'text-primary-50 hover:bg-primary-400'
                : 'text-primary-700 hover:bg-primary-200',
            ]"
            :variant="viewerStore.selectionClicked ? 'solid' : 'ghost'"
            @click="viewerStore.toggleSelection()"
          >
          </UButton>
        </UTooltip>

        <div class="flex-grow"></div>
      </div>

      <!-- Main Content Area -->
      <div class="r m-2 flex flex-1 flex-col overflow-hidden">
        <!-- Page Content -->
        <main class="relative flex-1 overflow-auto bg-white">
          <slot></slot>
          <!-- Selection Info -->
          <Transition name="slide-up">
            <div
              v-if="viewerStore.selectionComplete"
              class="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center border-t border-t-primary-200 bg-primary-50 bg-opacity-80 p-4 shadow-lg"
            >
              <UButton class="" @click="isVisible = true"
                >Process patch</UButton
              >
            </div>
          </Transition>
        </main>
      </div>

      <!-- Right Side Toolbar -->
      <Transition name="slide-in-right">
        <!-- Statisics -->
        <div
          v-if="isVisible"
          class="sidebar z-20 flex w-fit max-w-80 flex-col items-center gap-8 space-y-6 border-l border-l-primary-200 bg-primary-50 p-4"
        >
          <p class="text-lg font-semibold text-primary-900">Statistics</p>

          <table
            class="w-full overflow-hidden rounded-lg border border-primary-200 shadow-md"
          >
            <thead class="bg-primary-100 text-primary-800">
              <tr>
                <th class="border-b px-4 py-2 text-left font-normal">
                  Category
                </th>
                <th class="border-b px-4 py-2 text-left font-normal">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in tableData"
                :key="index"
                class="border-b bg-white last:border-0 hover:bg-gray-100"
              >
                <td class="px-4 py-2">{{ row.category }}</td>
                <td class="px-4 py-2">{{ row.value }}</td>
              </tr>
            </tbody>
          </table>

          <div class="aspect-square h-64 w-64">
            <p class="text-center text-primary-800">Cell Percentage</p>
            <PieChartComponent
              :chartData="chartData"
              :chartOptions="chartOptions"
            ></PieChartComponent>
          </div>

          <div class="flex-grow"></div>
        </div>
      </Transition>

      <!-- Chat -->
      <Transition name="slide-in-right"><div></div></Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
const viewerStore = useViewerStore();
const isVisible = ref(true);

const chartData = ref({
  labels: ["Positive", "Negative"],
  datasets: [
    {
      label: "Percentage",
      data: [30, 70],
      backgroundColor: ["#FF6384", "#36A2EB"],
    },
  ],
});

const tableData = ref([
  { category: "Positive Number", value: "30" },
  { category: "Negative Number", value: "50" },
  { category: "Total", value: "100" },
  { category: "Ki-67 index", value: "4.67" },
]);

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

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

.slide-in-right-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-in-right-enter-from {
  transform: translateX(100%);
}

.slide-in-right-enter-to {
  transform: translateX(0);
}

.slide-in-right-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-in-right-leave-from {
  transform: translateX(0);
}

.slide-in-right-leave-to {
  transform: translateX(100%);
}
</style>
