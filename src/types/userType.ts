export type UserType = {
  userId: number;
  userName: string;
  userEmail: string;
  role: 'student' | 'teacher';
  userImageUrl?: string;
  classId: number;
};
export type UserLoginType = {
  userEmail: string;
  userPassword: string;
};