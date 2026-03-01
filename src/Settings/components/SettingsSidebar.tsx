import { User, Lock, Bell, Palette } from 'lucide-react';
import { SettingsTab } from './types';

type TabItem = {
  id: SettingsTab;
  label: string;
  icon: React.ReactNode;
};

type SettingsSidebarProps = {
  activeTab: SettingsTab;
  onChangeTab: (tab: SettingsTab) => void;
};

const tabs: TabItem[] = [
  { id: 'profile', label: 'פרופיל', icon: <User size={20} /> },
  { id: 'security', label: 'אבטחה', icon: <Lock size={20} /> },
  { id: 'notifications', label: 'התראות', icon: <Bell size={20} /> },
  { id: 'preferences', label: 'העדפות', icon: <Palette size={20} /> },
];

export default function SettingsSidebar({ activeTab, onChangeTab }: SettingsSidebarProps) {
  return (
    <div className="settings-sidebar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChangeTab(tab.id)}
          className={`settings-tab-button ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
