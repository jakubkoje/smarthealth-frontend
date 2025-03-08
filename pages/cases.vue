<template>
  <div class="p-6">
    <div class="mb-12 flex justify-center">
      <h1 class="text-3xl font-medium text-gray-800">Cases</h1>
    </div>

    <div class="mx-auto max-w-6xl">
      <DataTable
        :columns="columns"
        :rows="rows"
        :updateAction="handleUpdate"
        :rowClickAction="handleRowClick"
        rowLink="#"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DataColumn, DataRow } from "~/types/data-table";

// Define columns for the table
const columns: DataColumn[] = [
  {
    name: "id",
    label: "ID",
    widthPercentage: 10,
    dataType: "string",
    inputType: "text",
  },
  {
    name: "patientName",
    label: "Patient Name",
    widthPercentage: 20,
    dataType: "string",
    inputType: "text",
  },
  {
    name: "age",
    label: "Age",
    widthPercentage: 10,
    dataType: "number",
    inputType: "number",
  },
  {
    name: "lastUpdate",
    label: "Last Update",
    widthPercentage: 15,
    dataType: "string",
    inputType: "text",
  },
];

// Generate dummy data
const rows: DataRow[] = [
  {
    id: "CASE001",
    patientName: "John Doe",
    age: 45,
    condition: "Hypertension",
    status: "Active",
    lastUpdate: "2024-03-15",
  },
  {
    id: "CASE002",
    patientName: "Jane Smith",
    age: 32,
    condition: "Diabetes Type 2",
    status: "Pending",
    lastUpdate: "2024-03-14",
  },
  {
    id: "CASE003",
    patientName: "Robert Johnson",
    age: 58,
    condition: "Arthritis",
    status: "Completed",
    lastUpdate: "2024-03-13",
  },
  {
    id: "CASE004",
    patientName: "Maria Garcia",
    age: 29,
    condition: "Asthma",
    status: "Active",
    lastUpdate: "2024-03-15",
  },
  {
    id: "CASE005",
    patientName: "William Chen",
    age: 51,
    condition: "Heart Disease",
    status: "Active",
    lastUpdate: "2024-03-15",
  },
];

// Handler functions
const handleUpdate = async (updatedData: DataRow) => {
  console.log("Updating data:", updatedData);
  // In a real application, this would make an API call to update the data
};

const handleRowClick = (row: DataRow) => {
  console.log("Row clicked:", row);
  // In a real application, this might navigate to a detailed view
};
</script>
