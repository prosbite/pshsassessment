<!-- ModernTabUI.vue -->
<template>
    <div class="w-full max-w-7xl mx-auto mt-10">
        <header class="w-full max-w-7xl py-12 text-center mb-8">
            <h1 class="text-5xl font-extrabold text-gray-800 tracking-tight leading-tight sm:text-5xl md:text-5xl">
                Diagnostic Results
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
          <div v-if="activeTab === 'learning style'">
            <LearningStyleResults :assessmentData="assessmentData" category="learning style" />
          </div>
          <div v-if="activeTab === 'self-motivation'">
            <SelfMotivationResults :assessmentData="assessmentData" category="self-motivation" />
          </div>
          <div v-if="activeTab === 'self-efficacy'">
            <SelfEfficacyResults :assessmentData="assessmentData" category="self-efficacy" />
          </div>
          <div v-if="activeTab === 'study habits'">
            <StudyHabitsResults :assessmentData="assessmentData" category="Study Habits" />
          </div>
          <div v-if="activeTab === 'instructional factors'">
            <InstructionalFactorsResults :assessmentData="assessmentData" category="instructional factors" />
          </div>
          <div v-if="activeTab === 'summary'">
            <SummaryResults :assessmentData="assessmentData" category="summary" />
          </div>
        </div>
      </transition>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import SelfMotivationResults from '../Components/SelfMotivationResults.vue'
import SelfEfficacyResults from '../Components/SelfEfficacyResults.vue'
import StudyHabitsResults from '../Components/StudyHabitsResults.vue'
import InstructionalFactorsResults from '../Components/InstructionalFactorsResults.vue'
import LearningStyleResults from '../Components/LearningStyleResults.vue'
import SummaryResults from '../Components/SummaryResults.vue'


const page = usePage()
const props = defineProps({
    assessment: Array,
});
const tabs = [
    { name: 'learning style', label: 'Learning Style' },
    { name: 'self-motivation', label: 'Self Motivation' },
    { name: 'self-efficacy', label: 'Self Efficacy' },
    { name: 'study habits', label: 'Study Habits' },
    // { name: 'instructional factors', label: 'Instructional Factors' },
    { name: 'summary', label: 'Summary' },
]
const activeTab = ref('summary')

const assessmentData = computed(() => {
    return props.assessment ?? []
})
onMounted(() => {
    // console.log(props.assessment)
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
