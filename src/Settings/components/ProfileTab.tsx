import { User, Trash2 } from 'lucide-react';
import { ProfileTabProps } from './types';

export default function ProfileTab({
  userData,
  profileImagePreview,
  setUserData,
  onImageUpload,
  onDeleteImage,
  onSaveProfile,
}: ProfileTabProps) {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">פרטי פרופיל</h2>

      <div className="settings-form-group">
        <label className="settings-label">שם מלא</label>
        <input
          type="text"
          value={userData?.userName || ''}
          className="settings-input"
          onChange={(e) => {
            if (userData) {
              setUserData({ ...userData, userName: e.target.value });
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
          onChange={(e) => {
            if (userData) {
              setUserData({ ...userData, userEmail: e.target.value });
            }
          }}
        />
      </div>

      <div className="settings-form-group">
        <label className="settings-label">תפקיד</label>
        <input
          type="text"
          value={
            userData?.role === 'teacher'
              ? 'מורה'
              : userData?.role === 'student'
                ? 'תלמיד'
                : userData?.role || ''
          }
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
                  border: '3px solid #14b8a6',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <button
                type="button"
                onClick={onDeleteImage}
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
                  transition: 'all 0.2s',
                }}
                title="מחק תמונה"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
          {!profileImagePreview && (!userData?.userImageUrl || userData.userImageUrl === 'string') && (
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                border: '3px dashed #d1d5db',
              }}
            >
              <User size={48} color="#9ca3af" />
            </div>
          )}
        </div>

        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onImageUpload}
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
            fontWeight: '500',
          }}
        >
          📷 לחץ להעלאת תמונה מהמחשב
        </label>
      </div>

      <button className="settings-save-button" onClick={onSaveProfile}>
        שמור שינויים
      </button>
    </div>
  );
}
