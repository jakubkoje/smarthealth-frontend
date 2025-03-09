<template>
  <div class="h-screen">
    <!-- Top Header -->
    <header
      class="flex h-16 items-center border-b border-primary-400 bg-primary-200 pl-5 pr-6"
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
        class="z-20 flex w-16 flex-col items-center space-y-6 border-r border-primary-400 bg-primary-100 py-4"
      >
        <UTooltip
          v-for="item in tools"
          :text="item.tooltipText"
          :shortcuts="item.tooltipShortcuts"
        >
          <UButton
            class="rounded-lg p-2 text-primary-700 hover:bg-primary-200"
            :class="{ 'bg-primary-300': item.id === 'chat-ai' && isChatOpen }"
            :icon="item.iconName"
            variant="ghost"
            :id="item.id"
            @click="item.id === 'chat-ai' ? toggleChat() : null"
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
                ? 'text-primary-200 hover:bg-primary-600'
                : 'text-primary-700 hover:bg-primary-200',
            ]"
            :variant="viewerStore.eyeOpen ? 'solid' : 'ghost'"
            @click="viewerStore.toggleEyeOpen()"
          >
          </UButton>
        </UTooltip>

        <UTooltip
          ><UDropdown
            :items="dropdownItems"
            mode="hover"
            :popper="{ placement: 'bottom-start' }"
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
                  ? 'text-primary-200 hover:bg-primary-600'
                  : 'text-primary-700 hover:bg-primary-200',
              ]"
              :variant="viewerStore.selectionClicked ? 'solid' : 'ghost'"
              @click="handleSelectionCancel"
            >
            </UButton>
          </UDropdown>
        </UTooltip>

        <div class="flex-grow"></div>
      </div>

      <!-- Main Content Area -->
      <div class="r m-2 flex flex-1 flex-col overflow-hidden">
        <!-- Page Content -->
        <main class="relative flex-1 overflow-auto bg-primary-900">
          <slot></slot>
          <!-- Selection Info -->
          <Transition name="slide-up">
            <div
              v-if="viewerStore.selectionComplete"
              class="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center border-t border-t-primary-400 bg-primary-200 bg-opacity-80 p-4 shadow-lg"
            >
              <UButton 
                :loading="isProcessing" 
                :color="isProcessed ? 'green' : 'primary'" 
                :icon="isProcessed ? 'i-heroicons-check' : undefined"
                class="" 
                @click="processPatch"
              >
                {{ buttonText }}
              </UButton>
            </div>
          </Transition>
        </main>
      </div>

      <!-- Right Side Toolbar -->
      <Transition name="slide-in-right">
        <!-- Statisics -->
        <div
          v-if="isVisible"
          class="sidebar z-20 flex w-fit max-w-80 flex-col items-center space-y-6 border-l border-l-primary-400 bg-primary-200 p-4"
        >
          <p class="text-lg font-semibold text-primary-900">Statistics</p>

          <div class="flex flex-col gap-4">
          <UFormGroup label="Color Threshold">
            <URange 
              v-model="colorRange" 
              :min="0" 
              :max="100" 
              :step="1"
            />
            <div class="text-xs text-gray-500 mt-1">
              Current value: {{ colorRange }}
            </div>
          </UFormGroup>

          <UFormGroup label="Cell Size">
            <URange 
              v-model="batchSize" 
              :min="0" 
              :max="100" 
              :step="5"
            />
            <div class="text-xs text-gray-500 mt-1">
              Current value: {{ batchSize }}
            </div>
          </UFormGroup>
        </div>

          <div class="w-full rounded-lg border border-primary-400">
            <table class="w-full overflow-hidden rounded-lg shadow-md">
              <thead class="bg-primary-100 text-primary-800">
                <tr class="border-b border-primary-400">
                  <th
                    class="border-r border-primary-400 px-4 py-2 text-left font-normal"
                  >
                    Category
                  </th>
                  <th class="px-4 py-2 text-left font-normal">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, index) in tableData"
                  :key="index"
                  class="border-b border-primary-300 bg-white last:border-none hover:bg-gray-100"
                >
                  <td class="border-r border-primary-400 px-4 py-2">
                    {{ row.category }}
                  </td>
                  <td class="px-4 py-2">{{ row.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="aspect-square h-48 w-48">
            <p class="text-center text-primary-800">Cell Percentage</p>
            <PieChartComponent
              :chartData="chartData"
              :chartOptions="chartOptions"
            ></PieChartComponent>
          </div>

          <div class="flex-grow"></div>
        </div>
      </Transition>
    </div>
    
    <!-- Chat Interface (Slides in from right) -->
    <Transition name="slide-in-right">
      <div v-if="isChatOpen" class="chat-container fixed top-4 bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden z-40">
        
        <!-- Chat input component -->
        <div class="p-2 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-2 mb-2">
            
            <!-- Send message input -->
            <div class="flex-grow flex gap-2">
              <UTextarea
                v-model="newMessage"
                placeholder="Type a message..."
                :rows="1"
                :ui="{
                  base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none',
                  rounded: 'rounded-md',
                  size: 'sm:text-sm',
                  shadow: 'shadow-sm',
                  padding: 'py-2 px-3',
                  ring: 'focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
                  background: 'bg-white dark:bg-gray-800',
                  placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
                }"
                class="flex-grow"
                @keydown.enter.prevent="sendMessage"
              />
              <UButton
                color="primary"
                icon="i-heroicons-paper-airplane"
                aria-label="Send message"
                :disabled="!newMessage.trim()"
                @click="sendMessage"
              />
            </div>
          </div>
          
          
        </div>

        <!-- Chat messages display area -->
        <div class="messages-container p-4 overflow-y-auto" ref="messagesContainer">
          <template v-if="messages.length > 0">
            <div 
              v-for="(message, index) in messages" 
              :key="index"
              :class="[
                'mb-4 max-w-3/4',
                message.isUser ? 'ml-auto' : 'mr-auto'
              ]"
            >
              <UCard
                :ui="{
                  base: 'overflow-hidden',
                  ring: '',
                  divide: 'divide-y divide-gray-200 dark:divide-gray-700',
                  background: message.isUser ? 'bg-primary-50 dark:bg-primary-900/20' : 'bg-gray-50 dark:bg-gray-800',
                  rounded: 'rounded-lg',
                  shadow: 'shadow-sm',
                  body: {
                    base: 'text-gray-700 dark:text-gray-200',
                    padding: 'px-4 py-3'
                  }
                }"
              >
                <div class="message-content">
                  {{ message.text }}
                </div>
                
                <template #footer>
                  <div class="flex justify-between items-center px-4 py-2 text-xs text-gray-500">
                    <span>{{ formatTime(message.timestamp) }}</span>
                    <div v-if="message.isUser" class="flex items-center">
                      <UIcon 
                        :name="message.status === 'sent' ? 'i-heroicons-check' : 'i-heroicons-clock'" 
                        class="w-4 h-4"
                      />
                    </div>
                  </div>
                </template>
              </UCard>
            </div>
          </template>
          
          <div v-else class="flex flex-col items-center justify-center h-64">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-12 h-12 text-gray-300 mb-2" />
            <p class="text-gray-500">No messages yet</p>
            <p class="text-sm text-gray-400">Start a conversation</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const viewerStore = useViewerStore();
