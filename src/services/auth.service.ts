
import axios from './axios';
const url = '/api';
export const register = async (user: { fullName: string; email: string; password: string; confirmPassword: string; school: string; grade: string | string[]; userType: 'student' | 'teacher' }) => {
  const response = await axios.post(`${url}/Users`, user);
  const data = response.data;
  return data;
};
export const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${url}/login`, credentials);
  const data = response.data;
  return data;
};
export const loginByToken = async (token: string) => {
  const response = await axios.get(`${url}/getUserByToken`, { headers: { Authorization: `Bearer ${token}` } });
  const data = response.data;
  return data;
};