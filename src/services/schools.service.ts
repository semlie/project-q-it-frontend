
import axios from './axios';
import { QuestionType } from '../types/questionType';
import { AnswerOptionsType } from '../types/answerOptionsType';
const url = '/api';
export const getSchools = async () => {
  const response = await axios.get(`${url}/School`);
  const data = response.data;
  return data;
};
export const getClassesBySchoolId = async (schoolId: number) => {
  const response = await axios.get(`${url}/Class/school/${schoolId}`);
  const data = response.data;
  return data;
};