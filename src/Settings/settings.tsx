import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Palette, Globe, Shield, Mail, Smartphone, Monitor, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './settings.css';
import { updateUser as update } from '../services/auth.service';
import { UserType } from '../types/userType';

export default function QaitSettings() {
  const [activeTab, setActiveTab] = useState('profile');
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

  const tabs = [
    { id: 'profile', label: 'פרופיל', icon: <User size={20} /> },
    { id: 'security', label: 'אבטחה', icon: <Lock size={20} /> },
    { id: 'notifications', label: 'התראות', icon: <Bell size={20} /> },
    { id: 'preferences', label: 'העדפות', icon: <Palette size={20} /> },
  ];

  return (
    <div className="settings-container" dir="rtl">
      <div className="settings-header">
        <h1 className="settings-title">הגדרות</h1>
        <p className="settings-subtitle">נהל את החשבון וההעדפות שלך</p>
      </div>

      <div className="settings-main-content">
        {/* Sidebar Tabs */}
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`settings-tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="settings-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2 className="settings-section-title">פרטי פרופיל</h2>
              
              <div className="settings-form-group">
                <label className="settings-label">שם מלא</label>
                <input
                  type="text"
                  value={userData?.userName || ''}
                  className="settings-input" 
                  onChange={(e)=>{
                    if (userData) {
                      setUserData({...userData, userName: e.target.value});
                    }
                  }}
                />
              </div>

              <div className="settings-form-group">
                <label className="settings-label">אימייל</label>
                <input
                  type="email"
                  value={userData?.userEmail || ''}
                  className="settings-input" 
                  onChange={(e)=>{
                    if (userData) {
                      setUserData({...userData, userEmail: e.target.value});
                    }
                  }}
                />
              </div>
              <div className="settings-form-group">
                <label className="settings-label">תפקיד</label>
                <input
                  type="text"
                  value={userData?.role === 'teacher' ? 'מורה' : userData?.role === 'student' ? 'תלמיד' : userData?.role || ''}
                  className="settings-input"
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>

              <div className="settings-form-group">
                <label className="settings-label">מזהה בית ספר</label>
                <input
                  type="text"
                  value={userData?.schoolId || ''}
                  className="settings-input"
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>

              <div className="settings-form-group">
                <label className="settings-label">תמונת פרופיל</label>
                
                {/* תצוגה מקדימה של התמונה */}
                <div style={{ marginBottom: '16px', textAlign: 'center', position: 'relative', display: 'inline-block', margin: '0 auto 16px', width: '100%' }}>
                  {(profileImagePreview || (userData?.userImageUrl && userData.userImageUrl !== 'string')) && (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img 
                        src={profileImagePreview || userData?.userImageUrl || ''} 
                        alt="Profile preview" 
                        style={{ 
                          width: '120px', 
                          height: '120px', 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          border: '3px solid #14b8a6'
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#dc2626';
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#ef4444';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title="מחק תמונה"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                  {!profileImagePreview && (!userData?.userImageUrl || userData.userImageUrl === 'string') && (
                    <div style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      border: '3px dashed #d1d5db'
                    }}>
                      <User size={48} color="#9ca3af" />
                    </div>
                  )}
                </div>

                {/* כפתור העלאת תמונה */}
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <label 
                  htmlFor="profileImageInput" 
                  className="settings-input"
                  style={{ 
                    display: 'block',
                    textAlign: 'center',
                    cursor: 'pointer',
                    padding: '12px',
                    backgroundColor: '#f9fafb',
                    border: '2px dashed #14b8a6',
                    borderRadius: '8px',
                    color: '#14b8a6',
                    fontWeight: '500'
                  }}
                >
                  📷 לחץ להעלאת תמונה מהמחשב
                </label>
              </div>

              <button className="settings-save-button" onClick={handleSaveProfile}>
                שמור שינויים
              </button>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2 className="settings-section-title">אבטחה וסיסמה</h2>
              
              <div className="settings-security-card">
                <div className="settings-security-card-header">
                  <Shield size={24} className="settings-icon-teal" />
                  <div>
                    <div className="settings-security-card-title">שנה סיסמה</div>
                    <div className="settings-security-card-desc">עדכן את הסיסמה שלך באופן קבוע</div>
                  </div>
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">סיסמה נוכחית</label>
                  <input
                    type="password"
                    placeholder="הזן סיסמה נוכחית"
                    className="settings-input"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">סיסמה חדשה</label>
                  <input
                    type="password"
                    placeholder="הזן סיסמה חדשה"
                    className="settings-input"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-label">אימות סיסמה</label>
                  <input
                    type="password"
                    placeholder="הזן סיסמה חדשה שוב"
                    className="settings-input"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                </div>

                <button className="settings-save-button" onClick={handleChangePassword}>עדכן סיסמה</button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2 className="settings-section-title">התראות</h2>
              
              <div className="settings-notification-card">
                <div className="settings-notification-header">
                  <Mail size={24} className="settings-icon-teal" />
                  <div>
                    <div className="settings-notification-title">התראות במייל</div>
                    <div className="settings-notification-desc">קבל עדכונים באימייל</div>
                  </div>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  />
                  <span className="settings-slider"></span>
                </label>
              </div>

              <div className="settings-notification-card">
                <div className="settings-notification-header">
                  <Bell size={24} className="settings-icon-teal" />
                  <div>
                    <div className="settings-notification-title">התראות Push</div>
                    <div className="settings-notification-desc">קבל התראות בדפדפן</div>
                  </div>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  />
                  <span className="settings-slider"></span>
                </label>
              </div>

              <div className="settings-divider"></div>

              <h3 className="settings-subsection-title">סוגי התראות</h3>

              <div className="settings-notification-option">
                <div>
                  <div className="settings-option-title">תזכורות למבחנים</div>
                  <div className="settings-option-desc">קבל תזכורת יום לפני המבחן</div>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={notifications.testReminders}
                    onChange={(e) => setNotifications({...notifications, testReminders: e.target.checked})}
                  />
                  <span className="settings-slider"></span>
                </label>
              </div>

              <div className="settings-notification-option">
                <div>
                  <div className="settings-option-title">תוצאות מבחנים</div>
                  <div className="settings-option-desc">קבל התראה כשהציון מתפרסם</div>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={notifications.resultsNotifications}
                    onChange={(e) => setNotifications({...notifications, resultsNotifications: e.target.checked})}
                  />
                  <span className="settings-slider"></span>
                </label>
              </div>

              <div className="settings-notification-option">
                <div>
                  <div className="settings-option-title">דוח שבועי</div>
                  <div className="settings-option-desc">סיכום שבועי של הפעילות שלך</div>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={notifications.weeklyReport}
                    onChange={(e) => setNotifications({...notifications, weeklyReport: e.target.checked})}
                  />
                  <span className="settings-slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h2 className="settings-section-title">העדפות תצוגה</h2>
              
              <div className="settings-form-group">
                <label className="settings-label">
                  <Globe size={18} className="settings-icon-margin" />
                  שפה
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                  className="settings-select"
                >
                  <option value="he">עברית</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="settings-form-group">
                <label className="settings-label">
                  <Palette size={18} className="settings-icon-margin" />
                  ערכת צבעים
                </label>
                <div className="settings-theme-options">
                  <button 
                    onClick={() => setPreferences({...preferences, theme: 'light'})}
                    className={`settings-theme-button ${preferences.theme === 'light' ? 'active' : ''}`}
                  >
                    <div className="settings-theme-preview">
                      <div className="settings-light-theme"></div>
                    </div>
                    בהיר
                  </button>
                  <button 
                    onClick={() => setPreferences({...preferences, theme: 'dark'})}
                    className={`settings-theme-button ${preferences.theme === 'dark' ? 'active' : ''}`}
                  >
                    <div className="settings-theme-preview">
                      <div className="settings-dark-theme"></div>
                    </div>
                    כהה
                  </button>
                  <button 
                    onClick={() => setPreferences({...preferences, theme: 'auto'})}
                    className={`settings-theme-button ${preferences.theme === 'auto' ? 'active' : ''}`}
                  >
                    <div className="settings-theme-preview">
                      <div className="settings-auto-theme"></div>
                    </div>
                    אוטומטי
                  </button>
                </div>
              </div>

              <div className="settings-form-group">
                <label className="settings-label">גודל טקסט</label>
                <select
                  value={preferences.fontSize}
                  onChange={(e) => setPreferences({...preferences, fontSize: e.target.value})}
                  className="settings-select"
                >
                  <option value="small">קטן</option>
                  <option value="medium">בינוני</option>
                  <option value="large">גדול</option>
                </select>
              </div>

              <button className="settings-save-button">שמור העדפות</button>

              <div className="settings-danger-zone">
                <h3 className="settings-danger-title">אזור מסוכן</h3>
                <div className="settings-danger-card">
                  <div>
                    <div className="settings-danger-card-title">מחק חשבון</div>
                    <div className="settings-danger-card-desc">מחיקת החשבון היא פעולה בלתי הפיכה</div>
                  </div>
                  <button className="settings-danger-button">מחק חשבון</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}