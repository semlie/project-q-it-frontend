import axios from './axios';

const url = '/api';

export interface OverallStat {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ReactNode;
  color?: string;
  total?: string;
}

export interface SubjectPerformanceItem {
  subject: string;
  average: number;
  lastGrade: number;
  trend: 'up' | 'down' | 'stable';
  tests: number;
  classAverage: number;
  color: string;
  strength: string;
}

export interface RecentTest {
  id: number;
  subject: string;
  title: string;
  date: string;
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
  date: string;
  type: 'grade' | 'streak' | 'completion' | 'mastery';
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
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ReactNode;
  color?: string;
  total?: string;
}

export interface ClassProgress {
  className: string;
  average: number;
  students: number;
  tests: number;
  trend: 'up' | 'down' | 'stable';
}

export interface TeacherSubjectItem {
  subject: string;
  classes: number;
  students: number;
  averageGrade: number;
  testsCreated: number;
  trend: 'up' | 'down' | 'stable';
}

export const getStudentOverallStats = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/overall`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student overall stats:', error);
    throw error;
  }
};

export const getStudentSubjectPerformance = async (userId: number, timeRange: string = 'semester') => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/subjects?timeRange=${timeRange}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subject performance:', error);
    throw error;
  }
};

export const getStudentRecentTests = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/recent-tests`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent tests:', error);
    throw error;
  }
};

export const getStudentStudyHabits = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/study-habits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching study habits:', error);
    throw error;
  }
};

export const getStudentAchievements = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/achievements`);
    return response.data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }
};

export const getStudentWeeklyProgress = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/student/${userId}/weekly-progress`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly progress:', error);
    throw error;
  }
};

export const getTeacherOverallStats = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/teacher/${userId}/overall`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher overall stats:', error);
    throw error;
  }
};

export const getTeacherClassProgress = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/teacher/${userId}/class-progress`);
    return response.data;
  } catch (error) {
    console.error('Error fetching class progress:', error);
    throw error;
  }
};

export const getTeacherSubjects = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/teacher/${userId}/subjects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher subjects:', error);
    throw error;
  }
};

export const getTeacherRecentTests = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Stats/teacher/${userId}/recent-tests`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher recent tests:', error);
    throw error;
  }
};
