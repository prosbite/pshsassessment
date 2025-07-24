<!-- ModernTabUI.vue -->
<template>
    <div class="w-full max-w-7xl mx-auto mt-10">
        <header class="flex items-center justify-between w-full max-w-7xl py-12 text-center">
            <div class="flex flex-col justify-center">
                <h1 class="text-5xl font-extrabold flex-1 text-center text-gray-800 tracking-tight leading-tight sm:text-5xl md:text-5xl">
                    Diagnostic Results
                </h1>
                 <!-- <TextDropdown :options="[{name: 'OROSA'}]" class="mb-8" /> -->
            </div>
            <div class="flex items-center gap-2">
                <select
                    v-model="selectedSection"
                    id="lastName"
                    required
                    class="block w-64 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="" disabled selected>Select Section</option>
                    <option v-for="section in sections" :key="section.id" :value="section.id">{{section.grade_level_id + 6 }} - {{ section.section_name }}</option>
                </select>
                <button @click="goToLog" class="flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list">
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                </button>
            </div>
        </header>
        <div class="flex justify-center">

        </div>
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
            <SummaryResults :assessmentData="assessmentData" :noAssessment="noAssessment" category="summary" />
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
import { router } from '@inertiajs/vue3'
import TextDropdown from '@/Components/common/TextDropdown.vue'
import { controllers } from 'chart.js'

const page = usePage()
const props = defineProps({
    assessment: Array,
    sections: Array,
});
const selectedSection = ref('')
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
    return props.assessment.filter((assess) => assess.enrollment?.section?.id === selectedSection.value) ?? []
})
const selectedEnrollees = computed(() => {
    return props.sections.filter((section) => section.id === selectedSection.value)?.[0]?.enrollments ?? []
})
const noAssessment = computed(() => {
    const assessedIds = new Set(assessmentData.value.map(a => a.enrollment_id));
    return selectedEnrollees.value.filter(e => !assessedIds.has(e.id));
})
const goToLog = () => {
    router.visit(route('assessment-log'))
}
onMounted(() => {
    selectedSection.value = props.sections?.[0]?.id ?? ''
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
