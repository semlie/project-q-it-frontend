export type UserType = {
  UserName: string;
  UserEmail: string;
  UserPassword: string;
  Role: 'student' | 'teacher';
  UserImageUrl?: string;
  SchoolId: number;
};