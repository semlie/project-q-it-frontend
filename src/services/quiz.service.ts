
import axios from './axios';
const url = '/api/Quiz';

export const getAiQuizzes = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // 'file' חייב להתאים לשם הפרמטר ב-Backend

  const response = await axios.post(`${url}/generate`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};