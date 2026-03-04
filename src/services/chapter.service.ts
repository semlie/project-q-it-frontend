
import axios from './axios';
import { ChapterType } from '../types/chapterType';
const url = '/api';
export const getChaptersByIdUser = async (userId: number) => {
  const response = await axios.get(`${url}/Chapter/${userId}`);
  const data = response.data;
  return data;
};
export const addChapter = async (credentials: ChapterType) => {
  const response = await axios.post(`${url}/Chapter`, credentials);
  const data = response.data;
  return data;
};

export const getChaptersByCourseId = async (courseId: number) => {
  const response = await axios.get(`${url}/Chapter/course/${courseId}`);
  const data = response.data;
  return data;
};