import { create } from "zustand";
import { State } from "../types";
import { devtools, persist } from "zustand/middleware";
import Confetti from 'react-confetti'

const API_URL = import.meta.env.PROD ? 'https://guille-react-13.surge.sh/' : 'http://localhost:5173/'

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  
  return {
    loading: false,
    questions: [],
    currentQuestion: 0, // Array position of question

    fetchQuestions: async (limit: number) => {
      const res = await fetch(`${API_URL}/data.json`);
      const json = await res.json();

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions }, false, 'FETCH_QUESTIONS');
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
        const { questions } = get()
        // use  structuredClone to clone the object
        const newQuestions = structuredClone(questions)
        // Find the Index for the Question
        const questionIndex = newQuestions.findIndex(q => q.id === questionId)
        // Get the info from the question
        const questionInfo = newQuestions[questionIndex]
        // Check out if the user have been select the correct answer 
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
  
        if (isCorrectUserAnswer) Confetti
  
        // change this information with the copy of the question
        newQuestions[questionIndex] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex
        }
        // Update the State
        set({ questions: newQuestions }, false, 'SELECT_ANSWER')
      },
  
      goNextQuestion: () => {
        const { currentQuestion, questions } = get()
        const nextQuestion = currentQuestion + 1
  
        if (nextQuestion < questions.length) {
          set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
        }
      },
  
      goPreviousQuestion: () => {
        const { currentQuestion } = get()
        const previousQuestion = currentQuestion - 1
  
        if (previousQuestion >= 0) {
          set({ currentQuestion: previousQuestion }, false, 'GO_PREVIOUS_QUESTION')
        }
      },
  
      reset: () => {
        set({ currentQuestion: 0, questions: [] }, false, 'RESET')
      }
    }
  }, {
    name: 'questions'
})));
