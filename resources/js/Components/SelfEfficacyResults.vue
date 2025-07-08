<template>
    <div class="mb-32">
      <div class="flex px-64 mb-32">
          <AssessmentPieChartPercentage :assessmentData="chartData" category="Self Efficacy" />
      </div>
      <!-- <table class="w-full border">
          <thead>
              <tr>
                  <th class="border px-2 py-1 text-left w-1/5">Very Low</th>
                  <th class="border px-2 py-1 text-left w-1/5">Low</th>
                  <th class="border px-2 py-1 text-left w-1/5">Average</th>
                  <th class="border px-2 py-1 text-left w-1/5">High</th>
                  <th class="border px-2 py-1 text-left w-1/5">Very High</th>
              </tr>
          </thead>
          <tbody>
              <tr class="text-xs" v-for="assessment in transposedAssessment" :key="assessment.id">
                  <td v-for="item in assessment.data" class="border px-3 py-2">
                      <div class="flex gap-2">
                          <span :class="item.hasData ? 'text-[10px] bg-green-600 text-white p-[1px] px-[2px] w-5 text-center h-fit rounded' : ''">
                              {{ item.score }}
                          </span>
                          <span class="text-xs text-slate-600">
                              {{ item.name }}
                          </span>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table> -->
      <div class="overflow-x-auto">
          <table class="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                  <tr>
                      <th class="px-6 py-3 text-left w-1/5">Very Low</th>
                      <th class="px-6 py-3 text-left w-1/5">Low</th>
                      <th class="px-6 py-3 text-left w-1/5">Average</th>
                      <th class="px-6 py-3 text-left w-1/5">High</th>
                      <th class="px-6 py-3 text-left w-1/5">Very High</th>
                  </tr>
              </thead>
              <tbody class="text-gray-800 text-sm divide-y divide-gray-100">
              <!-- Repeatable Row -->
              <tr v-for="assessment in transposedAssessment" :key="assessment.id" class="hover:bg-gray-50 transition">
                  <td v-for="item in assessment.data" class="px-6 py-4 font-medium">
                      <div class="flex gap-2">
                          <!-- <span :class="item.hasData ? 'text-[10px] bg-green-600 text-white p-[1px] px-[2px] w-6 text-center h-fit rounded' : ''">
                              {{ item.score }}
                          </span> -->
                          <span class="text-xs text-slate-600">
                              {{ item.name }}
                          </span>
                      </div>
                  </td>
              </tr>
              </tbody>
          </table>
      </div>

    </div>
  </template>

  <script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import AssessmentPieChartPercentage from './charts/AssessmentPieChartPercentage.vue'
  const scoring = {
          'very low': 1,
          'low': 2,
          'average': 3,
          'high': 4,
          'very high': 5
      }
  const props = defineProps({
      assessmentData: Array,
      category: String,
  })
  const assessmentResults = (assessment: any[], category: string) => {
      const categoryData = assessment.assessment.filter((item: any) => item.category.toLowerCase() === category.toLowerCase())

      let score = 0
      categoryData[0]?.questions.map((item: any) => {
          score += scoring[item.answer?.toLowerCase()]
      })
      return (score / categoryData[0]?.questions.length).toFixed(1)
  }
  const calculatedAssessment = computed(() => {
      let assessment = {
          veryLow: [],
          low: [],
          average: [],
          high: [],
          veryHigh: [],
      }
      for (let index = 0; index < props.assessmentData.length; index++) {
          let assessmentScore = assessmentResults(props.assessmentData[index], props.category)
          props.assessmentData[index].score = assessmentScore
          if (assessmentScore >= 1 && assessmentScore <= 1.79) {
              assessment.veryLow.push(props.assessmentData[index])
          } else if (assessmentScore >= 1.8 && assessmentScore <= 2.59) {
              assessment.low.push(props.assessmentData[index])
          } else if (assessmentScore >= 2.6 && assessmentScore <= 3.39) {
              assessment.average.push(props.assessmentData[index])
          } else if (assessmentScore >= 3.4 && assessmentScore <= 4.19) {
              assessment.high.push(props.assessmentData[index])
          } else if (assessmentScore >= 4.2) {
              assessment.veryHigh.push(props.assessmentData[index])
          }
      }
      return assessment
  })
  const transposeData = function (columns, filler = null) {
    const keys = Object.keys(columns)
    const maxLength = Math.max(...keys.map(k => columns[k].length))

    const rows = []
    for (let i = 0; i < maxLength; i++) {
      const row = {}
      for (const key of keys) {
        row[key] = columns[key][i] ?? filler
      }
      rows.push(row)
    }

    return rows
  }
  const transposedAssessment = computed(() => {
      let data = []
      transposeData(calculatedAssessment.value).map((item: any, index: number) => {
          data[index] = {
              data: []
          }
          for (let i in item){
              if(!item[i]){
                  data[index].data.push({
                      name: '',
                      score: '',
                      hasData: false
                  })
              }else{
                  data[index].data.push({
                      name: item[i].lastName + ', ' + item[i].firstName,
                      score: item[i].score,
                      hasData: true
                  })
              }
          }
      })
      return data
  })
  const chartData = computed(() => {
      let data = []
      data.push(calculatedAssessment.value.veryLow.length)
      data.push(calculatedAssessment.value.low.length)
      data.push(calculatedAssessment.value.average.length)
      data.push(calculatedAssessment.value.high.length)
      data.push(calculatedAssessment.value.veryHigh.length)
      return data
  })
  onMounted(() => {
    //   console.log(transposedAssessment.value)
  })
  </script>

  <style>

  </style>
