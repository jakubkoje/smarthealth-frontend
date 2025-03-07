<template>
  <div class="p-6">
    <h2 class="mb-6 text-xl font-medium text-gray-800">
      {{ existing ? 'Edit Case' : 'New Case' }}
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      
      <UFormGroup label="Case ID" name="id">
        <UInput
          v-model="formData.id"
          :disabled="existing"
          placeholder="CASE###"
        />
      </UFormGroup>

      <UFormGroup label="Patient Name" name="patientName" required>
        <UInput
          v-model="formData.patientName"
          placeholder="Enter patient name"
        />
      </UFormGroup>

      <UFormGroup label="Age" name="age" required>
        <UInput
          v-model="formData.age"
          type="number"
          placeholder="Enter age"
          min="0"
          max="150"
        />
      </UFormGroup>

      <UFormGroup label="Condition" name="condition" required>
        <UInput
          v-model="formData.condition"
          placeholder="Enter medical condition"
        />
      </UFormGroup>

      <UFormGroup label="Status" name="status" required>
        <USelect
          v-model="formData.status"
          :options="['Active', 'Pending', 'Completed']"
          placeholder="Select status"
        />
      </UFormGroup>

      <UFormGroup label="Last Update" name="lastUpdate">
        <UInput
          v-model="formData.lastUpdate"
          type="date"
          :value="getCurrentDate()"
        />
      </UFormGroup>

      <div class="flex justify-end gap-4 pt-4">
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
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
const formData = ref<DataRow>({ ...props.objectData });

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
  try {
    loading.value = true;
    await props.updateAction(formData.value);
    emit('updated');
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    loading.value = false;
  }
};
</script> 