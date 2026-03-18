/**
 * שירות אימות וניהול משתמשים
 * מכיל פונקציות להתחברות, הרשמות, עדכון פרטים וטיפול בתמונות פרופיל
 */
import axios from './axios';
import { UserLoginType, UserType } from '../types/userType';

const url = '/api';

/**
 * מנרמל כתובת תמונה - מוסיף את כתובת השרת אם התמונה היא נתיב יחסי
 */
const normalizeImageUrl = (imageUrl: string | null | undefined): string | undefined => {
  if (!imageUrl || imageUrl === 'string') return undefined;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  return `${window.location.origin}/${imageUrl}`;
};

/**
 * רישום משתמש חדש
 */
export const register = async (formData: FormData) => {
  const response = await axios.post(`${url}/Users`, formData);
  return response.data;
};

/**
 * הוספת קשר בין מורה לכיתה
 */
export const addTeacherClass = async (teacherId: number, classId: number) => {
  const response = await axios.post(`${url}/TeacherClass`, {
    teacherId,
    classId
  });
  return response.data;
};

/**
 * התחברות משתמש
 */
export const login = async (credentials: UserLoginType) => {
  const response = await axios.post(`${url}/Login`, credentials);
  return response.data;
};

/**
 * עדכון פרטי משתמש
 * שולח נתיב יחסי לתמונה לשרת, ומחזיר עם URL מלא
 */
export const updateUser = async (userData: UserType, password?: string) => {
  const imagePath = userData.userImageUrl 
    ? userData.userImageUrl.replace(`${window.location.origin}/`, '') 
    : '';
    
  const updateData = {
    userId: userData.userId,
    userName: userData.userName,
    userEmail: userData.userEmail,
    role: userData.role === 'teacher' ? 'Teacher' : 'Student',
    classId: userData.classId,
    userImageUrl: imagePath,
    userPassword: password || ''
  };
  const response = await axios.put(`${url}/Users/${userData.userId}`, updateData);
  
  return {
    ...response.data,
    userImageUrl: normalizeImageUrl(response.data.userImageUrl)
  };
};

/**
 * אימות משתמש לפי טוקן
 * מחזיר את פרטי המשתמש אם הטוקן תקין
 */
export const loginByToken = async (token: string) => {
  const response = await axios.get(`${url}/Login/${token}`);
  const userData = response.data;
  return {
    userId: userData.userId,
    userName: userData.userName,
    userEmail: userData.userEmail,
    role: userData.role ? userData.role.toLowerCase() : 'student',
    userImageUrl: normalizeImageUrl(userData.userImageUrl),
    classId: userData.classId
  };
};
