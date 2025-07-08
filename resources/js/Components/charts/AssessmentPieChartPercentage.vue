<template>
    <Pie :data="chartData" :options="chartOptions" />
  </template>

  <script setup>
  import { Pie } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
  } from 'chart.js'
  import ChartDataLabels from 'chartjs-plugin-datalabels'
  const props = defineProps({
    assessmentData: Array,
    category: String,
  })
  ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels)

  const chartData = {
    labels: ['Very Low', 'Low', 'Average', 'High', 'Very High'],
    datasets: [{
        data: props.assessmentData,
        backgroundColor: ['#f87171', '#facc15', '#aaa', '#60a5fa', '#22c55e'],
    }]
  }

  const chartOptions = {
    plugins: {
      legend: {
        position: 'left',
        labels: {
          font: {
            size: 24,       // 👈 Sets font size of legend text
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
            size: 24,          // 🔥 Increase this value for larger text
            weight: 'bold'     // Optional: make it bold
        },
        formatter: (value, context) => {
          const data = context.chart.data.datasets[0].data
          const total = data.reduce((a, b) => a + b, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${percentage}%`
        }
      }
    }
  }
  </script>
