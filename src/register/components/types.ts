export type UserType = 'student' | 'teacher';

export interface SchoolOption {
  id: number;
  name: string;
}

export interface ClassOption {
  classId: number;
  className: string;
}

export interface RegisterFormData {
  UserName: string;
  UserEmail: string;
  UserPassword: string;
  confirmPassword: string;
  SchoolId: number;        // For UI filtering (school → classes)
  ClassId: number;         // Maps to Users.ClassId
  TeacherClassIds: number[]; // For teachers (TeacherClass table)
}
