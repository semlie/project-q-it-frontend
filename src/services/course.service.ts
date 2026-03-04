
import axios from './axios';
import { CourseType } from '../types/courseType';
const url = '/api';
export const getCoursesByIdUser = async (userId: number) => {
  const response = await axios.get(`${url}/Course/${userId}`);
  const data = response.data;
  return data;
};
export const addCourse = async (credentials: CourseType) => {
  const response = await axios.post(`${url}/Course`, credentials);
  const data = response.data;
  return data;
};