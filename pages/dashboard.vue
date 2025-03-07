<template>
  <div class="p-8">
    <div class="mb-12 flex justify-center">
      <h1 class="text-3xl font-medium text-gray-800">Dashboard</h1>
    </div>

    <div class="mx-auto max-w-6xl">
      <!-- Stats Cards -->
      <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="rounded-xl bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Health Score</h3>
            <UIcon name="i-lucide-activity" class="text-blue-500" />
          </div>
          <div class="flex items-end">
            <span class="text-3xl font-semibold text-gray-800">87</span>
            <span class="ml-2 text-sm text-green-500">+3%</span>
          </div>
          <div class="mt-2 text-sm text-gray-500">Last updated: Today</div>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Appointments</h3>
            <UIcon name="i-lucide-calendar" class="text-purple-500" />
          </div>
          <div class="flex items-end">
            <span class="text-3xl font-semibold text-gray-800">2</span>
            <span class="ml-2 text-sm text-gray-500">This week</span>
          </div>
          <div class="mt-2 text-sm text-gray-500">Next: Tomorrow, 10:00 AM</div>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Medications</h3>
            <UIcon name="i-lucide-pill" class="text-green-500" />
          </div>
          <div class="flex items-end">
            <span class="text-3xl font-semibold text-gray-800">3</span>
            <span class="ml-2 text-sm text-gray-500">Active</span>
          </div>
          <div class="mt-2 text-sm text-gray-500">
            Next dose: Today, 8:00 PM
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl font-medium text-gray-800">Recent Activity</h2>
          <UButton size="sm" variant="ghost" to="#">View all</UButton>
        </div>

        <div class="space-y-4">
          <div
            class="flex items-start rounded-lg p-3 transition-colors hover:bg-gray-50"
          >
            <div class="mr-4 rounded-lg bg-blue-100 p-2">
              <UIcon name="i-lucide-heart-pulse" class="text-blue-500" />
            </div>
            <div>
              <h4 class="font-medium text-gray-800">Blood pressure reading</h4>
              <p class="text-sm text-gray-500">120/80 mmHg - Normal range</p>
              <p class="mt-1 text-xs text-gray-400">Today, 9:30 AM</p>
            </div>
          </div>

          <div
            class="flex items-start rounded-lg p-3 transition-colors hover:bg-gray-50"
          >
            <div class="mr-4 rounded-lg bg-purple-100 p-2">
              <UIcon name="i-lucide-stethoscope" class="text-purple-500" />
            </div>
            <div>
              <h4 class="font-medium text-gray-800">Doctor appointment</h4>
              <p class="text-sm text-gray-500">Dr. Smith - General checkup</p>
              <p class="mt-1 text-xs text-gray-400">Yesterday, 2:00 PM</p>
            </div>
          </div>

          <div
            class="flex items-start rounded-lg p-3 transition-colors hover:bg-gray-50"
          >
            <div class="mr-4 rounded-lg bg-green-100 p-2">
              <UIcon name="i-lucide-clipboard-list" class="text-green-500" />
            </div>
            <div>
              <h4 class="font-medium text-gray-800">Lab results updated</h4>
              <p class="text-sm text-gray-500">Blood test results available</p>
              <p class="mt-1 text-xs text-gray-400">2 days ago</p>
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
