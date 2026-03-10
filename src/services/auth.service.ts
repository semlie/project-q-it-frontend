
import axios from './axios';
import { UserLoginType, UserType } from '../types/userType';

const url = '/api';

export const register = async (formData: FormData) => {
  const response = await axios.post(`${url}/Users`, formData);
  return response.data;
};

export const addTeacherClass = async (teacherId: number, classId: number) => {
  const response = await axios.post(`${url}/TeacherClass`, {
    teacherId,
    classId
  });
  return response.data;
};

export const login = async (credentials: UserLoginType) => {
  const response = await axios.post(`${url}/Login`, credentials);
  return response.data;
};

export const updateUser = async (userData: UserType) => {
  const response = await axios.put(`${url}/Users/${userData.userId}`, userData);
  return response.data;
};

export const loginByToken = async (token: string) => {
  const response = await axios.get(`${url}/Login/${token}`);
  const userData = response.data;
  // Normalize role to lowercase (backend returns "Student" or "Teacher")
  return {
    userId: userData.userId,
    userName: userData.userName,
    userEmail: userData.userEmail,
    role: userData.role ? userData.role.toLowerCase() : 'student',
    userImageUrl: userData.userImageUrl,
    classId: userData.classId
  };
};
