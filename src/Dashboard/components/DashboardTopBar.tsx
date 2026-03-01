import { Bell, Search } from 'lucide-react';

type DashboardTopBarProps = {
  searchPlaceholder: string;
  notificationCount: number;
  userName: string;
  userRole: string;
  avatarText: string;
  userImageUrl?: string;
};

export default function DashboardTopBar({
  searchPlaceholder,
  notificationCount,
  userName,
  userRole,
  avatarText,
  userImageUrl,
}: DashboardTopBarProps) {
  return (
    <header className="top-bar">
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input type="text" placeholder={searchPlaceholder} className="search-input" />
      </div>

      <div className="top-bar-right">
        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-badge">{notificationCount}</span>
        </button>

        <div className="user-info">
          <div className="user-details">
            <div className="user-name">{userName}</div>
            <div className="user-role">{userRole}</div>
          </div>
          {userImageUrl && userImageUrl !== 'string' ? (
            <img src={userImageUrl} alt={userName} className="avatar-image" />
          ) : (
            <div className="avatar">{avatarText}</div>
          )}
        </div>
      </div>
    </header>
  );
}
