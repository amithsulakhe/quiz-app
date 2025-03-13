import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  answers: {},
  questions: [],
  isSubmitted: false,
  loading: false,
  error: null,
  submitted: false,
  score: 0,
  quizStarted: false,
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
    },
    setQuestions: (state, action) => {
      const question={
        ...action.payload,
        id:state.questions.length+1
      }
      state.questions.push(question)
    },
    startQuiz: (state) => {
      state.quizStarted = true;
      state.submitted = false;
      state.answers = {};
      state.score = 0;
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    submitQuiz: (state) => {
      state.submitted = true;
      // Calculate score
      let correctAnswers = 0;
      state.questions.forEach((question) => {
        if (state.answers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      state.score = correctAnswers;
    },

    resetQuiz: (state) => {
      state.answers = {};
      state.submitted = false;
      state.score = 0;
      state.questions=[];
    },
  },
})

export const { 
  setLoading, 
  setError, 
  setQuestions, 
  setAnswer, 
  submitQuiz, 
  startQuiz,
  resetQuiz 
} = quizSlice.actions

export default quizSlice.reducer