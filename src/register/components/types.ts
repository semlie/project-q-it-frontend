export type UserType = 'student' | 'teacher';

export interface SchoolOption {
  id: number;
  name: string;
}

export type GradeValue = string | string[];

export interface RegisterFormData {
  UserName: string;
  UserEmail: string;
  UserPassword: string;
  confirmPassword: string;
  SchoolId: number;
  grade: GradeValue;
}
