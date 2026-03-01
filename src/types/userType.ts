export type UserType = {
  UserName: string;
  UserEmail: string;
  UserPassword: string;
  Role: 'student' | 'teacher';
  UserImageUrl?: string;
  SchoolId: number;
};
export type UserLoginType = {
  UserEmail: string;
  UserPassword: string;
};