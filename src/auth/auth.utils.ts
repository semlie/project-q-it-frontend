import axiosInstance from "../services/axios";

export const setSession = (token: string) => {
    localStorage.setItem('token', token);
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
