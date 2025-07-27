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
  labels: ['Visual', 'Auditory', 'Tactile'],
  datasets: [{
    data: props.assessmentData,
    backgroundColor: ['#f87171', '#facc15', '#22c55e'],
  }]
};

const chartOptions = {
  plugins: {
    legend: {
      position: 'left',
      labels: {
        filter: function (legendItem, chartData) {
          const value = chartData.datasets[0].data[legendItem.index];
          return value > 0;
        },
        font: {
          size: 24,
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          return value > 0 ? `${context.label}: ${value}` : null;
        }
      }
    },
    datalabels: {
      color: '#fff',
      font: {
        size: 24,
        weight: 'bold'
      },
      formatter: (value, context) => {
        const data = context.chart.data.datasets[0].data;
        const total = data.reduce((a, b) => a + b, 0);
        const percentage = ((value / total) * 100).toFixed(1);
        return value > 0 ? `${percentage}%` : null;
      }
    }
  }
};

  </script>
