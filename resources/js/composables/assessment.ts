import { ref } from 'vue'

export function useLearningStyles() {
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
    const extractCategory = (studentData: any, category: string) => {
        return studentData.assessment.filter((item: any) => {
            return item.category.toLowerCase() === category.toLowerCase()
        })?.[0]
    }
    const calculateScore = (studentData: any, category: string) => {
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
    const assessLearnerStyle = (studentData: any, category: string) => {
        let learnerStyleScore = {
            visual: 0,
            auditory: 0,
            tactile: 0,
            picked:''
        }
        learnerStyleScore.visual = calculateScore(extractCategory(studentData, category), 'visual')
        learnerStyleScore.auditory = calculateScore(extractCategory(studentData, category), 'auditory')
        learnerStyleScore.tactile = calculateScore(extractCategory(studentData, category), 'tactile')
        if(learnerStyleScore.visual > 0 && learnerStyleScore.auditory > 0 && learnerStyleScore.tactile > 0){
            learnerStyleScore.picked = learnerStyleScore.visual > learnerStyleScore.auditory && learnerStyleScore.visual > learnerStyleScore.tactile ? 'visual' : learnerStyleScore.auditory > learnerStyleScore.visual && learnerStyleScore.auditory > learnerStyleScore.tactile ? 'auditory' : 'tactile'
        }else{
            learnerStyleScore.picked = '-'
        }
        return learnerStyleScore
    }
    return {
        extractCategory,
        calculateScore,
        assessLearnerStyle
    }
}

export function useAssessment() {
    const scoring = {
        'very low': 1,
        'low': 2,
        'average': 3,
        'high': 4,
        'very high': 5
    }
    const calculateAssessment = (assessment: any[], category: string) => {
        const categoryData = assessment.assessment.filter((item: any) => item.category.toLowerCase() === category.toLowerCase())
        let score = 0
        categoryData[0]?.questions.map((item: any) => {
            score += scoring[item.answer?.toLowerCase()]
        })
        return (score / categoryData[0]?.questions.length).toFixed(1)
    }
    const assessmentResult = (score: number) => {
        if (score >= 1 && score <= 1.79) {
            return 'very low'
        } else if (score >= 1.8 && score <= 2.59) {
            return 'low'
        } else if (score >= 2.6 && score <= 3.39) {
            return 'average'
        } else if (score >= 3.4 && score <= 4.19) {
            return 'high'
        } else if (score >= 4.2) {
            return 'very high'
        }
    }
    return {
        calculateAssessment,
        assessmentResult
    }
}
