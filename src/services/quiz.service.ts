
import axios from './axios';
const url = '/api/Quiz';

export const getAiQuizzes = async (file: File, numQuestions: number = 5, level: number = 0, additionalInstructions: string = '') => {
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