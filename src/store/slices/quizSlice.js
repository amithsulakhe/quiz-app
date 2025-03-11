import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  answers: {},
  messages: [],
  questions: [],
  isSubmitted: false,
  loading: false,
  error: null,
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setQuestions: (state, action) => {
      state.questions = action.payload
    
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload
      state.answers[questionId] = answer
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    submitQuiz: (state) => {
      state.isSubmitted = true
    },
    resetQuiz: () => initialState,
  },
})

export const { 
  setLoading, 
  setError, 
  setQuestions, 
  setAnswer, 
  addMessage, 
  submitQuiz, 
  resetQuiz 
} = quizSlice.actions

export default quizSlice.reducer