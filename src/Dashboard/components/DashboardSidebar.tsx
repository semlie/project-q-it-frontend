import { LogOut } from 'lucide-react';
import { DashboardTabItem } from './types';

type DashboardSidebarProps = {
  activeTab: string;
  navItems: DashboardTabItem[];
  onChangeTab: (tabId: string) => void;
  onLogout: () => void;
};

export default function DashboardSidebar({
  activeTab,
  navItems,
  onChangeTab,
  onLogout,
}: DashboardSidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-circle">Q</div>
          <div>
            <div className="logo-text">Q-it</div>
            <div className="logo-subtext">UNI-HIT</div>
          </div>
        </div>
      </div>

      <nav className="dashboard-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeTab(item.id)}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={onLogout}>
          <LogOut size={20} />
          <span>התנתק</span>
        </button>
      </div>
    </aside>
  );
}
