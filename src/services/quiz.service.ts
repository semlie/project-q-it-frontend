/**
 * שירות יצירת חוברות עבודה באמצעות AI
 * מכיל פונקציות ליצירת שאלות מקבצי PDF באופן אוטומטי
 */
import axios from './axios';

const url = '/api/Quiz';

/**
 * יצירת שאלות באמצעות AI מקובץ PDF
 * @param file - קובץ ה-PDF שממנו ייווצרו השאלות
 * @param numQuestions - מספר השאלות ליצירה
 * @param level - רמת השאלות (1-3)
 * @param additionalInstructions - הוראות נוספות ל-AI
 */
export const getAiQuizzes = async (
  file: File,
  numQuestions: number = 5,
  level: number = 0,
  additionalInstructions: string = ''
) => {
  const formData = new FormData();
  formData.append('File', file);
  formData.append('NumberOfQuestions', String(numQuestions));
  formData.append('Level', String(level));
  if (additionalInstructions) {
    formData.append('AdditionalInstructions', additionalInstructions);
  }

  const response = await axios.post(`${url}/generate`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
