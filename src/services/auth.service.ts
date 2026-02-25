
import axios from './axios';
const url = '/api';
export const register = async (user: any) => {
  const response = await axios.post(`${url}/Users`, user, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
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