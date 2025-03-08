<template>
  <div class="p-6">
    <h2 class="mb-6 text-xl font-medium text-gray-800">
      {{ existing ? 'Edit Case' : 'New Case' }}
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information Section -->
      <div class="mb-8">
        <h3 class="mb-4 text-lg font-medium text-gray-700">Basic Information</h3>
        <div class="space-y-4">
          <!-- ID Field -->
          <UFormGroup label="Case ID" name="id">
            <UInput
              v-model="formData.id"
              :disabled="existing"
              placeholder="CASE###"
            />
          </UFormGroup>

          <!-- Patient Name Field -->
          <UFormGroup 
            label="Patient Name" 
            name="patientName" 
            required
            :error="validationErrors.patientName"
          >
            <UInput
              v-model="formData.patientName"
              placeholder="Enter patient name"
              @blur="validateField('patientName')"
            />
          </UFormGroup>

          <!-- Age Field -->
          <UFormGroup 
            label="Age" 
            name="age" 
            required
            :error="validationErrors.age"
          >
            <UInput
              v-model.number="formData.age"
              type="number"
              placeholder="Enter age"
              min="0"
              max="150"
              @blur="validateField('age')"
            />
          </UFormGroup>
        </div>
      </div>

      <!-- Medical Details Section -->
      <div class="mb-8">
        <h3 class="mb-4 text-lg font-medium text-gray-700">Medical Details</h3>
        <div class="space-y-4">
          <!-- Tumor Size Field -->
          <UFormGroup 
            label="Tumor Size" 
            name="tumorSize"
            required
            :error="validationErrors.tumorSize"
          >
            <UInput
              v-model="formData.tumorSize"
              placeholder="e.g., 2.5 x 3.0 x 2.0 cm"
              @blur="validateField('tumorSize')"
            />
          </UFormGroup>

          <!-- Necrosis Presence -->
          <UFormGroup 
            label="Necrosis Present" 
            name="necrosisPresent"
          >
            <URadio
              v-model="formData.necrosisPresent"
              :options="[
                { label: 'Yes', value: true },
                { label: 'No', value: false }
              ]"
            />
          </UFormGroup>

          <!-- Angioinvasion Presence -->
          <UFormGroup 
            label="Angioinvasion Present" 
            name="angioinvasionPresent"
          >
            <URadio
              v-model="formData.angioinvasionPresent"
              :options="[
                { label: 'Yes', value: true },
                { label: 'No', value: false }
              ]"
            />
          </UFormGroup>

          <!-- Perineural Invasion -->
          <UFormGroup 
            label="Perineural Invasion Present" 
            name="perineuralInvasionPresent"
          >
            <URadio
              v-model="formData.perineuralInvasionPresent"
              :options="[
                { label: 'Yes', value: true },
                { label: 'No', value: false }
              ]"
            />
          </UFormGroup>

          <!-- Resection Margins -->
          <UFormGroup 
            label="Resection Margins Status" 
            name="resectionMargins"
            :error="validationErrors.resectionMargins"
          >
            <URadio
              v-model="formData.resectionMargins"
              :options="[
                { label: 'Positive', value: 'positive' },
                { label: 'Negative', value: 'negative' }
              ]"
              @blur="validateField('resectionMargins')"
            />
          </UFormGroup>

          <!-- Lymph Nodes Status -->
          <UFormGroup 
            label="Lymph Nodes Status" 
            name="lymphNodesStatus"
            required
            :error="validationErrors.lymphNodesStatus"
          >
            <UTextarea
              v-model="formData.lymphNodesStatus"
              placeholder="Describe the status of lymph nodes"
              rows="3"
              @blur="validateField('lymphNodesStatus')"
            />
          </UFormGroup>
        </div>
      </div>

      <!-- Last Update Field -->
      <UFormGroup label="Last Update" name="lastUpdate">
        <UInput
          v-model="formData.lastUpdate"
          type="date"
          :value="getCurrentDate()"
        />
      </UFormGroup>

      <!-- Form Actions -->
      <div class="flex flex-col gap-4 pt-4">
        <p v-if="apiError" class="text-red-500 text-sm">{{ apiError }}</p>
        <div class="flex justify-end gap-4">
          <UButton
            color="gray"
            variant="soft"
            @click="$emit('updated')"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            color="primary"
            :loading="loading"
          >
            {{ existing ? 'Update' : 'Create' }}
          </UButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { DataColumn, DataRow } from '~/types/data-table';

const props = defineProps<{
  columns: DataColumn[];
  objectData: DataRow;
  existing: boolean;
  updateAction: (data: DataRow) => void;
  openedFrom: 'create' | 'edit';
}>();

const emit = defineEmits(['updated']);

const loading = ref(false);
const formData = ref<DataRow>({
  ...{
    id: '',
    patientName: '',
    age: 0,
    lastUpdate: '',
    tumorSize: '',
    necrosisPresent: false,
    angioinvasionPresent: false,
    perineuralInvasionPresent: false,
    resectionMargins: 'negative',
    lymphNodesStatus: ''
  },
  ...props.objectData
});

