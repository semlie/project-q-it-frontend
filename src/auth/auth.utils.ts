import axiosInstance from "../services/axios";

export const setSession = (token: string) => {
    console.log('Setting session with token:', token);
    localStorage.setItem('token', token);
    console.log('Token stored in localStorage:', localStorage.getItem('token'));
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export const getSession = () => {
    const token = localStorage.getItem('token')
    return token
}
export const removeSession = () => {
    localStorage.removeItem('token')
    delete axiosInstance.defaults.headers.common.Authorization
}