<!-- ModernTabUI.vue -->
<template>
    <div class="w-full max-w-7xl mx-auto mt-10">
        <header class="flex items-center justify-left w-full max-w-7xl py-12 text-center mb-8">
            <h1 class="text-5xl font-extrabold flex-1 text-center text-gray-800 tracking-tight leading-tight sm:text-5xl md:text-5xl">
                Assessment Log
            </h1>
            <button @click="goHome" class="flex mt-8 justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105">
                <svg class="w-6 h-6 text-white hover:text-indigo-50" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M4.5 10.5v9A1.5 1.5 0 006 21h3.75a.75.75 0 00.75-.75V15a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v5.25c0 .414.336.75.75.75H18a1.5 1.5 0 001.5-1.5v-9" />
                </svg>
            </button>
        </header>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                    <tr>
                        <th class="px-6 py-3 text-left w-16">No.</th>
                        <th class="px-6 py-3 text-left">Student Name</th>
                        <th class="px-6 py-3 text-left w-1/4">Log Date</th>
                    </tr>
                </thead>
                <tbody class="text-gray-800 text-sm divide-y divide-gray-100">
                <!-- Repeatable Row -->
                <tr v-for="student, index in students.data" :key="index" class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4 font-medium">
                        {{ (students.current_page - 1) * students.per_page + index + 1 }}
                    </td>
                    <td class="px-6 py-4 font-medium">
                        {{ student.lastName + ', ' + student.firstName }}
                    </td>
                    <td class="px-6 py-4 font-medium">
                        {{ formatDate(student.created_at) }}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mt-6 space-x-1 text-sm pagination py-24">
            <a
                v-for="(link, index) in students.links"
                :key="index"
                :href="link.url"
                v-html="link.label"
                class="px-4 py-2 border rounded-md transition-colors duration-200"
                :class="{
                'bg-white text-gray-700 border-gray-300 hover:bg-gray-100': link.url && !link.active,
                'bg-indigo-600 text-white border-indigo-600': link.active,
                'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed': !link.url
                }"
            />
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'

const page = usePage()
const props = defineProps({
    students: Object,
});
const goHome = () => {
    router.visit(route('assessment-results'))
}
const formatDate = (timestamp:any) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(timestamp).toLocaleDateString('en-US', options);
};
onMounted(() => {
    // console.log(props.students)
})
</script>
