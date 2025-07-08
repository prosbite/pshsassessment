<template>
    <div>
        <div class="px-72">
            <LearnerStylePieChartPercentage :assessmentData="[visualStudents.length, auditoryStudents.length, tactileStudents.length]" category="Learning Style" />
        </div>
        <div class="grid grid-cols-3 w-full gap-2 mb-32">
            <div class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <table class="min-w-full h-fit  overflow-hidden">
                  <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                      <tr>
                          <th class="px-6 py-3 text-left">Visual</th>
                      </tr>
                  </thead>
                  <tbody class="text-gray-800 text-sm divide-y divide-gray-100">
                  <!-- Repeatable Row -->
                  <tr v-for="visualStudent, index in visualStudents" :key="index" class="hover:bg-gray-50 transition h-12">
                      <td class="px-6 py-4 font-medium h-fit">
                          <div class="flex gap-2">
                              <span class="text-xs text-slate-600">
                                  {{ visualStudent.lastName + ', ' + visualStudent.firstName }}
                              </span>
                          </div>
                      </td>
                  </tr>
                  </tbody>
              </table>
            </div>

            <div class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <table class="min-w-full h-fit  overflow-hidden">
                  <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                      <tr>
                          <th class="px-6 py-3 text-left">Auditory</th>
                      </tr>
                  </thead>
                  <tbody class="text-gray-800 text-sm divide-y divide-gray-100">
                  <!-- Repeatable Row -->
                  <tr v-for="auditoryStudent, index in auditoryStudents" :key="index" class="hover:bg-gray-50 transition h-12">
                      <td class="px-6 py-4 font-medium h-fit">
                          <div class="flex gap-2">
                              <span class="text-xs text-slate-600">
                                  {{ auditoryStudent.lastName + ', ' + auditoryStudent.firstName }}
                              </span>
                          </div>
                      </td>
                  </tr>
                  </tbody>
              </table>
            </div>

            <div class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <table class="min-w-full h-fit  overflow-hidden">
                  <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                      <tr>
                          <th class="px-6 py-3 text-left">Tactile</th>
                      </tr>
                  </thead>
                  <tbody class="text-gray-800 text-sm divide-y divide-gray-100">
                  <!-- Repeatable Row -->
                  <tr v-for="tactileStudent, index in tactileStudents" :key="index" class="hover:bg-gray-50 transition">
                      <td class="px-6 py-4 font-medium h-fit">
                          <div class="flex gap-2">
                              <span class="text-xs text-slate-600">
                                  {{ tactileStudent.lastName + ', ' + tactileStudent.firstName }}
                              </span>
                          </div>
                      </td>
                  </tr>
                  </tbody>
              </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import LearnerStylePieChartPercentage from './charts/LearnerStylePieChartPercentage.vue'
const props = defineProps({
    assessmentData: Array,
    category: String,
})
const organizedQuestions = ref({
  visual: [0, 2, 6, 10, 11, 16, 19, 26, 27, 28],
  auditory: [1, 5, 9, 12, 14, 15, 21, 23, 24, 29],
  tactile: [3, 4, 7, 8, 13, 17, 18, 20, 22, 25]
})
const options = ref([
    {
        label: 'Rarely (Low Frequency)',
        value: 'rarely',
        score: 1
    },
    {
        label: 'Sometimes (Medium Frequency)',
        value: 'sometimes',
        score: 2
    },
    {
        label: 'Always (High Frequency)',
        value: 'always',
        score: 3
    }
])
const extractCategory = (studentData: {}[]) => {
    return studentData.assessment.filter((item: any) => {
        return item.category.toLowerCase() === props.category.toLowerCase()
    })?.[0]
}
const calculateScore = (studentData: {}[], category: string) => {
    let score = 0
    organizedQuestions.value[category].map((question: number) => {
        for(let i in options.value){
            if(options.value[i].label === studentData.questions[question].answer){
                score += options.value[i].score
            }
        }
    })
    return score
}
const assessedStudents = computed(() => {
    props.assessmentData.map((studentData: any) => {
        let learnerStyleScore = {
            visual: 0,
            auditory: 0,
            tactile: 0,
            picked:''
        }
        learnerStyleScore.visual = calculateScore(extractCategory(studentData), 'visual')
        learnerStyleScore.auditory = calculateScore(extractCategory(studentData), 'auditory')
        learnerStyleScore.tactile = calculateScore(extractCategory(studentData), 'tactile')
        const maxScore = Math.max(learnerStyleScore.visual, learnerStyleScore.auditory, learnerStyleScore.tactile);
        if(maxScore > 0){
            learnerStyleScore.picked = ""
            if (learnerStyleScore.visual === maxScore) learnerStyleScore.picked += 'visual, ';
            if (learnerStyleScore.auditory === maxScore) learnerStyleScore.picked += 'auditory, ';
            if (learnerStyleScore.tactile === maxScore) learnerStyleScore.picked += 'tactile, ';
            learnerStyleScore.picked = learnerStyleScore.picked.slice(0, -2);
        }else{
            learnerStyleScore.picked = 'unknown'
        }
        studentData.learningStyle = learnerStyleScore
    })
    return props.assessmentData
})
const visualStudents = computed(() => {
    return assessedStudents.value.filter((student: any) => {
        return student.learningStyle.picked.includes('visual')
    })
})
const auditoryStudents = computed(() => {
    return assessedStudents.value.filter((student: any) => {
        return student.learningStyle.picked.includes('auditory')
    })
})
const tactileStudents = computed(() => {
    return assessedStudents.value.filter((student: any) => {
        return student.learningStyle.picked.includes('tactile')
    })
})
</script>

<style>

</style>