const isVisible = ref(false);

const colorRange = ref(10);
const batchSize = ref(10);

const dropdownItems = [
  [
    {
      label: "Rectangle",
      icon: "i-lucide-square-dashed",
      click: () => {
        viewerStore.setCurrentShape("RectShape");
        viewerStore.toggleSelection();
      },
    },
    {
      label: "Polygon",
      icon: "i-lucide-triangle-dashed",
      click: () => {
        viewerStore.setCurrentShape("PolygonShape");
        viewerStore.toggleSelection();
      },
    },
    {
      label: "Pencil",
      icon: "i-lucide-pencil",
      click: () => {
        viewerStore.setCurrentShape("BrushShape");
        viewerStore.toggleSelection();
      },
    },
  ],
];

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
    iconName: "i-lucide-message-circle-question",
    tooltipText: "Chat with AI",
    tooltipShortcuts: [],
    id: "chat-ai",
  },
];

const isProcessing = ref(false);
const isProcessed = ref(false);

const buttonText = ref("Process patch");

const processPatch = async () => {
  // Reset states
  isProcessing.value = true;
  isProcessed.value = false;
  
  // Call the predict_patch endpoint with the selected rectangle coordinates
  const response = await useFetch('http://0.0.0.0:7030/ikem_api/predict_patch', {
    method: 'POST',
    body: {
      rect: viewerStore.rect
    }
  });

  if (response.error.value) {
    console.error('Error predicting patch:', response.error.value);
    isProcessing.value = false;
    return;
  }

  console.log('Prediction response:', response.data.value);

  // Store task ID
  const taskId = response.data.value.task_id;
  
  // Create interval for polling and store the interval ID so we can clear it later
  const statusInterval = setInterval(async () => {
    try {
      const statusResponse = await useFetch(`http://0.0.0.0:7030/ikem_api/get_status/${taskId}`, {
        method: 'GET'
      });

      if (statusResponse.error.value) {
        console.error('Error checking task status:', statusResponse.error.value);
        clearInterval(statusInterval); // Stop polling on error
        isProcessing.value = false;
        return;
      }

      console.log('Task status response:', statusResponse.data.value);
      const status = statusResponse.data.value.status.toLowerCase();
      console.log('Task status:', status);

      if (status === 'success' || status === 'completed') {
        console.log('Prediction completed:', statusResponse.data.value);
        
        // Update UI with results
        if (statusResponse.data.value.result) {
          const result = statusResponse.data.value.result;
          // Update chart data and table data with the results
          updateResultsDisplay(result);
        }
        
        // Stop polling once completed
        clearInterval(statusInterval);
        
        // Show the statistics sidebar
        isVisible.value = true;
        
        // Update button states
        isProcessing.value = false;
        isProcessed.value = true;
        
      } else if (status === 'failed') {
        console.error('Task failed:', statusResponse.data.value.error);
        clearInterval(statusInterval); // Stop polling on failure
        isProcessing.value = false;
      }
      // Continue polling for 'pending' or 'processing' status
    } catch (error) {
      console.error('Exception during status check:', error);
      clearInterval(statusInterval);
    }
  }, 1000); // Poll every second
}

