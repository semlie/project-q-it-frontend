/**
 * הגדרות Axios לבקשות HTTP
 * מכיל interceptor להוספת טוקן אימות וטיפול בשגיאות
 */
import axios from 'axios';
import { getSession } from '../auth/auth.utils';

// כתובת השרת - משתנה סביבתית או ברירת מחדל לשרת מקומי
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// יצירת מופע Axios עם כתובת בסיס
const axiosInstance = axios.create({ baseURL });

// Interceptor לבקשות יוצאות - מוסיף טוקן אימות לכל בקשה
axiosInstance.interceptors.request.use((request) => {
  const token = getSession();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

// Interceptor לתגובות - מטפל בשגיאת 401 (לא מאומת)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // הסרת הטוקן מהאחסון המקומי והפניה לדף התחברות
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
