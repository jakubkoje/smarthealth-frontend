<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-blue-600">GALAVENTS</h1>
        <p class="text-gray-600 mt-2">Create your account</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup label="First Name" name="firstName">
            <UInput v-model="firstName" placeholder="John" />
          </UFormGroup>
          
          <UFormGroup label="Last Name" name="lastName">
            <UInput v-model="lastName" placeholder="Doe" />
          </UFormGroup>
        </div>
        
        <UFormGroup label="Email" name="email">
          <UInput v-model="email" placeholder="your@email.com" />
        </UFormGroup>
        
        <UFormGroup label="Password" name="password">
          <UInput v-model="password" type="password" placeholder="••••••••" />
        </UFormGroup>
        
        <UFormGroup label="Confirm Password" name="confirmPassword">
          <UInput v-model="confirmPassword" type="password" placeholder="••••••••" />
        </UFormGroup>
        
        <UCheckbox v-model="agreeTerms" label="I agree to the Terms of Service and Privacy Policy" />
        
        <UButton type="submit" block color="primary" class="mt-6" :disabled="!agreeTerms">
          Create Account
        </UButton>
      </form>
      
      <div class="text-center mt-6">
        <p class="text-gray-600">
          Already have an account?
          <UButton variant="link" to="/login" size="sm">Sign in</UButton>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)

const handleRegister = () => {
  // Handle registration logic here
  console.log('Registration attempt', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  })
}
</script> 