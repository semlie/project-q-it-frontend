/**
 * Hooks מקודמים עם טיפוסים ל-Redux
 * מספקים אינטליסנס ובטיחות בטיפוסים
 */
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Hook ל-Dispatch עם טיפוס נכון
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Hook ל-Selector עם טיפוס נכון
 */
export const useAppSelector = useSelector.withTypes<RootState>();
