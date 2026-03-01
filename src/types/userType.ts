export type UserType = {
  userId: number | 0;
  userName: string;
  userEmail: string;
  userPassword: string;
  role: 'student' | 'teacher';
  userImageUrl?: string;
  schoolId: number;
};
export type UserLoginType = {
  userEmail: string;
  userPassword: string;
};