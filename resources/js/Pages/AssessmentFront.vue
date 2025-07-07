<script setup>
import { router, Link } from '@inertiajs/vue3'
import { useForm } from '@inertiajs/vue3'

const form = useForm({
  lastName: '',
  firstName: '',
  entryCode: '',
})

const submitUser = () => {
  // THIS IS WHERE YOU SPECIFY WHERE THE DATA GOES
  // Option A: Using a named route (recommended for robustness)
  form.post(route('user-check'), { // 'users.store' is your Laravel route name
    onError: (errors) => {
        alert("Something went horribly wrong!")
    },
  })
}
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
         <!-- Header section -->
    <header class="w-full max-w-2xl mb-16 text-center">
        <h1 class="text-5xl font-extrabold text-gray-800 tracking-tight leading-tight sm:text-5xl md:text-5xl">
            Student Assessment
        </h1>
    </header>

    <!-- Main content area - centered form -->
    <main class="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">
            Start Your Assessment
        </h2>

        <!-- Assessment Form -->
        <form @submit.prevent="submitUser" id="assessmentForm" class="space-y-6">
            <!-- Last Name Input -->
            <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                </label>
                <input
                    v-model="form.lastName"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none transition duration-150 ease-in-out"
                    required
                />
            </div>

            <!-- First Name Input -->
            <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                </label>
                <input
                    v-model="form.firstName"
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none transition duration-150 ease-in-out"
                    required
                />
            </div>

            <!-- Entry Code Input -->
            <div>
                <label for="entryCode" class="block text-sm font-medium text-gray-700 mb-1">
                    Entry Code
                </label>
                <input
                    v-model="form.entryCode"
                    type="text"
                    id="entryCode"
                    name="entryCode"
                    placeholder="Enter your unique entry code"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none transition duration-150 ease-in-out"
                    required
                />
            </div>

            <!-- Start Assessment Button -->
            <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
                Start Assessment
            </button>
        </form>
    </main>
    </div>
</template>
