<template>
    <div>
      <header class="border-b border-gray-200 bg-white">
        <div class="container mx-auto px-4 py-3 flex items-center justify-between">
          <div class="flex items-center">
            <UButton variant="ghost" to="/" class="p-1 mr-2">
              <UIcon name="i-lucide-menu" />
            </UButton>
            <NuxtLink to="/" class="text-lg font-semibold text-gray-800">smartHealth</NuxtLink>
          </div>
          
          <div class="flex items-center gap-4">
            <UColorModeButton />
            <UButton
              icon="i-lucide-user"
              color="gray"
              variant="ghost"
              to="/login"
              class="rounded-full"
            />
          </div>
        </div>
      </header>
  
      <main>
        <slot />
      </main>
    </div>
  </template>
  
  <script setup>
  // No additional setup needed
  </script>