import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './settings.css';
import { updateUser as update } from '../services/auth.service';
import { UserType } from '../types/userType';
import SettingsSidebar from './components/SettingsSidebar';
import ProfileTab from './components/ProfileTab';
import SecurityTab from './components/SecurityTab';
import NotificationsTab from './components/NotificationsTab';
import PreferencesTab from './components/PreferencesTab';
import { SettingsTab } from './components/types';

export default function QaitSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    testReminders: true,
    resultsNotifications: true,
    weeklyReport: false
  });

  const [preferences, setPreferences] = useState({
    language: 'he',
    theme: 'light',
    fontSize: 'medium'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Sync userData with user from context
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImagePreview(base64String);
        if (userData) {
          setUserData({...userData, userImageUrl: base64String});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfileImagePreview(null);
    if (userData) {
      setUserData({...userData, userImageUrl: ''});
    }
  };

  const handleSaveProfile = async () => {
    if (userData) {
      const updatedUser = await update(userData);
      if (updatedUser) {
        setUserData(updatedUser);
        updateUser(updatedUser);
      }
      alert('הפרטים נשמרו בהצלחה!');
    }
  };

  const handleChangePassword = async () => {
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('יש למלא את כל השדות');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('הסיסמה החדשה ואימות הסיסמה אינם תואמים');
      return;
    }

    if (passwordData.newPassword.length < 4) {
      alert('הסיסמה חדשה חייבת להכיל לפחות 4 תווים');
      return;
    }

    if (userData && userData.userId) {
      try {
        const updatedUserData = {...userData, userPassword: passwordData.newPassword};
        const updatedUser = await update(updatedUserData);
        if (updatedUser) {
          setUserData(updatedUser);
          updateUser(updatedUser);
          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          alert('הסיסמה עודכנה בהצלחה!');
        }
      } catch (error) {
        alert('שגיאה בעדכון הסיסמה');
      }
    } else {
      alert('שגיאה: לא ניתן לזהות את המשתמש');
    }
  };

  return (
    <div className="settings-container" dir="rtl">
      <div className="settings-header">
        <h1 className="settings-title">הגדרות</h1>
        <p className="settings-subtitle">נהל את החשבון וההעדפות שלך</p>
      </div>

      <div className="settings-main-content">
        <SettingsSidebar activeTab={activeTab} onChangeTab={setActiveTab} />

        <div className="settings-content">
          {activeTab === 'profile' && (
            <ProfileTab
              userData={userData}
              profileImagePreview={profileImagePreview}
              setUserData={setUserData}
              onImageUpload={handleImageUpload}
              onDeleteImage={handleDeleteImage}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {activeTab === 'security' && (
            <SecurityTab
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              onChangePassword={handleChangePassword}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsTab
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}

          {activeTab === 'preferences' && (
            <PreferencesTab
              preferences={preferences}
              setPreferences={setPreferences}
            />
          )}
        </div>
      </div>
    </div>
  );
}