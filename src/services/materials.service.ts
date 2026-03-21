/**
 * שירות ניהול חומרי למידה
 * מכיל פונקציות לקבלת חומרים, העלאה, הורדה ומחיקה
 */
import axios from './axios';
import { MaterialsType } from '../types/materials';

const url = '/api';

/**
 * קבלת חומרי למידה לפי ID של קורס
 * @param courseId - ID של הקורס
 */
export const getMaterialsByIdCourse = async (courseId: number) => {
  const response = await axios.get(`${url}/Materials/course/${courseId}`);
  const data = response.data;
  return data;
};

/**
 * הוספת חומר למידה חדש
 * @param credentials - פרטי החומר
 */
export const addMaterial = async (credentials: MaterialsType) => {
  const response = await axios.post(`${url}/Materials`, credentials);
  const data = response.data;
  return data;
};

/**
 * העלאת קובץ כחומר למידה
 * @param formData - נתוני הקובץ להעלאה
 */
export const uploadMaterial = async (formData: FormData) => {
  const response = await axios.post(`${url}/Materials`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * הורדת חומר למידה
 * @param materialId - ID של החומר להורדה
 */
export const downloadMaterial = async (materialId: number): Promise<Blob> => {
  const response = await axios.get(`${url}/Materials/${materialId}/download`, {
    responseType: 'blob',
  });
  return response.data;
};

/**
 * מחיקת חומר למידה
 * @param materialId - ID של החומר למחיקה
 */
export const deleteMaterial = async (materialId: number) => {
  const response = await axios.delete(`${url}/Materials/${materialId}`);
  return response.data;
};
