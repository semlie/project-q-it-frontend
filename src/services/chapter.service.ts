/**
 * שירות ניהול פרקים
 * מכיל פונקציות לקבלת פרקים לפי משתמש או קורס, והוספת פרק חדש
 */
import axios from './axios';
import { ChapterType } from '../types/chapterType';

const url = '/api';

/**
 * קבלת פרקים לפי ID של משתמש
 * מחזיר את כל הפרקים של המשתמש
 */
export const getChaptersByIdUser = async (userId: number) => {
  const response = await axios.get(`${url}/Chapter/${userId}`);
  const data = response.data;
  return data;
};

/**
 * הוספת פרק חדש
 * שולח את פרטי הפרק לשרת ליצירה
 */
export const addChapter = async (credentials: ChapterType) => {
  const response = await axios.post(`${url}/Chapter`, credentials);
  const data = response.data;
  return data;
};

/**
 * קבלת פרקים לפי ID של קורס
 * מחזיר את כל הפרקים השייכים לקורס ספציפי
 */
export const getChaptersByCourseId = async (courseId: number) => {
  const response = await axios.get(`${url}/Chapter/course/${courseId}`);
  const data = response.data;
  return data;
};