// Function to update the UI with prediction results
const updateResultsDisplay = (result: any) => {
  // Update chart data
  chartData.value = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        label: "Percentage",
        data: [result.statistics.positive_cells, result.statistics.negative_cells],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  // Update table data
  tableData.value = [
    { category: "Positive Number", value: result.statistics.positive_cells.toString() },
    { category: "Negative Number", value: result.statistics.negative_cells.toString() },
    { category: "Total", value: result.statistics.total_cells.toString() },
    { category: "Ki-67 index", value: result.statistics.percentage.toFixed(2) },
    { category: "Grade", value: result.statistics.grading.toString() },
  ];

  console.log('Table data:', result.geojson);
  viewerStore.setAnnotations(convertGeoJSONToAnnotations(result.geojson));
  viewerStore.setEyeOpen(true);
}

const messages = ref([]);

// Function to convert GeoJSON to custom annotation format
function convertGeoJSONToAnnotations(geoJSON: any) {
  if (typeof geoJSON === 'string') {
    geoJSON = JSON.parse(geoJSON);
  }
  
  return geoJSON.features.map(feature => {
    // Generate a random UUID for the annotation ID
    const id = crypto.randomUUID();
    
    // Determine if positive or negative based on classification name
    const isPositive = feature.properties.classification.name === "positive";
    
    // Extract coordinates from the GeoJSON
    const coordinates = feature.geometry.coordinates[0];
    
    // Calculate bounds
    const xCoords = coordinates.map(point => point[0]);
    const yCoords = coordinates.map(point => point[1]);
    
    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);
    
    // Format points for polygon
    const points = coordinates.map(point => [point[0], point[1]]);
    
    return {
      id: feature.id || id,
      bodies: [
        {
          positive: isPositive ? "yes" : "no",
        },
      ],
      target: {
        selector: {
          type: feature.geometry.type.toUpperCase(),
          geometry: {
            bounds: {
              minX,
              minY,
              maxX,
              maxY,
            },
            // For polygons, include points
            ...(feature.geometry.type.toUpperCase() === "POLYGON" && { points }),
            // For rectangles, include x, y, w, h
            ...(feature.geometry.type.toUpperCase() === "RECTANGLE" && {
              x: minX,
              y: minY,
              w: maxX - minX,
              h: maxY - minY,
            }),
          },
        },
      },
    };
  });
}

const handleNewMessage = (message) => {
  messages.value.push({
    id: Date.now(),
    text: message,
    sender: 'user',
    timestamp: new Date()
  });
  
  // Here you would typically handle the message,
  // perhaps sending it to an API and then displaying a response
};

// State for the chat visibility
const isChatOpen = ref(false);

// State for the collapsible menu
const isMenuOpen = ref(false);

// State for the new message input
const newMessage = ref('');

// Reference to the messages container for scrolling
const messagesContainer = ref(null);

// Toggle chat visibility
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  
  // If opening the chat, scroll to the bottom of messages
  if (isChatOpen.value) {
    nextTick(() => {
      scrollToBottom();
    });
  }
};

// Function to send a new message
const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  // Add user message
  messages.value.push({
    id: Date.now(),
    text: newMessage.value,
    timestamp: new Date(),
    isUser: true,
    status: 'sent'
  });
  
  // Clear input
  newMessage.value = '';
  
  // Scroll to bottom
  nextTick(() => {
    scrollToBottom();
  });
  
  // Simulate AI response (you would typically call your API here)
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      text: "I'm processing your request. I'll get back to you shortly.",
      timestamp: new Date(),
      isUser: false,
      status: 'sent'
    });
    
    // Scroll to bottom again after AI response
    nextTick(() => {
      scrollToBottom();
    });
  }, 1000);
};

// Function to scroll to the bottom of the messages container
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Function to format timestamp
const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(timestamp);
};

// Function to insert template text
const insertTemplate = (text) => {
  newMessage.value = text;
  // Focus the textarea
  nextTick(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.focus();
    }
  });
};

// Scroll to bottom on initial mount if chat is open
onMounted(() => {
  if (isChatOpen.value) {
    scrollToBottom();
  }
});

// Add this function to handle selection cancellation
const handleSelectionCancel = () => {
  // Call the original function to cancel selection
  viewerStore.setSelection(false);
  
  // Reset the process patch button state
  isProcessing.value = false;
  isProcessed.value = false;
  buttonText.value = "Process patch";
};
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

.chat-container {
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

/* Animation for the collapse transition */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
