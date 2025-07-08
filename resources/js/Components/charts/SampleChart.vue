<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const pieChartCanvas = ref(null);
let chartInstance = null;

// Custom Chart.js plugin to display percentages
const percentagePlugin = {
    id: 'percentageText',
    afterDraw(chart) {
        const ctx = chart.ctx;
        ctx.save();

        chart.data.datasets.forEach((dataset, datasetIndex) => {
            // Check if this is the correct dataset for percentages (e.g., the first one)
            if (datasetIndex === 0) {
                const meta = chart.getDatasetMeta(datasetIndex);
                meta.data.forEach((arc, index) => {
                    // Calculate the percentage
                    const total = dataset.data.reduce((sum, val) => sum + val, 0);
                    const value = dataset.data[index];
                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0; // Fixed to 1 decimal place

                    // Get the arc's center point
                    const position = arc.tooltipPosition();
                    const x = position.x;
                    const y = position.y;

                    // Adjust text position slightly to be inside the arc
                    const midAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
                    const radius = arc.outerRadius / 2; // Position text roughly in the middle of the slice
                    const textX = x + Math.cos(midAngle) * radius;
                    const textY = y + Math.sin(midAngle) * radius;

                    ctx.fillStyle = 'white'; // Text color
                    ctx.font = 'bold 12px Arial'; // Text font and size
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    // Only draw if the percentage is significant enough to be visible
                    if (percentage > 3) { // Avoid cluttering small slices
                        ctx.fillText(`${percentage}%`, textX, textY);
                    }
                });
            }
        });
        ctx.restore();
    }
};

onMounted(() => {
    if (pieChartCanvas.value) {
        const ctx = pieChartCanvas.value.getContext('2d');

        const data = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Student Distribution',
                data: [12, 19, 3, 5, 2, 3], // Example data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allows the chart to fill its container
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                    const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                    label += `${context.parsed} (${percentage}%)`;
                                }
                                return label;
                            }
                        }
                    },
                    legend: {
                        position: 'top',
                    },
                    // Enable our custom plugin
                    percentageText: {} // This empty object is just to enable the plugin by its ID
                }
            },
            plugins: [percentagePlugin] // Register the plugin with the chart instance
        };

        chartInstance = new Chart(ctx, config);
    }
});

onUnmounted(() => {
    if (chartInstance) {
        chartInstance.destroy();
    }
});
</script>

<template>
    <div class="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
        <h3 class="text-xl font-semibold mb-4 text-center">Student Category Distribution</h3>
        <div class="relative" style="height: 400px;">
            <canvas ref="pieChartCanvas"></canvas>
        </div>
        <p class="text-sm text-gray-500 mt-4 text-center">
            This pie chart visualizes the distribution of students across different categories, with percentages shown directly on each slice.
        </p>
    </div>
</template>

<style scoped>
/* Scoped styles for this component */
</style>
