<template>
  <div class="py-16">
    <h1 class="text-2xl text-center font-bold mb-8">Student Assessment Summary</h1>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                <tr>
                    <th class="px-6 py-3 text-left">No.</th>
                    <th class="px-6 py-3 text-left">Learner's Name</th>
                    <th class="px-6 py-3 text-left">Learning Style</th>
                    <th class="px-6 py-3 text-left">Self Motivation</th>
                    <th class="px-6 py-3 text-left">Self Efficacy</th>
                    <th class="px-6 py-3 text-left">Study Habits</th>
                </tr>
            </thead>
            <tbody class="text-gray-800 text-sm divide-y divide-gray-100">
            <!-- Repeatable Row -->
            <tr v-for="student, index in assessmentData" :key="index" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4 font-medium">
                    {{ index + 1 }}
                </td>
                <td class="px-6 py-4 font-medium">
                    {{ student.name }}
                </td>
                <td class="px-6 py-4 font-medium">
                    {{ student.learningStyle ? ucWords(student.learningStyle) : '-' }}
                </td>
                <td class="px-6 py-4 font-medium">
                    {{ student.selfMotivation ? ucWords(student.selfMotivation) : '-' }}
                </td>
                <td class="px-6 py-4 font-medium">
                    {{ student.selfEfficacy ? ucWords(student.selfEfficacy) : '-' }}
                </td>
                <td class="px-6 py-4 font-medium">
                    {{ student.studyHabits ? ucWords(student.studyHabits) : '-' }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAssessment, useLearningStyles } from '@/composables/assessment'
import { ucWords } from '@/composables/questions'
import { computed, onMounted } from 'vue'

const assessment = useAssessment()
const props = defineProps({
    assessmentData: Array,
    category: String,
})
const assessmentData = computed(() => {
    let data = []
    props.assessmentData.map((studentData: any) => {
        let newData = {
            name: studentData.lastName + ', ' + studentData.firstName,
            learningStyle: useLearningStyles().assessLearnerStyle(studentData, 'learning style').picked,
            selfMotivation: assessment.assessmentResult(parseFloat(assessment.calculateAssessment(studentData, 'self-motivation'))),
            selfEfficacy: assessment.assessmentResult(parseFloat(assessment.calculateAssessment(studentData, 'self-efficacy'))),
            studyHabits: assessment.assessmentResult(parseFloat(assessment.calculateAssessment(studentData, 'study habits'))),
        }
        data.push(newData)
    })
    return data
})
onMounted(() => {
})
</script>

<style>

</style>
