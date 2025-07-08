import { ref } from 'vue'

export function useLearningStyles() {
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
    const extractCategory = (studentData: any, category: string) => {
        return studentData.assessment.filter((item: any) => {
            return item.category.toLowerCase() === category.toLowerCase()
        })?.[0]
    }
    const calculateScore = (studentData: any, category: string) => {
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
        const maxScore = Math.max(learnerStyleScore.visual, learnerStyleScore.auditory, learnerStyleScore.tactile);
        if(maxScore > 0){
            learnerStyleScore.picked = ""
            if (learnerStyleScore.visual === maxScore) learnerStyleScore.picked += 'visual, ';
            if (learnerStyleScore.auditory === maxScore) learnerStyleScore.picked += 'auditory, ';
            if (learnerStyleScore.tactile === maxScore) learnerStyleScore.picked += 'tactile, ';
            learnerStyleScore.picked = learnerStyleScore.picked.slice(0, -2);
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
