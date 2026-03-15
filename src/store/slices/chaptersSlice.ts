import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChaptersByCourseId, addChapter } from '../../services/chapter.service';
import { ChapterType } from '../types/chapterType';

interface ChaptersState {
  chapters: ChapterType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChaptersState = {
  chapters: [],
  isLoading: false,
  error: null,
};

export const fetchChaptersByCourse = createAsyncThunk(
  'chapters/fetchByCourse',
  async (courseId: number, { rejectWithValue }) => {
    try {
      const chapters = await getChaptersByCourseId(courseId);
      return chapters;
    } catch (error) {
      return rejectWithValue('Failed to fetch chapters');
    }
  }
);

export const createChapter = createAsyncThunk(
  'chapters/create',
  async (chapter: ChapterType, { rejectWithValue }) => {
    try {
      const newChapter = await addChapter(chapter);
      return newChapter;
    } catch (error) {
      return rejectWithValue('Failed to create chapter');
    }
  }
);

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    clearChapters: (state) => {
      state.chapters = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChaptersByCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChaptersByCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chapters = action.payload;
      })
      .addCase(fetchChaptersByCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createChapter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chapters.push(action.payload);
      })
      .addCase(createChapter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearChapters, clearError } = chaptersSlice.actions;
export default chaptersSlice.reducer;
