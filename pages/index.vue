<template>
  <div class="p-6">
    
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div class="flex flex-col gap-8">
        <!-- New Doctor Overview Section -->
        <div class="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h2 class="text-xl font-medium text-blue-800 mb-4 flex items-center">
            <UIcon name="i-lucide-stethoscope" class="mr-2" />
            For Healthcare Professionals
          </h2>
          
          <div class="space-y-4">
            <p class="text-gray-700">
              KiNET Analyzer is a specialized tool designed to assist pathologists and oncologists in analyzing Ki-67 immunohistochemical stains for breast cancer assessment.
            </p>
            
            <div class="flex flex-row md:flex-row gap-4 mt-4 overflow-x-auto pb-2">
              <div class="bg-white p-4 rounded-lg shadow-sm flex-1 min-w-[250px]">
                <div class="flex items-center mb-2">
                  <UIcon name="i-lucide-microscope" class="text-blue-600 mr-2" />
                  <h3 class="font-medium text-gray-800">Automated Analysis</h3>
                </div>
                <p class="text-sm text-gray-600">
                  Automatically detects and classifies positive and negative cells in Ki-67 stained tissue samples.
                </p>
              </div>
              
              <div class="bg-white p-4 rounded-lg shadow-sm flex-1 min-w-[250px]">
                <div class="flex items-center mb-2">
                  <UIcon name="i-lucide-percent" class="text-blue-600 mr-2" />
                  <h3 class="font-medium text-gray-800">Ki-67 Index Calculation</h3>
                </div>
                <p class="text-sm text-gray-600">
                  Precisely calculates Ki-67 proliferation index and tumor grading according to current guidelines.
                </p>
              </div>
              
              <div class="bg-white p-4 rounded-lg shadow-sm flex-1 min-w-[250px]">
                <div class="flex items-center mb-2">
                  <UIcon name="i-lucide-clipboard-check" class="text-blue-600 mr-2" />
                  <h3 class="font-medium text-gray-800">Clinical Decision Support</h3>
                </div>
                <p class="text-sm text-gray-600">
                  Provides standardized reporting to support clinical decision-making.
                </p>
              </div>
            </div>
            
            <div class="mt-4 bg-white p-4 rounded-lg border border-blue-100">
              <h4 class="font-medium text-gray-800 mb-2">How to use:</h4>
              
              <ol class="list-none text-sm text-gray-600 space-y-3 pl-0">
                <li class="flex items-start">
                  <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium mr-2">1</span>
                  <span>Upload your whole slide image in the <strong>Cases</strong> section</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium mr-2">2</span>
                  <span>Open the image in the <strong>Viewer</strong> to analyze</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium mr-2">3</span>
                  <span>Select a region of interest using the selection tools</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium mr-2">4</span>
                  <span>Click "Process patch" to analyze the selected area</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium mr-2">5</span>
                  <span>Review the Ki-67 index and cell classification results</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
        
        <div>
          <h2 class="text-xl font-medium text-center text-gray-800 mb-4">Tools</h2>
          
          <div class="flex justify-center gap-4">
            <NuxtLink to="/cases" class="no-underline">
              <UCard
                class="w-40 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div class="flex flex-col items-center">
                  <div class="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <UIcon name="i-lucide-heart-pulse" class="text-blue-500 text-2xl" />
                  </div>
                  <span class="text-sm text-gray-700">Cases</span>
                </div>
              </UCard>
            </NuxtLink>
            
            <NuxtLink to="/viewer" class="no-underline">
              <UCard
                class="w-40 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div class="flex flex-col items-center">
                  <div class="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <UIcon name="i-lucide-stethoscope" class="text-purple-500 text-2xl" />
                  </div>
                  <span class="text-sm text-gray-700">Viewer</span>
                </div>
              </UCard>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>
  