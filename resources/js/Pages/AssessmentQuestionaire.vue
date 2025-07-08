<!-- ModernTabUI.vue -->
<template>
    <div class="w-full max-w-7xl mx-auto mt-10">
        <header class="w-full max-w-7xl pb-12 text-center mb-8">
            <div class="flex justify-end items-center">
                <button @click="goHome" class="flex mt-8 justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105">
                    <HomeIcon class="w-6 h-6 text-white" />
                </button>
            </div>
            <h1 class="text-5xl font-extrabold text-gray-800 tracking-tight leading-tight sm:text-5xl md:text-5xl">
                Diagnostic Questionnaires
            </h1>
        </header>
      <!-- Tab Headers -->
      <div class="flex space-x-2 bg-gray-100 p-1 rounded-xl shadow-inner">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="activeTab = tab.name"
          class="flex-1 px-4 py-2 text-center rounded-lg text-sm font-semibold transition-all duration-200"
          :class="{
            'bg-white shadow text-blue-600': activeTab === tab.name,
            'text-gray-600 hover:text-blue-500': activeTab !== tab.name,
          }"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <transition name="fade" mode="out-in">
        <div
          :key="activeTab"
          class="mt-6 py-6 bg-white rounded-xl shadow-md transition-all duration-300"
        >
          <div v-for="question,index in questionaire" :key="index">
            <div v-if="activeTab === question.category?.toLowerCase()" class="relative">
                <!-- <div v-if="question.submitted" class="flex flex-row gap-2 bg-green-600 items-center py-2 px-10">
                    <CheckCircleIcon class="w-7 h-7 text-white" />
                    <span class="text-lg font-bold text-white w-fit">
                        Done
                    </span>
                </div> -->
                <StatusRibbon v-if="question.submitted" status="Completed" type="success" />
                <!-- <h2 class="text-xl font-bold mb-2">{{ question.category }}</h2> -->
                <form @submit.prevent="submit(question)" class="space-y-12 p-10 py-24">
                    <Question :submitted="question.submitted" :selected="answer.answer" @answer="answerQuestion($event,answer)" :options="question.options ?? ['very low', 'low', 'average', 'high', 'very high']" v-for="answer,index in question.questions" :key="answer.id" :question="answer.question" :number="index + 1" />
                    <button
                        v-if="!question.submitted"
                        type="submit"
                        class="w-full flex justify-center py-4 px-4 my-8 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Submit Answers
                    </button>
                </form>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script setup lang="ts">
import { useQuestions } from '@/composables/questions'
import Question from '@/Components/Question.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import { HomeIcon } from '@heroicons/vue/24/outline' // or /solid
import { CheckCircleIcon } from '@heroicons/vue/24/solid' // or /outline
import StatusRibbon from '@/Components/StatusRibbon.vue'

const tabs = [
    { name: 'learning style', label: 'Learning Style' },
    { name: 'self-motivation', label: 'Self Motivation' },
    { name: 'self-efficacy', label: 'Self Efficacy' },
    { name: 'study habits', label: 'Study Habits' },
    // { name: 'instructional factors', label: 'Instructional Factors' },
]
const questionaire = ref(JSON.parse(JSON.stringify(useQuestions().value)))
const activeTab = ref('learning style')
const answerQuestion = (answer: any, question: any) => {
    question.answer = answer
}
const page = usePage()
const submit = (questionSet: any) => {
    questionSet.submitted = true
    const udata = page.props.flash?.udata ?? JSON.parse(localStorage.getItem('assessment'))
    const formData = {
        ...udata,
        assessment: questionaire.value
    }
    router.post(route('questionaire'), formData, {
        onSuccess: () => {
            if(page.props.flash?.udata?.assessment){
                questionaire.value = page.props.flash?.udata.assessment
                localStorage.setItem('assessment', JSON.stringify(page.props.flash?.udata))
            }
        },
        onError: (errors) => {
            console.log('Validation errors:', errors)
            // e.g., highlight fields or show an error toast
        },
    })

}
const goHome = () => {
    localStorage.removeItem('assessment')
    router.visit(route('front'))
}
onMounted(() => {
    if(page.props.flash?.udata?.assessment){
        questionaire.value = page.props.flash?.udata.assessment
        localStorage.setItem('assessment', JSON.stringify(page.props.flash?.udata))
    }
    if(!page.props.flash?.udata?.assessment && localStorage.getItem('assessment')){
        questionaire.value = JSON.parse(localStorage.getItem('assessment'))?.assessment
    }
    if(!localStorage.getItem('assessment')) {
        router.visit(route('front'))
    }
})
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
