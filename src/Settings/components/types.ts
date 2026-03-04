import { UserType } from '../../types/userType';

export type SettingsTab = 'profile' | 'security' | 'notifications' | 'preferences';

export type NotificationsState = {
  email: boolean;
  push: boolean;
  testReminders: boolean;
  resultsNotifications: boolean;
  weeklyReport: boolean;
};

export type PreferencesState = {
  language: string;
  theme: string;
  fontSize: string;
};

export type PasswordState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ProfileTabProps = {
  userData: UserType | null;
  profileImagePreview: string | null;
  setUserData: React.Dispatch<React.SetStateAction<UserType | null>>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: () => void;
  onSaveProfile: () => void;
};
