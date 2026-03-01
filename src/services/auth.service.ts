
import axios from './axios';
import { UserLoginType, UserType } from '../types/userType';
const url = '/api';
export const register = async (formData: FormData) => {
  // Don't set Content-Type! Let axios set it automatically with boundary for multipart/form-data
  const response = await axios.post(`${url}/Users`, formData);
  const data = response.data;
  return data;
};
export const login = async (credentials: UserLoginType) => {
  const response = await axios.post(`${url}/Login`, credentials);
  const data = response.data;
  return data;
};
export const updateUser = async (userData: UserType) => {
  const response = await axios.put(`${url}/Users/${userData.userId}`, userData);
  const data = response.data;
  return data;
};
export const loginByToken = async (token: string) => {
  console.log('loginByToken called with token:', token.substring(0, 20) + '...');
  try {
    const response = await axios.get(`${url}/Login/${token}`, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    console.log('loginByToken response:', response.data);
    return response.data;
  } catch (error) {
    console.error('loginByToken error:', error);
    throw error;
  }
};