const validationErrors = ref<Record<string, string>>({});
const apiError = ref<string | null>(null);

// Convert form data to FHIR Patient resource
const createFhirPatientResource = () => {
  // Split patient name into first and last
  const nameParts = formData.value.patientName.split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ');
  
  // Create FHIR Patient resource
  return {
    resourceType: "Patient",
    name: [
      {
        use: "official",
        family: lastName,
        given: [firstName]
      }
    ],
    birthDate: calculateBirthDate(formData.value.age),
    extension: [
      {
        url: "http://example.org/fhir/StructureDefinition/tumor-size",
        valueString: formData.value.tumorSize
      },
      {
        url: "http://example.org/fhir/StructureDefinition/necrosis-present",
        valueBoolean: formData.value.necrosisPresent
      },
      {
        url: "http://example.org/fhir/StructureDefinition/angioinvasion-present",
        valueBoolean: formData.value.angioinvasionPresent
      },
      {
        url: "http://example.org/fhir/StructureDefinition/perineural-invasion-present",
        valueBoolean: formData.value.perineuralInvasionPresent
      },
      {
        url: "http://example.org/fhir/StructureDefinition/resection-margins",
        valueString: formData.value.resectionMargins
      },
      {
        url: "http://example.org/fhir/StructureDefinition/lymph-nodes-status",
        valueString: formData.value.lymphNodesStatus
      }
    ]
  };
};

// Calculate birth date based on age
const calculateBirthDate = (age: number) => {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  return `${birthYear}-01-01`; // Default to January 1st of birth year
};

// Validation rules
const validateField = (fieldName: string) => {
  validationErrors.value[fieldName] = '';
  
  switch (fieldName) {
    case 'patientName':
      if (!formData.value.patientName) {
        validationErrors.value.patientName = 'Patient name is required';
      }
      break;
    case 'age':
      if (!formData.value.age) {
        validationErrors.value.age = 'Age is required';
      } else if (formData.value.age < 0 || formData.value.age > 150) {
        validationErrors.value.age = 'Age must be between 0 and 150';
      }
      break;
    case 'tumorSize':
      if (!formData.value.tumorSize) {
        validationErrors.value.tumorSize = 'Tumor size is required';
      }
      break;
    case 'resectionMargins':
      if (!formData.value.resectionMargins) {
        validationErrors.value.resectionMargins = 'Resection margins status is required';
      }
      break;
    case 'lymphNodesStatus':
      if (!formData.value.lymphNodesStatus) {
        validationErrors.value.lymphNodesStatus = 'Lymph nodes status is required';
      }
      break;
  }
};

const validateForm = () => {
  [
    'patientName',
    'age',
    'tumorSize',
    'resectionMargins',
    'lymphNodesStatus'
  ].forEach(validateField);
  return Object.keys(validationErrors.value).length === 0;
};

const isFormValid = computed(() => {
  return formData.value.patientName &&
    formData.value.age &&
    formData.value.tumorSize &&
    formData.value.resectionMargins &&
    formData.value.lymphNodesStatus &&
    Object.keys(validationErrors.value).length === 0;
});

// Generate a new case ID if creating a new record
onMounted(() => {
  if (!props.existing) {
    const timestamp = Date.now();
    formData.value.id = `CASE${timestamp.toString().slice(-6)}`;
    formData.value.lastUpdate = getCurrentDate();
  }
});

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const handleSubmit = async () => {
  apiError.value = null;
  
  try {
    loading.value = true;
    
    // Call the local updateAction to update the UI
    await props.updateAction(formData.value);
    
    // Create FHIR resource
    const fhirPatient = createFhirPatientResource();
    console.log('Sending FHIR data:', JSON.stringify(fhirPatient, null, 2));
    
    // Make POST request to FHIR server
    try {
        const response = await fetch('http://localhost:8080/csp/healthshare/demo/fhir/r4/Patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/fhir+json;charset=UTF-8'
            },
            mode: 'no-cors',
            body: JSON.stringify(fhirPatient)
        });
      
      console.log('Response status:', response.status);
      
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      if (!response.ok) {
        let errorMessage = 'Failed to save to FHIR server';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.issue?.[0]?.diagnostics || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      // Parse response if it's valid JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('FHIR POST successful!', responseData);
        console.log('Patient created with ID:', responseData.id);
      } catch (e) {
        console.log('Response is not valid JSON, but request was successful');
      }
      
      // Close the modal
      emit('updated');
      
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      throw new Error(`Network error: ${fetchError.message}`);
    }
    
  } catch (error) {
    console.error('Error submitting form:', error);
    apiError.value = error instanceof Error ? error.message : 'An unknown error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-section {
  @apply border-b border-gray-200 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0;
}
</style> 