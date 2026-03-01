import { useNavigate } from 'react-router';
import { Paths } from '../routes/paths';
import QaitSettings from '../Settings/settings';
import QaitStudentStats from '../Stats/studentStats';
import QaitCoursesList from '../Courses/courses';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, BookOpen, BarChart3, Settings, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardTopBar from './components/DashboardTopBar';
import UserInfoCard from './components/UserInfoCard';
import StatsGrid from './components/StatsGrid';
import { DashboardStatItem, DashboardTabItem } from './components/types';

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

  const upcomingTests = [
    { id: 1, subject: "מתמטיקה", title: "מבחן באלגברה", date: "מחר, 10:00", questions: 25, duration: "45 דקות" },
    { id: 2, subject: "אנגלית", title: "מבחן Unit 5", date: "15/02/2026", questions: 30, duration: "60 דקות" },
    { id: 3, subject: "היסטוריה", title: "מלחמת העולם השנייה", date: "20/02/2026", questions: 20, duration: "40 דקות" }
  ];

  const recentResults = [
    { id: 1, subject: "ביולוגיה", title: "תא וחלבונים", score: 95, maxScore: 100, date: "לפני יומיים" },
    { id: 2, subject: "ספרות", title: "שירת המלחמה", score: 88, maxScore: 100, date: "לפני שבוע" },
    { id: 3, subject: "פיזיקה", title: "תנועה וכוחות", score: 92, maxScore: 100, date: "לפני שבועיים" }
  ];

  const stats = [
    { label: "ממוצע ציונים", value: "91.5", icon: <TrendingUp size={24} />, color: "#10b981" },
    { label: "מבחנים שבוצעו", value: "24", icon: <CheckCircle size={24} />, color: "#06b6d4" },
    { label: "מבחנים קרובים", value: "3", icon: <Clock size={24} />, color: "#f59e0b" }
  ] as DashboardStatItem[];

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
    { label: 'מזהה משתמש', value: user?.userId || 'לא זמין' },
    { label: 'מזהה בית ספר', value: user?.schoolId || 'לא זמין' },
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

              <StatsGrid stats={stats} />

          {/* Two Column Layout */}
          <div className="two-column-grid">
            {/* Upcoming Tests */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">מבחנים קרובים</h2>
                <button className="see-all-button">צפה בהכל</button>
              </div>

              <div className="tests-list">
                {upcomingTests.map(test => (
                  <div key={test.id} className="test-card">
                    <div className="test-card-header">
                      <div className="test-subject">{test.subject}</div>
                      <div className="test-date">
                        <Clock size={16} />
                        {test.date}
                      </div>
                    </div>
                    <h3 className="test-title">{test.title}</h3>
                    <div className="test-details">
                      <span>{test.questions} שאלות</span>
                      <span>•</span>
                      <span>{test.duration}</span>
                    </div>
                    <button className="start-test-button">התחל מבחן</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Results */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">תוצאות אחרונות</h2>
                <button className="see-all-button">צפה בהכל</button>
              </div>

              <div className="results-list">
                {recentResults.map(result => (
                  <div key={result.id} className="result-card">
                    <div className="result-header">
                      <div>
                        <div className="result-subject">{result.subject}</div>
                        <div className="result-title">{result.title}</div>
                      </div>
                      <div className="result-score">
                        <div className="score-value">{result.score}</div>
                        <div className="score-max">/{result.maxScore}</div>
                      </div>
                    </div>
                    <div className="result-footer">
                      <div className="result-date">{result.date}</div>
                      <div className="result-badge" style={{
                        backgroundColor: result.score >= 90 ? '#d1fae5' : result.score >= 80 ? '#fef3c7' : '#fee2e2',
                        color: result.score >= 90 ? '#059669' : result.score >= 80 ? '#d97706' : '#dc2626'
                      }}>
                        {result.score >= 90 ? 'מצוין' : result.score >= 80 ? 'טוב מאוד' : 'טוב'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

