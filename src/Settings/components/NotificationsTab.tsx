import { Mail, Bell } from 'lucide-react';
import { NotificationsState } from './types';

type NotificationsTabProps = {
  notifications: NotificationsState;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationsState>>;
};

export default function NotificationsTab({ notifications, setNotifications }: NotificationsTabProps) {
  return (
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
            onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
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
            onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
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
            onChange={(e) => setNotifications({ ...notifications, testReminders: e.target.checked })}
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
            onChange={(e) => setNotifications({ ...notifications, resultsNotifications: e.target.checked })}
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
            onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
          />
          <span className="settings-slider"></span>
        </label>
      </div>
    </div>
  );
}
