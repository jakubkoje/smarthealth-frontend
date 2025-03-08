<script setup>
import { defineProps } from "vue";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

// Register required components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

defineProps({
  chartData: Object,
  chartOptions: Object,
});
</script>

<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>
