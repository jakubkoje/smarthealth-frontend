<template>
  <div class="p-8">
    <div class="flex justify-center mb-12">
      <h1 class="text-3xl font-medium text-gray-800">Home Page</h1>
    </div>
    
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <div class="flex flex-col gap-8">
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">smartHealth Platform</h2>
          
          <p class="text-gray-600 mb-6">
            Upload medical data and easily view them in your browser. Analyze health metrics and
            collaborate with healthcare professionals. Use our platform for comprehensive health monitoring and management.
          </p>
          
          <a href="#" class="text-blue-500 hover:underline">Learn more</a>
        </div>
        
        <div>
          <h2 class="text-xl font-medium text-gray-800 mb-4">Key Features:</h2>
          
          <div class="grid grid-cols-3 gap-4">
            <div class="border rounded-lg p-4 flex flex-col items-center">
              <div class="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <UIcon name="i-lucide-heart-pulse" class="text-blue-500 text-2xl" />
              </div>
              <span class="text-sm text-gray-700">Health Monitoring</span>
            </div>
            
            <div class="border rounded-lg p-4 flex flex-col items-center">
              <div class="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <UIcon name="i-lucide-stethoscope" class="text-purple-500 text-2xl" />
              </div>
              <span class="text-sm text-gray-700">Medical Analysis</span>
            </div>
            
            <div class="border rounded-lg p-4 flex flex-col items-center">
              <div class="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <UIcon name="i-lucide-clipboard-list" class="text-green-500 text-2xl" />
              </div>
              <span class="text-sm text-gray-700">Health Records</span>
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
  