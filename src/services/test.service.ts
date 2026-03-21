/**
 * שירות ניהול מבחנים
 * מכיל פונקציות לקבלת שאלות, שליחת תשובות וסיום מבחן
 */
import axios from './axios';

const url = '/api/TestTaking';

// ממשק לשאלת מבחן
export interface TestQuestion {
  questionId: number;
  text: string;
  level: number;
  answers: {
    id: number;
    text: string;
    isCorrect: boolean;
    description: string;
  }[];
}

// ממשק לתוצאת תשובה
export interface AnswerResult {
  isCorrect: boolean;
  correctAnswerId: string;
  explanation: string;
}

// ממשק לתוצאת מבחן סופית
export interface TestResult {
  score: number;
  total: number;
  percentage: number;
  correctAnswers: number[];
  wrongAnswers: number[];
}

/**
 * קבלת שאלות לפרק
 * @param chapterId - ID של הפרק
 * @param level - רמת השאלות (אופציונלי)
 */
export const getQuestionsForChapter = async (chapterId: number, level?: number): Promise<TestQuestion[]> => {
  let endpoint = `${url}/chapter/${chapterId}`;
  if (level) {
    endpoint += `/level/${level}`;
  }
  const response = await axios.get(endpoint);
  return response.data;
};

/**
 * שליחת תשובה לשאלה
 * @param studentId - ID של התלמיד
 * @param questionId - ID של השאלה
 * @param selectedAnswerId - ID של התשובה שנבחרה
 */
export const submitAnswer = async (
  studentId: number,
  questionId: number,
  selectedAnswerId: string
): Promise<AnswerResult> => {
  const response = await axios.post(`${url}/submit-answer`, {
    studentId,
    questionId,
    selectedAnswerId
  });
  return response.data;
};

/**
 * סיום מבחן וקבלת תוצאות
 * @param studentId - ID של התלמיד
 * @param chapterId - ID של הפרק
 * @param duration - משך הזמן שלקח לפתור
 * @param correctCount - מספר תשובות נכונות
 * @param totalQuestions - סך השאלות במבחן
 */
export const finishTest = async (
  studentId: number,
  chapterId: number,
  duration: number,
  correctCount: number,
  totalQuestions: number
): Promise<TestResult> => {
  const response = await axios.post(`${url}/finish`, {
    studentId,
    chapterId,
    duration,
    correctCount,
    totalQuestions
  });
  return response.data;
};

/**
 * קבלת תוצאות מבחנים של תלמיד
 * @param studentId - ID של התלמיד
 */
export const getStudentResults = async (studentId: number) => {
  const response = await axios.get(`${url}/results/${studentId}`);
  return response.data;
};
