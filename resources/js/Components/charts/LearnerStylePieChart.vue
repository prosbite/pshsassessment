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

  const chartData = {
    labels: ['Visual', 'Auditory', 'Tactile'],
    datasets: [
      {
        label: props.category,
        data: [10,20,30],
        backgroundColor: ['#f87171', '#facc15', '#22c55e'],
        hoverOffset: 10
      }
    ]
  }

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
