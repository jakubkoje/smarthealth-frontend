<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-blue-600">GALAVENTS</h1>
        <p class="text-gray-600 mt-2">Sign in to your account</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="email" placeholder="your@email.com" />
        </UFormGroup>
        
        <UFormGroup label="Password" name="password">
          <UInput v-model="password" type="password" placeholder="••••••••" />
        </UFormGroup>
        
        <div class="flex items-center justify-between">
          <UCheckbox v-model="rememberMe" label="Remember me" />
          <UButton variant="link" to="#" size="sm">Forgot password?</UButton>
        </div>
        
        <UButton type="submit" block color="primary" class="mt-6">
          Sign in
        </UButton>
      </form>
      
      <div class="text-center mt-6">
        <p class="text-gray-600">
          Don't have an account?
          <UButton variant="link" to="/register" size="sm">Register</UButton>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = () => {
  // Handle login logic here
  console.log('Login attempt', { email: email.value, password: password.value, rememberMe: rememberMe.value })
}
</script> 