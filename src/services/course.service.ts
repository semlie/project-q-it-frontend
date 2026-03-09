
import axios from './axios';
import { CourseType } from '../types/courseType';

const url = '/api';

export const getCoursesByIdUser = async (userId: number) => {
  try {
    const response = await axios.get(`${url}/Course/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const addCourse = async (credentials: CourseType) => {
  try {
    const response = await axios.post(`${url}/Course`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};
