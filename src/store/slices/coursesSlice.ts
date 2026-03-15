import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCoursesByUserId, getCoursesByClassId, addCourse } from '../../services/course.service';
import { CourseType } from '../../types/courseType';

interface CoursesState {
  courses: CourseType[];
  selectedCourse: CourseType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  isLoading: false,
  error: null,
};

export const fetchCoursesByUser = createAsyncThunk(
  'courses/fetchByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      const courses = await getCoursesByUserId(userId);
      return courses;
    } catch (error) {
      return rejectWithValue('Failed to fetch courses');
    }
  }
);

export const fetchCoursesByClass = createAsyncThunk(
  'courses/fetchByClass',
  async (classId: number, { rejectWithValue }) => {
    try {
      const courses = await getCoursesByClassId(classId);
      return courses;
    } catch (error) {
      return rejectWithValue('Failed to fetch courses');
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/create',
  async (course: CourseType, { rejectWithValue }) => {
    try {
      const newCourse = await addCourse(course);
      return newCourse;
    } catch (error) {
      return rejectWithValue('Failed to create course');
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    clearCourses: (state) => {
      state.courses = [];
      state.selectedCourse = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCoursesByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursesByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCoursesByClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCoursesByClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursesByClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCourse, clearCourses, clearError } = coursesSlice.actions;
export default coursesSlice.reducer;
