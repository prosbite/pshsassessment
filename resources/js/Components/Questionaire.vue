<template>
  <!-- Main content area - centered questionnaire -->
  <main class="w-full max-w-7xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <h2 class="text-2xl font-bold text-blue-600 mb-10 text-left">
            STUDENTS LEARNING STYLE
        </h2>

        <!-- Assessment Questions Form -->
        <form id="questionnaireForm" class="space-y-8">
            <Question @answer="answer" v-for="question,index in useQuestions().value[0].questions" :key="index" :question="question" :number="index + 1" />

            <!-- Submit Answers Button -->
            <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
                Submit Answers
            </button>
        </form>
    </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useQuestions } from '@/composables/questions'

const answers = ref({})
const answer = (answer) => {
    alert(answer)
    answers.value[answer.number] = answer.choice
}
</script>

<style>

</style>
