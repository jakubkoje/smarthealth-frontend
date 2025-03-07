<template>
  <div class="p-8">
    <div class="flex justify-center mb-12">
      <h1 class="text-3xl font-medium text-gray-800">Dashboard</h1>
    </div>
    
    <div class="max-w-6xl mx-auto">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-500 text-sm font-medium">Health Score</h3>
            <UIcon name="i-lucide-activity" class="text-blue-500" />
          </div>
          <div class="flex items-end">
            <span class="text-3xl font-semibold text-gray-800">87</span>
            <span class="text-green-500 text-sm ml-2">+3%</span>
          </div>
          <div class="mt-2 text-sm text-gray-500">Last updated: Today</div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-500 text-sm font-medium">Appointments</h3>
            <UIcon name="i-lucide-calendar" class="text-purple-500" />
          </div>
          <div class="flex items-end">
            <span class="text-3xl font-semibold text-gray-800">2</span>
            <span class="text-gray-500 text-sm ml-2">This week</span>
          </div>
          <div class="mt-2 text-sm text-gray-500">Next: Tomorrow, 10:00 AM</div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-500 text-sm font-medium">Medications</h3>
            <UIcon name="i-lucide-pill" class="text-green-500" />
          </div>
          <div class="flex items-end">
            <span class="text-3xl font-semibold text-gray-800">3</span>
            <span class="text-gray-500 text-sm ml-2">Active</span>
          </div>
          <div class="mt-2 text-sm text-gray-500">Next dose: Today, 8:00 PM</div>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-medium text-gray-800">Recent Activity</h2>
          <UButton size="sm" variant="ghost" to="#">View all</UButton>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="bg-blue-100 p-2 rounded-lg mr-4">
              <UIcon name="i-lucide-heart-pulse" class="text-blue-500" />
            </div>
            <div>
              <h4 class="font-medium text-gray-800">Blood pressure reading</h4>
              <p class="text-sm text-gray-500">120/80 mmHg - Normal range</p>
              <p class="text-xs text-gray-400 mt-1">Today, 9:30 AM</p>
            </div>
          </div>
          
          <div class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="bg-purple-100 p-2 rounded-lg mr-4">
              <UIcon name="i-lucide-stethoscope" class="text-purple-500" />
            </div>
            <div>
              <h4 class="font-medium text-gray-800">Doctor appointment</h4>
              <p class="text-sm text-gray-500">Dr. Smith - General checkup</p>
              <p class="text-xs text-gray-400 mt-1">Yesterday, 2:00 PM</p>
            </div>
          </div>
          
          <div class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="bg-green-100 p-2 rounded-lg mr-4">
              <UIcon name="i-lucide-clipboard-list" class="text-green-500" />
            </div>
            <div>
              <h4 class="font-medium text-gray-800">Lab results updated</h4>
              <p class="text-sm text-gray-500">Blood test results available</p>
              <p class="text-xs text-gray-400 mt-1">2 days ago</p>
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