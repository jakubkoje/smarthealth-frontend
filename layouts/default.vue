<template>
  <div class="flex h-screen">
    <!-- Side Toolbar -->
    <div
      class="border-primary-200 bg-primary-100 flex w-16 flex-col items-center space-y-6 border-r py-4"
    >
      <NuxtLink to="/" class="hover:bg-primary-200 rounded-lg p-2">
        <UIcon name="i-lucide-home" class="text-primary-700 text-xl" />
      </NuxtLink>

      <NuxtLink to="/dashboard" class="hover:bg-primary-200 rounded-lg p-2">
        <UIcon
          name="i-lucide-layout-dashboard"
          class="text-primary-700 text-xl"
        />
      </NuxtLink>

      <NuxtLink to="/settings" class="hover:bg-primary-200 rounded-lg p-2">
        <UIcon name="i-lucide-settings" class="text-primary-700 text-xl" />
      </NuxtLink>

      <div class="flex-grow"></div>

      <UColorModeButton variant="ghost" class="p-2" />
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
            <h1 class="text-primary-800 text-lg font-medium">smartHealth</h1>
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
            to="/login"
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
