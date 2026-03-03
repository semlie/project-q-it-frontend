import React, { useState } from 'react';
import { Home, Users, FileEdit, BarChart3, Settings, Clock, CheckCircle, TrendingUp, BookOpen, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Paths } from '../routes/paths';
import QaitSettings from '../Settings/settings';
import './dashboard.css';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardTopBar from './components/DashboardTopBar';
import UserInfoCard from './components/UserInfoCard';
import StatsGrid from './components/StatsGrid';
import { DashboardStatItem, DashboardTabItem } from './components/types';

export default function QaitTeacherDashboard() {
  
  const [activeTab, setActiveTab] = useState('home');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log('Teacher Dashboard: Current user from context:', user);

  const handleLogout = () => {
    logout();
    navigate(`/${Paths.login}`);
  };

  const handleChangeTab = (tabId: string) => {
    if (tabId === 'createTest') {
      navigate(`/${Paths.createTest}`);
      return;
    }

    setActiveTab(tabId);
  };

  const userData = {
    name: user?.userName || 'מורה',
    role: 'מורה',
    avatar: user?.userName ? user.userName.substring(0, 2).toUpperCase() : "MT"
  };

  const myClasses = [
    { id: 1, name: "כיתה י'1", subject: "מתמטיקה", students: 28, avgGrade: 87, nextClass: "מחר, 10:00" },
    { id: 2, name: "כיתה י'2", subject: "מתמטיקה", students: 25, avgGrade: 82, nextClass: "יום ד', 13:00" },
    { id: 3, name: "כיתה יא'3", subject: "מתמטיקה מתקדמת", students: 22, avgGrade: 91, nextClass: "יום ב', 09:00" }
  ];

  const upcomingTests = [
    { id: 1, className: "כיתה י'1", title: "מבחן באלגברה", date: "מחר, 10:00", questions: 25, duration: "45 דקות" },
    { id: 2, className: "כיתה י'2", title: "מבחן Unit 5", date: "15/03/2026", questions: 30, duration: "60 דקות" },
    { id: 3, className: "כיתה יא'3", title: "מבחן טריגונומטריה", date: "20/03/2026", questions: 20, duration: "40 דקות" }
  ];

  const recentActivity = [
    { id: 1, type: "grade", className: "כיתה י'1", title: "ציונים למבחן אלגברה עודכנו", date: "לפני שעה", icon: <CheckCircle size={20} /> },
    { id: 2, type: "submission", className: "כיתה י'2", title: "5 תלמידים הגישו מטלה", date: "לפני 3 שעות", icon: <BookOpen size={20} /> },
    { id: 3, type: "question", className: "כיתה יא'3", title: "שאלה חדשה מתלמיד", date: "לפני יום", icon: <Bell size={20} /> }
  ];

  const stats = [
    { label: "סה״כ תלמידים", value: "75", icon: <Users size={24} />, color: "#10b981" },
    { label: "מבחנים פעילים", value: "8", icon: <FileEdit size={24} />, color: "#06b6d4" },
    { label: "ממוצע כיתות", value: "86.7", icon: <TrendingUp size={24} />, color: "#f59e0b" },
    { label: "מבחנים השבוע", value: "3", icon: <Clock size={24} />, color: "#8b5cf6" }
  ] as DashboardStatItem[];

  const navItems: DashboardTabItem[] = [
    { id: 'home', label: 'דף הבית', icon: <Home size={20} /> },
    { id: 'classes', label: 'הכיתות שלי', icon: <Users size={20} /> },
    { id: 'createTest', label: 'יצירת מבחנים', icon: <FileEdit size={20} /> },
    { id: 'stats', label: 'סטטיסטיקות כיתה', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'הגדרות', icon: <Settings size={20} /> },
  ];

  const userInfoRows = [
    { label: 'שם מלא', value: user?.userName || 'לא זמין' },
    { label: 'אימייל', value: user?.userEmail || 'לא זמין' },
    { label: 'תפקיד', value: '👨‍🏫 מורה' },
    { label: 'מזהה משתמש', value: user?.userId || 'לא זמין' },
    { label: 'מזהה בית ספר', value: user?.schoolId || 'לא זמין' },
  ];

  const renderComingSoon = (title: string, subtitle: string, icon: React.ReactNode, message: string) => (
    <div>
      <h1 className="welcome-title">{title}</h1>
      <p className="welcome-subtitle">{subtitle}</p>

      <div className="user-info-card" style={{ marginTop: '24px', textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ margin: '0 auto 20px', width: 'fit-content' }}>{icon}</div>
        <h2 className="section-title">תכונה בפיתוח</h2>
        <p style={{ color: '#64748b', marginTop: '12px' }}>{message}</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container" dir="rtl">
      <DashboardSidebar
        activeTab={activeTab}
        navItems={navItems}
        onChangeTab={handleChangeTab}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="dashboard-main">
        <DashboardTopBar
          searchPlaceholder="חיפוש תלמידים, כיתות, מבחנים..."
          notificationCount={5}
          userName={userData.name}
          userRole={userData.role}
          avatarText={userData.avatar}
          userImageUrl={user?.userImageUrl}
        />

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'settings' ? (
            <QaitSettings />
          ) : activeTab === 'classes' ? (
            <div>
              <h1 className="welcome-title">הכיתות שלי 👥</h1>
              <p className="welcome-subtitle">נהל את כל הכיתות והתלמידים שלך</p>
              
              <div className="dashboard-section" style={{ marginTop: '24px' }}>
                <div className="tests-list">
                  {myClasses.map(cls => (
                    <div key={cls.id} className="test-card">
                      <div className="test-card-header">
                        <div className="test-subject">{cls.subject}</div>
                        <div className="test-date">
                          <Clock size={16} />
                          {cls.nextClass}
                        </div>
                      </div>
                      <h3 className="test-title">{cls.name}</h3>
                      <div className="test-details">
                        <span>{cls.students} תלמידים</span>
                        <span>•</span>
                        <span>ממוצע: {cls.avgGrade}</span>
                      </div>
                      <button className="start-test-button">צפה בכיתה</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'stats' ? (
            renderComingSoon(
              'סטטיסטיקות כיתה 📊',
              'עקוב אחר התקדמות וביצועים של הכיתות שלך',
              <BarChart3 size={64} style={{ color: '#10b981' }} />,
              'בקרוב תוכל לצפות בסטטיסטיקות מפורטות של כל כיתה, להשוות ביצועים ולזהות תלמידים הזקוקים לתמיכה'
            )
          ) : (
            <>
              <h1 className="welcome-title">שלום, {userData.name}! 👋</h1>
              <p className="welcome-subtitle">סקירה מהירה של הפעילות בכיתות שלך</p>

              <UserInfoCard
                title="פרטי מורה"
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
                      <div className="test-subject">{test.className}</div>
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
                    <button className="start-test-button">נהל מבחן</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">פעילות אחרונה</h2>
                <button className="see-all-button">צפה בהכל</button>
              </div>

              <div className="results-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="result-card">
                    <div className="result-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          padding: '8px', 
                          borderRadius: '8px', 
                          backgroundColor: '#f1f5f9',
                          color: '#6366f1',
                          display: 'flex'
                        }}>
                          {activity.icon}
                        </div>
                        <div>
                          <div className="result-subject">{activity.className}</div>
                          <div className="result-title">{activity.title}</div>
                        </div>
                      </div>
                    </div>
                    <div className="result-footer">
                      <div className="result-date">{activity.date}</div>
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
