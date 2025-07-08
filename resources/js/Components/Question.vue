<template>
    <div class="border-b border-gray-200 pb-6">
        <p class="text-lg font-medium text-gray-800 mb-4">
            {{number + ".)  " + question }}
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4" :class="options.length > 3 ? 'md:grid-cols-5' : 'md:grid-cols-3'">
            <label v-for="option in options" :key="option" class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-150 ease-in-out">
                <input v-model="choice" type="radio" :name="`q${question}`" :value="option" class="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 rounded-full" required :disabled="submitted">
                <span class="ml-2 text-gray-700">{{ ucWords(option) }}</span>
            </label>
            <!-- <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-150 ease-in-out">
                <input v-model="choice" type="radio" :name="`q${question}`" value="low" class="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 rounded-full" required>
                <span class="ml-2 text-gray-700">Low</span>
            </label>
            <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-150 ease-in-out">
                <input v-model="choice" type="radio" :name="`q${question}`" value="average" class="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 rounded-full" required>
                <span class="ml-2 text-gray-700">Average</span>
            </label>
            <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-150 ease-in-out">
                <input v-model="choice" type="radio" :name="`q${question}`" value="high" class="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 rounded-full" required>
                <span class="ml-2 text-gray-700">High</span>
            </label>
            <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition duration-150 ease-in-out">
                <input v-model="choice" type="radio" :name="`q${question}`" value="very high" class="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 rounded-full" required>
                <span class="ml-2 text-gray-700">Very High</span>
            </label> -->
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { ucWords } from '@/composables/questions'
    const props = defineProps({
        question: String,
        number: Number,
        options: Array,
        submitted: {
            default: false,
            type: Boolean
        },
        selected: {
            default: null,
            type: String
        }
    })
    const choice = ref(null)
    const emit = defineEmits(['answer'])
    watch(choice, () => {
        emit('answer', choice.value)
    })
    onMounted(() => {
        choice.value = props.selected ?? null
    })
</script>
