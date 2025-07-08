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
    labels: ['Very Low (1 - 1.79)', 'Low (1.8 - 2.59)', 'Average (2.6 - 3.39)', 'High (3.4 - 4.19)', 'Very High (4.2 - 5)'],
    datasets: [
      {
        label: props.category,
        data: props.assessmentData,
        backgroundColor: ['#f87171', '#facc15', '#aaa', '#60a5fa', '#22c55e'],
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
