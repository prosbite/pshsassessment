<script setup>
import { router } from '@inertiajs/vue3'
</script>

<template>
    <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 class="text-5xl font-bold text-gray-800 tracking-tight leading-tight sm:text-5xl md:text-5xl">Assessment Complete!</h1>
        <p class="text-lg text-gray-600 mt-4">Thank you for completing the assessment.</p>
        <button @click="router.visit(route('front'))" class="flex mt-8 justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105">Back to Home</button>
    </div>
</template>
