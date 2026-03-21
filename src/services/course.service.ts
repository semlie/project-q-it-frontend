/**
 * שירות ניהול קורסים
 * מכיל פונקציות לקבלת קורסים והוספת קורס חדש
 */
import axios from './axios';
import { CourseType } from '../types/courseType';

// כתובת הבסיס של ה-API
const url = '/api';

/**
 * קבלת כל הקורסים של משתמש לפי ID
 * עבור מורים - מחזיר את הקורסים שהמורה אחראי עליהם
 * עבור תלמידים - מחזיר את הקורסים של הכיתה שלהם
 */
export const getCoursesByUserId = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Users/${userId}/courses`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת קורסים:', error);
    throw error;
  }
};

/**
 * קבלת הכיתות של מורה לפי ID
 * מחזיר את רשימת הכיתות שהמורה מלמד
 */
export const getCoursesByTeacherId = async (teacherId: number) => {
  try {
    const response = await axios.get(`${url}/TeacherClass/byTeacher/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת קורסים:', error);
    throw error;
  }
};

/**
 * קבלת כל הקורסים של כיתה לפי ID
 * מחזיר את כל הקורסים השייכים לכיתה ספציפית
 */
export const getCoursesByClassId = async (classId: number) => {
  try {
    const response = await axios.get(`${url}/Course/class/${classId}`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת קורסים:', error);
    throw error;
  }
};

/**
 * הוספת קורס חדש
 * שולח את פרטי הקורס לשרת ליצירה
 */
export const addCourse = async (credentials: CourseType) => {
  try {
    const response = await axios.post(`${url}/Course`, credentials);
    return response.data;
  } catch (error) {
    console.error('שגיאה בהוספת קורס:', error);
    throw error;
  }
};
