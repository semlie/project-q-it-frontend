
import axios from './axios';
import { MaterialsType } from '../types/materials';
const url = '/api';
export const getMaterialsByIdCourse = async (courseId: number) => {
  const response = await axios.get(`${url}/Materials/course/${courseId}`);
  const data = response.data;
  return data;
};
export const addMaterial = async (credentials: MaterialsType) => {
  const response = await axios.post(`${url}/Materials`, credentials);
  const data = response.data;
  return data;
};