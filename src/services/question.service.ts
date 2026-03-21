/**
 * שירות ניהול שאלות
 * מכיל פונקציות להוספת שאלות ותשובות, וקבלת שאלות לפי קורס
 */
import axios from './axios';
import { QuestionType } from '../types/questionType';
import { AnswerOptionsType } from '../types/answerOptionsType';

const url = '/api';

/**
 * הוספת שאלה חדשה
 * שולח את פרטי השאלה לשרת ליצירה
 */
export const addQuestion = async (credentials: QuestionType) => {
  const response = await axios.post(`${url}/Question`, credentials);
  const data = response.data;
  return data;
};

/**
 * הוספת אפשרויות תשובה לשאלה
 * כל שאלה יכולה להכיל מספר אפשרויות תשובה
 */
export const addAnswerOptions = async (options: AnswerOptionsType) => {
  const payload = {
    answerOptionsId: options.AnswerOptionsId ?? 0,
    questionId: options.QuestionId ?? 0,
    option: options.Option ?? '',
    isCorrect: options.IsCorrect ?? false,
    description: options.Description ?? '',
  };
  const response = await axios.post(`${url}/AnswerOptions`, payload);
  const data = response.data;
  return data;
};

/**
 * קבלת שאלות לפי ID של קורס
 * מחזיר את כל השאלות השייכות לקורס ספציפי
 */
export const getQuestionsByIdCourse = async (courseId: number) => {
  const response = await axios.get(`${url}/Question/course/${courseId}`);
  const data = response.data;
  return data;
};
