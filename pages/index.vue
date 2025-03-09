<template>
  <div class="p-6">
    
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div class="flex flex-col gap-8">
        <div class="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h2 class="text-xl font-medium text-blue-800 mb-4 flex items-center">
            <UIcon name="i-lucide-tools" class="mr-2" />
            Available Tools
          </h2>
          
          <p class="text-gray-700 mb-6">
            Select the tool that best fits your current workflow needs.
          </p>
          
          <div class="flex flex-wrap justify-center gap-8">
            <NuxtLink to="/cases" class="no-underline">
              <UCard
                class="w-32 h-32 cursor-pointer hover:shadow-lg transition-all hover:translate-y-[-4px] border border-blue-100"
              >
                <div class="flex flex-col items-center justify-between h-full p-6">
                  <div class="w-28 h-28 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UIcon name="i-lucide-heart-pulse" class="text-blue-500 text-4xl" />
                  </div>
                  <div class="text-center mt-4">
                    <h3 class="font-medium text-gray-800 text-lg mb-2">Cases</h3>
                    <p class="text-sm text-gray-600">
                      Upload and manage your medical case files
                    </p>
                  </div>
                </div>
              </UCard>
            </NuxtLink>
            
            <NuxtLink to="/viewer" class="no-underline">
              <UCard
                class="w-32 h-32 cursor-pointer hover:shadow-lg transition-all hover:translate-y-[-4px] border border-blue-100"
              >
                <div class="flex flex-col items-center justify-between h-full p-6">
                  <div class="w-28 h-28 bg-purple-100 rounded-lg flex items-center justify-center">
                    <UIcon name="i-lucide-stethoscope" class="text-purple-500 text-4xl" />
                  </div>
                  <div class="text-center mt-4">
                    <h3 class="font-medium text-gray-800 text-lg mb-2">Viewer</h3>
                    <p class="text-sm text-gray-600">
                      Analyze and process medical images
                    </p>
                  </div>
                </div>
              </UCard>
            </NuxtLink>
          </div>
        </div>

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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>
  