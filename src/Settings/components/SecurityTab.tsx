import { Shield } from 'lucide-react';
import { PasswordState } from './types';

type SecurityTabProps = {
  passwordData: PasswordState;
  setPasswordData: React.Dispatch<React.SetStateAction<PasswordState>>;
  onChangePassword: () => void;
};

export default function SecurityTab({ passwordData, setPasswordData, onChangePassword }: SecurityTabProps) {
  return (
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
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
          />
        </div>

        <div className="settings-form-group">
          <label className="settings-label">סיסמה חדשה</label>
          <input
            type="password"
            placeholder="הזן סיסמה חדשה"
            className="settings-input"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          />
        </div>

        <div className="settings-form-group">
          <label className="settings-label">אימות סיסמה</label>
          <input
            type="password"
            placeholder="הזן סיסמה חדשה שוב"
            className="settings-input"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
          />
        </div>

        <button className="settings-save-button" onClick={onChangePassword}>עדכן סיסמה</button>
      </div>
    </div>
  );
}
