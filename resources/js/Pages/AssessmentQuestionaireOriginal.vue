<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
     <!-- Header section -->
     <header class="w-full max-w-3xl py-12 text-center">
        <h1 class="text-5xl font-extrabold text-gray-800 tracking-tight leading-tight sm:text-5xl md:text-5xl">
            Assessment Questionnaire
        </h1>
    </header>

    <!-- Main content area - centered questionnaire -->
    <form id="questionnaireForm" @submit.prevent="submit" class="space-y-8">
        <main v-for="questionaire,index in questionaire" :key="index" class="w-full max-w-7xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
            <h2 class="text-3xl font-bold text-blue-600 mb-10 text-center py-4 uppercase">
                {{ questionaire.category }}
            </h2>

            <!-- Assessment Questions Form -->
            <div class="space-y-8">
                <Question @answer="answer($event,question)" v-for="question,index in questionaire.questions" :key="index" :question="question.question" :number="index + 1" />
            </div>
        </main>
        <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
        >
            Submit Answers
        </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import Question from '@/Components/Question.vue'
import { ref } from 'vue'
import { useQuestions } from '@/composables/questions'
import { onMounted } from 'vue'
import { usePage, router } from '@inertiajs/vue3'

const page = usePage()
const answers = ref({})
const questionaire = ref(JSON.parse(JSON.stringify(useQuestions().value)))
const answer = (answer: any, question: any) => {
    question.answer = answer
}
const submit = () => {
    const formData = {
        ...page.props.flash?.udata,
        answers: questionaire.value
    }
    router.post(route('questionaire'), formData)
}
onMounted(() => {
    if(!page.props.flash?.udata){
        router.visit(route('front'))
    }
})
</script>

<style>

</style>
