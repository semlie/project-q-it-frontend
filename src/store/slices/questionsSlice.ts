import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getQuestionsForChapter, 
  submitAnswer, 
  finishTest, 
  TestQuestion, 
  AnswerResult,
  TestResult 
} from '../../services/test.service';

interface QuestionsState {
  questions: TestQuestion[];
  currentQuestionIndex: number;
  answers: { [questionId: number]: string };
  results: AnswerResult[];
  testResult: TestResult | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: QuestionsState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  results: [],
  testResult: null,
  isLoading: false,
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetch',
  async ({ chapterId, level }: { chapterId: number; level?: number }, { rejectWithValue }) => {
    try {
      const questions = await getQuestionsForChapter(chapterId, level);
      return questions;
    } catch (error) {
      return rejectWithValue('Failed to fetch questions');
    }
  }
);

export const submitAnswerAsync = createAsyncThunk(
  'questions/submitAnswer',
  async ({ studentId, questionId, selectedAnswerId }: { 
    studentId: number; 
    questionId: number; 
    selectedAnswerId: string 
  }, { rejectWithValue }) => {
    try {
      const result = await submitAnswer(studentId, questionId, selectedAnswerId);
      return { questionId, result };
    } catch (error) {
      return rejectWithValue('Failed to submit answer');
    }
  }
);

export const finishTestAsync = createAsyncThunk(
  'questions/finishTest',
  async ({ studentId, chapterId, duration, correctCount, totalQuestions }: { 
    studentId: number; 
    chapterId: number; 
    duration: number; 
    correctCount: number; 
    totalQuestions: number 
  }, { rejectWithValue }) => {
    try {
      const result = await finishTest(studentId, chapterId, duration, correctCount, totalQuestions);
      return result;
    } catch (error) {
      return rejectWithValue('Failed to finish test');
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    setAnswer: (state, action: PayloadAction<{ questionId: number; answerId: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answerId;
    },
    resetTest: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.results = [];
      state.testResult = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
        state.currentQuestionIndex = 0;
        state.answers = {};
        state.results = [];
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(submitAnswerAsync.fulfilled, (state, action) => {
        state.results.push(action.payload.result);
      })
      .addCase(finishTestAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(finishTestAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testResult = action.payload;
      })
      .addCase(finishTestAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setCurrentQuestion, 
  nextQuestion, 
  previousQuestion, 
  setAnswer, 
  resetTest,
  clearError 
} = questionsSlice.actions;
export default questionsSlice.reducer;
