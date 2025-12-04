<!-- PieChart.vue -->
<template>
    <Pie :data="chartData" :options="chartOptions" />
  </template>

  <script setup>
  import { Pie } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js'
  const props = defineProps({
    assessmentData: Array,
    category: String,
  })
  // Register required components
  ChartJS.register(Title, Tooltip, Legend, ArcElement)

  const chartData = computed(() => {
  return {
    labels: ['Visual', 'Auditory', 'Tactile'],
    datasets: [{
      data: props.assessmentData, // This is now reactive
      backgroundColor: ['#f87171', '#facc15', '#22c55e'],
    }]
  };
});

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
        fontSize: 24,
        padding: 10,
        boxWidth: 20,
        boxHeight: 20,
      },
      title: {
        display: false,
        text: props.category,
        fontSize: 45,
      }
    }
  }
  </script>
