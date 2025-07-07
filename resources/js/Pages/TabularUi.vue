<!-- ModernTabUI.vue -->
<template>
    <div class="w-full max-w-7xl mx-auto mt-10">
        <header class="w-full max-w-7xl py-12 text-center mb-8">
            <h1 class="text-5xl font-extrabold text-gray-800 tracking-tight leading-tight sm:text-5xl md:text-5xl">
                Assessment Questionnaire
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
          class="mt-6 p-6 bg-white rounded-xl shadow-md transition-all duration-300"
        >
          <div v-for="question,index in questionaire" :key="index">
            <div v-if="activeTab === question.category?.toLowerCase()">
                <!-- <h2 class="text-xl font-bold mb-2">{{ question.category }}</h2> -->
                <form @submit.prevent="submit" class="space-y-8">
                    <Question @answer="answer($event,question)" v-for="question,index in question.questions" :key="index" :question="question.question" :number="index + 1" />
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

const tabs = [
    { name: 'learner profile', label: 'Learner Profile' },
    { name: 'self-motivation', label: 'Self Motivation' },
    { name: 'self-efficacy', label: 'Self Efficacy' },
    { name: 'study habits', label: 'Study Habits' },
    { name: 'instructional factors', label: 'Instructional Factors' },
]
const questionaire = ref(JSON.parse(JSON.stringify(useQuestions().value)))
const activeTab = ref('home')
const answer = (answer: any, question: any) => {
    question.answer = answer
}
const page = usePage()
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
