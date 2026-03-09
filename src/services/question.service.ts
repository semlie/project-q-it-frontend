
import axios from './axios';
import { QuestionType } from '../types/questionType';
import { AnswerOptionsType } from '../types/answerOptionsType';
const url = '/api';
export const addQuestion = async (credentials: QuestionType) => {
  const response = await axios.post(`${url}/Question`, credentials);
  const data = response.data;
  return data;
};
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
export const getQuestionsByIdCourse = async (courseId: number) => {
  const response = await axios.get(`${url}/Question/course/${courseId}`);
  const data = response.data;
  return data;
};