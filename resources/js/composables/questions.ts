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
            question: "I can remember best by listening to a lecture that includes information, explanations and discussions.",
            answer: ""
          },
          {
            question: "I prefer to see information written on the board and supplemented by visual aids and assigned readings",
            answer: ""
          },
          {
            question: "I like to write things down or take notes for visual review.",
            answer: ""
          },
          {
            question: "I prefer to use posters, models, or actual practice and other activities in class.",
            answer: ""
          },
          {
            question: "I require explanations of diagrams, graphs, or visual directions",
            answer: ""
          },
          {
            question: "I enjoy working with my hands or making things.",
            answer: ""
          },
          {
            question: "I am skillful with and enjoy developing making graphs and charts",
            answer: ""
          },
          {
            question: "I can tell if sounds match when presented with pairs of sounds.",
            answer: ""
          },
          {
            question: "I can remember best by writing things down several times.",
            answer: ""
          },
          {
            question: "I can easily understand and follow directions on a map.",
            answer: ""
          },
          {
            question: "I do best in academic subjects by listening to lectures and tapes.",
            answer: ""
          },
          {
            question: "I play with coins or keys in my pocket.",
            answer: ""
          },
          {
            question: "I learn to spell better by repeating words out loud than by writing the words on paper.",
            answer: ""
          },
          {
            question: "I can understand a news article better by reading about it in the newspaper or online rather than by listening to a report about it on the radio or internet.",
            answer: ""
          },
          {
            question: "I chew gum, smoke or snack while studying.",
            answer: ""
          },
          {
            question: "I think the best way to remember something is to picture it in my mind",
            answer: ""
          },
          {
            question: "I learn the spelling of words by “finger spelling” them.",
            answer: ""
          },
          {
            question: "I would rather listen to a good lecture or speech than read about the same material.",
            answer: ""
          },
          {
            question: "I am good at working and solving jigsaw puzzles and mazes.",
            answer: ""
          },
          {
            question: "I grip objects in my hands during learning periods.",
            answer: ""
          },
          {
            question: "I prefer listening to the news on the radio or online rather than reading about it in a newspaper or on the internet.",
            answer: ""
          },
          {
            question: "I prefer obtaining information about an interesting subject by reading about it.",
            answer: ""
          },
          {
            question: "I feel very comfortable touching others hugging, handshaking, etc.",
            answer: ""
          },
          {
            question: "I follow oral directions better than written ones.",
            answer: ""
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
