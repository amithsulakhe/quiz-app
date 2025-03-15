import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  answers: {},
  questions: [],
  loading: false,
  error: null,
  submitted: false,
  quizStarted: false,
  isFeedback:false,
  totalQuestions:5
}


// quiz slice
export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setQuestions: (state, action) => {
      const question={
        ...action.payload,
        id:state.questions.length+1
      }
      state.questions.push(question)
    },
  
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    setIsFeedback:(state,action)=>{
      state.isFeedback=action.payload
    },
    resetQuiz: (state) => {
      state.answers = {};
      state.submitted = false;
      state.questions=[];
    },
  },
})

export const { 
  setLoading, 
  setError, 
  setQuestions, 
  setAnswer, 
  resetQuiz ,
  setIsFeedback
} = quizSlice.actions

export default quizSlice.reducer