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
    'visual': [2,3,7,10,14,16,19,22],
    'auditory': [1,5,8,11,13,18,21,24],
    'tactile': [4,6,9,12,15,17,20,23],
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
        score: 3
    },
    {
        label: 'Always (High Frequency)',
        value: 'always',
        score: 5
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
            if(options.value[i].label === studentData.questions[question-1].answer){
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
        if(learnerStyleScore.visual > 0 && learnerStyleScore.auditory > 0 && learnerStyleScore.tactile > 0){
            learnerStyleScore.picked = learnerStyleScore.visual > learnerStyleScore.auditory && learnerStyleScore.visual > learnerStyleScore.tactile ? 'visual' : learnerStyleScore.auditory > learnerStyleScore.visual && learnerStyleScore.auditory > learnerStyleScore.tactile ? 'auditory' : 'tactile'
        }else{
            learnerStyleScore.picked = 'unknown'
        }
        studentData.learningStyle = learnerStyleScore
    })
    return props.assessmentData
})
const visualStudents = computed(() => {
    return assessedStudents.value.filter((student: any) => {
        return student.learningStyle.picked === 'visual'
    })
})
const auditoryStudents = computed(() => {
    return assessedStudents.value.filter((student: any) => {
        return student.learningStyle.picked === 'auditory'
    })
})
const tactileStudents = computed(() => {
    return assessedStudents.value.filter((student: any) => {
        return student.learningStyle.picked === 'tactile'
    })
})
onMounted(() => {
    // console.log(assessedStudents.value)
    // console.log(visualStudents.value)
    // console.log(auditoryStudents.value)
    // console.log(tactileStudents.value)
    // console.log(props.assessmentData)
    // console.log()
})
</script>

<style>

</style>
