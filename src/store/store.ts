/**
 * קונפיגורציית Redux Store
 * מכיל את כל ה-slices של האפליקציה
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import coursesReducer from './slices/coursesSlice';
import chaptersReducer from './slices/chaptersSlice';
import questionsReducer from './slices/questionsSlice';

/**
 * יצירת ה-Store עם כל ה-reducers
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,        // ניהול אימות ומשתמשים
    courses: coursesReducer,  // ניהול קורסים
    chapters: chaptersReducer, // ניהול פרקים
    questions: questionsReducer, // ניהול שאלות ומבחנים
  },
});

/**
 * טיפוס למצב השורש של ה-Store
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * טיפוס ל-Dispatch של ה-Store
 */
export type AppDispatch = typeof store.dispatch;
