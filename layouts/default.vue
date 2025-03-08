<template>
  <div class="flex h-screen">

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
            <NuxtLink to="/" class="no-underline">
             <h1 class="text-primary-800 text-lg font-medium hover:text-primary-600 transition-colors cursor-pointer">smartHealth</h1>
            </NuxtLink>
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
      <main class="bg-primary-50 flex-1 overflow-auto">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
// No additional setup needed
</script>
