
import axios from './axios';
const url = 'api/';
export const register = async (user) => {
  const response = await axios.post(`${url}/register`, user);
  const data = response.data;
  return data;
};
export const login = async (credentials) => {
  const response = await axios.post(`${url}/login`, credentials);
  const data = response.data;
  return data;
};
export const loginByToken = async (token: string) => {
  const response = await axios.get(`${url}/getUserByToken`, { headers: { Authorization: `Bearer ${token}` } });
  const data = response.data;
  return data;
};
