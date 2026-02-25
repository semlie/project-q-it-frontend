
import axios from './axios';
const url = '/api';
export const register = async (formData: FormData) => {
  // Don't set Content-Type! Let axios set it automatically with boundary for multipart/form-data
  const response = await axios.post(`${url}/Users`, formData);
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