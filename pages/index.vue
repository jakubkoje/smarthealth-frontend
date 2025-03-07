<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-2/3">
          <h1 class="text-2xl font-semibold text-gray-800 mb-4">smartHealth Platform</h1>
          
          <p class="text-gray-600 mb-6">
            Upload event details and easily view them in your browser. Annotate events and
            collaborate with other users. Use our platform for event planning and management support.
          </p>
          
          <a href="#" class="text-blue-500 hover:underline">Learn more</a>
          
          <div class="mt-12">
            <h2 class="text-xl font-medium text-gray-800 mb-4">See it in action:</h2>
            
            <div class="grid grid-cols-3 gap-4">
              <div class="border rounded-lg p-4 flex flex-col items-center">
                <div class="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <UIcon name="i-lucide-calendar" class="text-blue-500 text-2xl" />
                </div>
                <span class="text-sm text-gray-700">Events</span>
              </div>
              
              <div class="border rounded-lg p-4 flex flex-col items-center">
                <div class="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <UIcon name="i-lucide-users" class="text-purple-500 text-2xl" />
                </div>
                <span class="text-sm text-gray-700">Community</span>
              </div>
              
              <div class="border rounded-lg p-4 flex flex-col items-center">
                <div class="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <UIcon name="i-lucide-map" class="text-green-500 text-2xl" />
                </div>
                <span class="text-sm text-gray-700">Locations</span>
              </div>
            </div>
            
            <div class="mt-4 flex items-center">
              <div class="h-1 bg-gray-200 flex-grow rounded-full">
                <div class="h-1 bg-blue-500 w-1/3 rounded-full"></div>
              </div>
              <UIcon name="i-lucide-chevron-right" class="text-gray-400 ml-2" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>
  