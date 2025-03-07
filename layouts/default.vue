<template>
  <div class="flex h-screen">
    <!-- Side Toolbar -->
    <div class="w-16 bg-gray-100 border-r border-gray-200 flex flex-col items-center py-4 space-y-6">
      <NuxtLink to="/" class="p-2 hover:bg-gray-200 rounded-lg">
        <UIcon name="i-lucide-home" class="text-gray-700 text-xl" />
      </NuxtLink>
      
      <NuxtLink to="/dashboard" class="p-2 hover:bg-gray-200 rounded-lg">
        <UIcon name="i-lucide-layout-dashboard" class="text-gray-700 text-xl" />
      </NuxtLink>
      
      <NuxtLink to="/settings" class="p-2 hover:bg-gray-200 rounded-lg">
        <UIcon name="i-lucide-settings" class="text-gray-700 text-xl" />
      </NuxtLink>
      
      <div class="flex-grow"></div>
      
      <UColorModeButton variant="ghost" class="p-2" />
    </div>
    
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Header -->
      <header class="h-16 border-b border-gray-200 bg-white flex items-center px-6">
        <div class="flex-1 flex items-center">
          <div class="flex items-center">
            <UIcon name="i-lucide-activity" class="text-gray-800 mr-2 text-xl" />
            <h1 class="text-lg font-medium text-gray-800">smartHealth</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <UButton
            icon="i-lucide-help-circle"
            color="gray"
            variant="ghost"
            class="rounded-full"
          />
          <UButton
            icon="i-lucide-user"
            color="gray"
            variant="ghost"
            to="/login"
            class="rounded-full"
          />
        </div>
      </header>
      
      <!-- Page Content -->
      <main class="flex-1 overflow-auto bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// No additional setup needed
</script>