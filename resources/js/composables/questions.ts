import { ref } from 'vue'

export function ucWords(str: string) {
    return str
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase())
}
export function useQuestions() {
  return ref([
    {
        category: "Learning Style",
        options: ["Rarely (Low Frequency)", "Sometimes (Medium Frequency)", "Always (High Frequency)"],
        submitted: false,
        questions: [
            {
              question: "I remember something better if I write it down.",
              answer: "",
              style: "visual"
            },
            {
              question: "My written work doesn’t look neat to me. My papers have crossed-out words and erasures.",
              answer: "",
              style: "auditory"
            },
            {
              question: "I get lost or am late if someone tells me how to get to a new place, and I don’t write down the directions.",
              answer: "",
              style: "visual"
            },
            {
              question: "I tend to solve problems through a more trial-and-error approach, rather than from a step-by-step method.",
              answer: "",
              style: "tactile"
            },
            {
              question: "I am not skilled in giving verbal explanations or directions.",
              answer: "",
              style: "tactile"
            },
            {
              question: "I understand how to do something if someone tells me, rather than having to read the same thing to myself.",
              answer: "",
              style: "auditory"
            },
            {
              question: "It’s hard for me to understand a joke when someone tells me.",
              answer: "",
              style: "visual"
            },
            {
              question: "I learn best when I am shown how to do something, and I have the opportunity to do it.",
              answer: "",
              style: "tactile"
            },
            {
              question: "When I can’t think of a specific word, I’ll use my hands a lot and call something a “what-cha-ma-call-it” or a “thing-a-ma-jig.”",
              answer: "",
              style: "tactile"
            },
            {
              question: "I remember things that I hear, rather than things that I see or read.",
              answer: "",
              style: "auditory"
            },
            {
              question: "It is better for me to get work done in a quiet place.",
              answer: "",
              style: "visual"
            },
            {
              question: "I enjoy doodling and even my notes have lots of pictures and arrows in them.",
              answer: "",
              style: "visual"
            },
            {
              question: "It helps to use my finger as a pointer when reading to keep my place.",
              answer: "",
              style: "auditory"
            },
            {
              question: "I think better when I have the freedom to move around.",
              answer: "",
              style: "tactile"
            },
            {
              question: "It’s hard for me to read other people’s handwriting.",
              answer: "",
              style: "auditory"
            },
            {
              question: "Papers with very small print, blotchy dittos or poor copies are tough on me.",
              answer: "",
              style: "auditory"
            },
            {
              question: "Using flashcards helps me to retain material for tests.",
              answer: "",
              style: "visual"
            },
            {
              question: "I don’t like to read directions; I’d rather just start doing.",
              answer: "",
              style: "tactile"
            },
            {
              question: "I do not become easily lost, even in strange surroundings.",
              answer: "",
              style: "tactile"
            },
            {
              question: "If I am taking a test, I can “see” the textbook page and where the answer is located.",
              answer: "",
              style: "visual"
            },
            {
              question: "Before I follow directions, it helps me to see someone else do it first.",
              answer: "",
              style: "tactile"
            },
            {
              question: "If I had the choice to learn new information through a lecture or textbook, I would choose to hear it rather than read it.",
              answer: "",
              style: "auditory"
            },
            {
              question: "Studying at a desk is not for me.",
              answer: "",
              style: "tactile"
            },
            {
              question: "My eyes get tired fast, even though the eye doctor says that my eyes are ok.",
              answer: "",
              style: "auditory"
            },
            {
              question: "When I read, I mix up words that look alike, such as “them” and “then,” “bad” and “dad.”",
              answer: "",
              style: "auditory"
            },
            {
              question: "I find myself needing frequent breaks while studying.",
              answer: "",
              style: "tactile"
            },
            {
              question: "It helps me to look at the person while listening; it keeps me focused.",
              answer: "",
              style: "visual"
            },
            {
              question: "When trying to remember someone’s telephone number, or something new like that, it helps me to get a picture of it in my mind.",
              answer: "",
              style: "visual"
            },
            {
              question: "It’s hard for me to understand what a person is saying when there are people talking or music playing.",
              answer: "",
              style: "visual"
            },
            {
              question: "Writing is tiring. I press down too hard with my pen or pencil.",
              answer: "",
              style: "auditory"
            }
          ]
      },
    {
        category: "Self-Motivation",
        options: null,
        submitted: false,
        questions: [
          {
            question: "I enjoy challenging myself by setting personal goals that help me grow in mathematics.",
            answer: ""
          },
          {
            question: "I find it satisfying to use different strategies and tools (e.g. creating study plan, applying real-world contexts, using digital apps, using artificial intelligence) that help me understand mathematics better.",
            answer: ""
          },
          {
            question: "I enjoy practicing mathematics problems because it helps me improve my skills.",
            answer: ""
          },
          {
            question: "I am curious about mathematics and enjoy exploring different problem-solving methods.",
            answer: ""
          },
          {
            question: "When I face difficulties in mathematics, I stay motivated and keep trying until I understand.",
            answer: ""
          },
          {
            question: "I view challenging mathematics problems as opportunities to learn and grow.",
            answer: ""
          },
          {
            question: "I feel fulfilled when I make progress in mathematics because I genuinely enjoy learning and improving.",
            answer: ""
          }
        ]
      },
      {
        category: "Self-Efficacy",
        options: null,
        submitted: false,
        questions: [
          {
            question: "I can manage learning mathematics with minimal assistance from my teacher.",
            answer: ""
          },
          {
            question: "If I struggle with a mathematics problem, I can find different strategies to solve it.",
            answer: ""
          },
          {
            question: "I am confident that I can handle unexpected challenges in mathematics.",
            answer: ""
          },
          {
            question: "I feel certain that I can grasp complex mathematics problems after working through them.",
            answer: ""
          }
        ]
    },
    {
      category: "Study Habits",
      options: null,
      submitted: false,
      questions: [
        {
          question: "I have a designated space specifically for studying mathematics that is free from distractions.",
          answer: ""
        },
        {
          question: "Feelings of fatigue or burnout often interfere with my ability to study mathematics effectively.",
          answer: ""
        },
        {
          question: "I frequently use techniques such as summarization, problem-solving practice, and diagramming while studying mathematics.",
          "answer": ""
        },
        {
          question: "I review my mathematics notes regularly after classes.",
          answer: ""
        },
        {
          question: "I manage my study time effectively when preparing for mathematics assignments and examination.",
          answer: ""
        },
        {
          question: "I create a study schedule specifically for mathematics and stick to it.",
          answer: ""
        },
        {
          "question": "I am satisfied with my current mathematics study habits.",
          answer: ""
        },
        {
          question: "My study habits contribute to my success in mathematics.",
          answer: ""
        }
      ]
    },

    {
      category: "Instructional Factors",
      options: null,
      submitted: false,
      questions: [
        {
          question: "The classroom environment makes me feel comfortable asking questions when I don’t understand something in mathematics.",
          answer: ""
        },
        {
          question: "The pace at which my mathematics teacher presents new material allows me to fully grasp each topic before moving on.",
          answer: ""
        },
        {
          question: "The feedback I receive from my mathematics teacher helps me understand my mistakes and improve my skills.",
          answer: ""
        },
        {
          question: "Working in groups or participating in collaborative activities helps me better understand and learn mathematical concepts.",
          answer: ""
        },
        {
          question: "The way mathematics is taught in my class makes me more interested in the subject.",
          answer: ""
        },
        {
          "question": "My mathematics teacher provides individual attention when extra help is needed.",
          answer: ""
        },
        {
          question: "The use of technology (e.g., calculators, computers, online resources) in my mathematics class helps me understand the material better.",
          answer: ""
        }
      ]
    },

  ])
}
