/**
 * שירות סטטיסטיקות
 * מכיל פונקציות לקבלת נתונים סטטיסטיים של תלמידים ומורים
 */
import axios from './axios';

const url = '/api';

// ממשקים לסוגי הנתונים השונים
export interface OverallStat {
  label: string;
  value: string;
  change?: string;
  trend?: string;
}

export interface RecentTest {
  id: number;
  subject: string;
  title: string;
  date: Date | string;
  score: number;
  maxScore: number;
  duration: string;
}

export interface StudyHabits {
  day: string;
  hours: number;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  date: Date | string;
  type: string;
}

export interface WeeklyProgressItem {
  day: string;
  tests: number;
  hours: number;
  average: number;
}

export interface TeacherOverallStat {
  label: string;
  value: string;
  change?: string;
  trend?: string;
}

export interface ClassProgress {
  className: string;
  average: number;
  students: number;
  tests: number;
  trend: string;
}

export interface TeacherSubjectItem {
  subject: string;
  classes: number;
  students: number;
  averageGrade: number;
  testsCreated: number;
  trend: string;
}

// ==================== פונקציות סטטיסטיקה לתלמידים ====================

/**
 * קבלת סטטיסטיקה כללית של תלמיד
 * @param userId - ID של התלמיד
 */
export const getStudentOverallStats = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/overall`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת סטטיסטיקה כללית:', error);
    throw error;
  }
};

/**
 * קבלת מבחנים אחרונים של תלמיד
 * @param userId - ID של התלמיד
 */
export const getStudentRecentTests = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/recent-tests`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת מבחנים אחרונים:', error);
    throw error;
  }
};

/**
 * קבלת הרגלי למידה של תלמיד
 * @param userId - ID של התלמיד
 */
export const getStudentStudyHabits = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/study-habits`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת הרגלי למידה:', error);
    throw error;
  }
};

/**
 * קבלת הישגים של תלמיד
 * @param userId - ID של התלמיד
 */
export const getStudentAchievements = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/achievements`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת הישגים:', error);
    throw error;
  }
};

/**
 * קבלת התקדמות שבועית של תלמיד
 * @param userId - ID של התלמיד
 */
export const getStudentWeeklyProgress = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/weekly-progress`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת התקדמות שבועית:', error);
    throw error;
  }
};

// ==================== פונקציות סטטיסטיקה למורים ====================

/**
 * קבלת סטטיסטיקה כללית של מורה
 * @param userId - ID של המורה
 */
export const getTeacherOverallStats = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/teacher/${userId}/overall`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת סטטיסטיקה כללית:', error);
    throw error;
  }
};

/**
 * קבלת התקדמות כיתות של מורה
 * @param userId - ID של המורה
 */
export const getTeacherClassProgress = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/teacher/${userId}/class-progress`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת התקדמות כיתות:', error);
    throw error;
  }
};

/**
 * קבלת נושאים של מורה
 * @param userId - ID של המורה
 */
export const getTeacherSubjects = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/teacher/${userId}/subjects`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת נושאים:', error);
    throw error;
  }
};

/**
 * קבלת מבחנים אחרונים של מורה
 * @param userId - ID של המורה
 */
export const getTeacherRecentTests = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/teacher/${userId}/recent-tests`);
    return response.data;
  } catch (error) {
    console.error('שגיאה בקבלת מבחנים אחרונים:', error);
    throw error;
  }
};
