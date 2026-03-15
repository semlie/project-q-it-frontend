import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getStudentOverallStats,
  getStudentSubjectPerformance,
  getStudentRecentTests,
  getStudentStudyHabits,
  getStudentAchievements,
  getStudentWeeklyProgress,
  getTeacherOverallStats,
  getTeacherClassProgress,
  getTeacherSubjects,
  getTeacherRecentTests,
} from '../../services/stats.service';

interface StatsState {
  student: {
    overall: any[];
    subjectPerformance: any[];
    recentTests: any[];
    studyHabits: any[];
    achievements: any[];
    weeklyProgress: any[];
  };
  teacher: {
    overall: any[];
    classProgress: any[];
    subjects: any[];
    recentTests: any[];
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  student: {
    overall: [],
    subjectPerformance: [],
    recentTests: [],
    studyHabits: [],
    achievements: [],
    weeklyProgress: [],
  },
  teacher: {
    overall: [],
    classProgress: [],
    subjects: [],
    recentTests: [],
  },
  isLoading: false,
  error: null,
};

export const fetchStudentOverallStats = createAsyncThunk(
  'stats/fetchStudentOverall',
  async (userId: number, { rejectWithValue }) => {
    try {
      const stats = await getStudentOverallStats(userId);
      return stats;
    } catch (error) {
      return rejectWithValue('Failed to fetch student stats');
    }
  }
);

export const fetchStudentSubjectPerformance = createAsyncThunk(
  'stats/fetchStudentSubjects',
  async ({ userId, timeRange }: { userId: number; timeRange?: string }, { rejectWithValue }) => {
    try {
      const stats = await getStudentSubjectPerformance(userId, timeRange);
      return stats;
    } catch (error) {
      return rejectWithValue('Failed to fetch subject performance');
    }
  }
);

export const fetchStudentRecentTests = createAsyncThunk(
  'stats/fetchStudentRecentTests',
  async (userId: number, { rejectWithValue }) => {
    try {
      const tests = await getStudentRecentTests(userId);
      return tests;
    } catch (error) {
      return rejectWithValue('Failed to fetch recent tests');
    }
  }
);

export const fetchStudentStudyHabits = createAsyncThunk(
  'stats/fetchStudentStudyHabits',
  async (userId: number, { rejectWithValue }) => {
    try {
      const habits = await getStudentStudyHabits(userId);
      return habits;
    } catch (error) {
      return rejectWithValue('Failed to fetch study habits');
    }
  }
);

export const fetchStudentAchievements = createAsyncThunk(
  'stats/fetchStudentAchievements',
  async (userId: number, { rejectWithValue }) => {
    try {
      const achievements = await getStudentAchievements(userId);
      return achievements;
    } catch (error) {
      return rejectWithValue('Failed to fetch achievements');
    }
  }
);

export const fetchStudentWeeklyProgress = createAsyncThunk(
  'stats/fetchStudentWeeklyProgress',
  async (userId: number, { rejectWithValue }) => {
    try {
      const progress = await getStudentWeeklyProgress(userId);
      return progress;
    } catch (error) {
      return rejectWithValue('Failed to fetch weekly progress');
    }
  }
);

export const fetchTeacherOverallStats = createAsyncThunk(
  'stats/fetchTeacherOverall',
  async (userId: number, { rejectWithValue }) => {
    try {
      const stats = await getTeacherOverallStats(userId);
      return stats;
    } catch (error) {
      return rejectWithValue('Failed to fetch teacher stats');
    }
  }
);

export const fetchTeacherClassProgress = createAsyncThunk(
  'stats/fetchTeacherClassProgress',
  async (userId: number, { rejectWithValue }) => {
    try {
      const progress = await getTeacherClassProgress(userId);
      return progress;
    } catch (error) {
      return rejectWithValue('Failed to fetch class progress');
    }
  }
);

export const fetchTeacherSubjects = createAsyncThunk(
  'stats/fetchTeacherSubjects',
  async (userId: number, { rejectWithValue }) => {
    try {
      const subjects = await getTeacherSubjects(userId);
      return subjects;
    } catch (error) {
      return rejectWithValue('Failed to fetch subjects');
    }
  }
);

export const fetchTeacherRecentTests = createAsyncThunk(
  'stats/fetchTeacherRecentTests',
  async (userId: number, { rejectWithValue }) => {
    try {
      const tests = await getTeacherRecentTests(userId);
      return tests;
    } catch (error) {
      return rejectWithValue('Failed to fetch recent tests');
    }
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearStats: (state) => {
      state.student = initialState.student;
      state.teacher = initialState.teacher;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentOverallStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStudentOverallStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.student.overall = action.payload;
      })
      .addCase(fetchStudentOverallStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStudentSubjectPerformance.fulfilled, (state, action) => {
        state.student.subjectPerformance = action.payload;
      })
      .addCase(fetchStudentRecentTests.fulfilled, (state, action) => {
        state.student.recentTests = action.payload;
      })
      .addCase(fetchStudentStudyHabits.fulfilled, (state, action) => {
        state.student.studyHabits = action.payload;
      })
      .addCase(fetchStudentAchievements.fulfilled, (state, action) => {
        state.student.achievements = action.payload;
      })
      .addCase(fetchStudentWeeklyProgress.fulfilled, (state, action) => {
        state.student.weeklyProgress = action.payload;
      })
      .addCase(fetchTeacherOverallStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeacherOverallStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacher.overall = action.payload;
      })
      .addCase(fetchTeacherOverallStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTeacherClassProgress.fulfilled, (state, action) => {
        state.teacher.classProgress = action.payload;
      })
      .addCase(fetchTeacherSubjects.fulfilled, (state, action) => {
        state.teacher.subjects = action.payload;
      })
      .addCase(fetchTeacherRecentTests.fulfilled, (state, action) => {
        state.teacher.recentTests = action.payload;
      });
  },
});

export const { clearStats, clearError } = statsSlice.actions;
export default statsSlice.reducer;
