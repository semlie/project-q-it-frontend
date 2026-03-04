import { Globe, Palette } from 'lucide-react';
import { PreferencesState } from './types';

type PreferencesTabProps = {
  preferences: PreferencesState;
  setPreferences: React.Dispatch<React.SetStateAction<PreferencesState>>;
};

export default function PreferencesTab({ preferences, setPreferences }: PreferencesTabProps) {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">העדפות תצוגה</h2>

      <div className="settings-form-group">
        <label className="settings-label">
          <Globe size={18} className="settings-icon-margin" />
          שפה
        </label>
        <select
          value={preferences.language}
          onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
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
            onClick={() => setPreferences({ ...preferences, theme: 'light' })}
            className={`settings-theme-button ${preferences.theme === 'light' ? 'active' : ''}`}
          >
            <div className="settings-theme-preview">
              <div className="settings-light-theme"></div>
            </div>
            בהיר
          </button>
          <button
            onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
            className={`settings-theme-button ${preferences.theme === 'dark' ? 'active' : ''}`}
          >
            <div className="settings-theme-preview">
              <div className="settings-dark-theme"></div>
            </div>
            כהה
          </button>
          <button
            onClick={() => setPreferences({ ...preferences, theme: 'auto' })}
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
          onChange={(e) => setPreferences({ ...preferences, fontSize: e.target.value })}
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
  );
}
