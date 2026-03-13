import { useNavigate } from 'react-router';
import { Paths } from '../routes/paths';
import QaitSettings from '../Settings/settings';
import QaitStudentStats from '../Stats/studentStats';
import QaitCoursesList from '../Courses/courses';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, BookOpen, BarChart3, Settings} from 'lucide-react';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardTopBar from './components/DashboardTopBar';
import UserInfoCard from './components/UserInfoCard';
import { DashboardTabItem } from './components/types';

export default function QaitStudentDashboard() {
  
  const [activeTab, setActiveTab] = useState('home');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log('Dashboard: Current user from context:', user);
  const handleLogout = () => {
    logout();
    navigate(`/${Paths.login}`);
  };
  const userData = {
    name: user?.userName || '',
    role: 'תלמיד',
    class: "כיתה י'1",
    avatar: user?.userName ? user.userName.substring(0, 2).toUpperCase() : "YK"
  };
  const navItems: DashboardTabItem[] = [
    { id: 'home', label: 'דף הבית', icon: <Home size={20} /> },
    { id: 'courses', label: 'הקורסים שלי', icon: <BookOpen size={20} /> },
    { id: 'stats', label: 'סטטיסטיקות', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'הגדרות', icon: <Settings size={20} /> },
  ];
  const userInfoRows = [
    { label: 'שם מלא', value: user?.userName || 'לא זמין' },
    { label: 'אימייל', value: user?.userEmail || 'לא זמין' },
    { label: 'תפקיד', value: '👨‍🎓 תלמיד' },
    { label: 'מזהה כיתה', value: user?.classId || 'לא זמין' },
  ];
  return (
    <div className="dashboard-container" dir="rtl">
      <DashboardSidebar
        activeTab={activeTab}
        navItems={navItems}
        onChangeTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="dashboard-main">
        <DashboardTopBar
          searchPlaceholder="חיפוש מבחנים, נושאים..."
          notificationCount={3}
          userName={userData.name}
          userRole={userData.class}
          avatarText={userData.avatar}
          userImageUrl={user?.userImageUrl}
        />

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'settings' ? (
            <QaitSettings />
          ) : activeTab === 'stats' ? (
            <QaitStudentStats />
          ) : activeTab === 'courses' ? (
            <QaitCoursesList />
          ) : (
            <>
              <h1 className="welcome-title">שלום, {userData.name}! 👋</h1>
              <p className="welcome-subtitle">מוכנים למבחן הבא?</p>

              <UserInfoCard
                title="פרטי משתמש"
                avatarText={userData.avatar}
                userName={user?.userName || userData.name}
                userImageUrl={user?.userImageUrl}
                rows={userInfoRows}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

