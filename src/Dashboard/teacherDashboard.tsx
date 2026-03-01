import React, { useState } from 'react';
import { Home, Users, FileEdit, BarChart3, Settings, LogOut, Bell, Search, Clock, CheckCircle, TrendingUp, UserCheck, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Paths } from '../routes/paths';
import QaitSettings from '../Settings/settings';
import './dashboard.css';

export default function QaitTeacherDashboard() {
  
  const [activeTab, setActiveTab] = useState('home');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log('Teacher Dashboard: Current user from context:', user);

  const handleLogout = () => {
    logout();
    navigate(`/${Paths.login}`);
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
  ];

  return (
    <div className="dashboard-container" dir="rtl">
      {/* Sidebar */}
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
          <button 
            onClick={() => setActiveTab('home')}
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>דף הבית</span>
          </button>
          <button 
            onClick={() => setActiveTab('classes')}
            className={`nav-item ${activeTab === 'classes' ? 'active' : ''}`}
          >
            <Users size={20} />
            <span>הכיתות שלי</span>
          </button>
          <button 
            onClick={() => setActiveTab('createTest')}
            className={`nav-item ${activeTab === 'createTest' ? 'active' : ''}`}
          >
            <FileEdit size={20} />
            <span>יצירת מבחנים</span>
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`}
          >
            <BarChart3 size={20} />
            <span>סטטיסטיקות כיתה</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <Settings size={20} />
            <span>הגדרות</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            <span>התנתק</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="חיפוש תלמידים, כיתות, מבחנים..."
              className="search-input"
            />
          </div>

          <div className="top-bar-right">
            <button className="notification-button">
              <Bell size={20} />
              <span className="notification-badge">5</span>
            </button>

            <div className="user-info">
              <div className="user-details">
                <div className="user-name">{userData.name}</div>
                <div className="user-role">{userData.role}</div>
              </div>
              {user?.userImageUrl && user.userImageUrl !== 'string' ? (
                <img 
                  src={user.userImageUrl} 
                  alt={user.userName}
                  className="avatar-image"
                />
              ) : (
                <div className="avatar">{userData.avatar}</div>
              )}
            </div>
          </div>
        </header>

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
          ) : activeTab === 'createTest' ? (
            <div>
              <h1 className="welcome-title">יצירת מבחן חדש ✍️</h1>
              <p className="welcome-subtitle">צור מבחנים מותאמים אישית לתלמידים שלך</p>
              
              <div className="user-info-card" style={{ marginTop: '24px', textAlign: 'center', padding: '60px 20px' }}>
                <FileEdit size={64} style={{ margin: '0 auto 20px', color: '#6366f1' }} />
                <h2 className="section-title">תכונה בפיתוח</h2>
                <p style={{ color: '#64748b', marginTop: '12px' }}>
                  בקרוב תוכל ליצור מבחנים חדשים, לערוך שאלות ולנהל את כל המבחנים שלך במקום אחד
                </p>
              </div>
            </div>
          ) : activeTab === 'stats' ? (
            <div>
              <h1 className="welcome-title">סטטיסטיקות כיתה 📊</h1>
              <p className="welcome-subtitle">עקוב אחר התקדמות וביצועים של הכיתות שלך</p>
              
              <div className="user-info-card" style={{ marginTop: '24px', textAlign: 'center', padding: '60px 20px' }}>
                <BarChart3 size={64} style={{ margin: '0 auto 20px', color: '#10b981' }} />
                <h2 className="section-title">תכונה בפיתוח</h2>
                <p style={{ color: '#64748b', marginTop: '12px' }}>
                  בקרוב תוכל לצפות בסטטיסטיקות מפורטות של כל כיתה, להשוות ביצועים ולזהות תלמידים הזקוקים לתמיכה
                </p>
              </div>
            </div>
          ) : (
            <>
              <h1 className="welcome-title">שלום, {userData.name}! 👋</h1>
              <p className="welcome-subtitle">סקירה מהירה של הפעילות בכיתות שלך</p>

          {/* Teacher Info Card */}
          <div className="user-info-card">
            <div className="user-info-card-header">
              <h2 className="section-title">פרטי מורה</h2>
            </div>
            <div className="user-info-content">
              <div className="user-info-image-section">
                {user?.userImageUrl && user.userImageUrl !== 'string' ? (
                  <img 
                    src={user.userImageUrl} 
                    alt={user.userName} 
                    className="user-profile-image"
                  />
                ) : (
                  <div className="user-profile-placeholder">
                    {userData.avatar}
                  </div>
                )}
              </div>
              <div className="user-info-details">
                <div className="user-info-row">
                  <div className="user-info-label">שם מלא:</div>
                  <div className="user-info-value">{user?.userName || 'לא זמין'}</div>
                </div>
                <div className="user-info-row">
                  <div className="user-info-label">אימייל:</div>
                  <div className="user-info-value">{user?.userEmail || 'לא זמין'}</div>
                </div>
                <div className="user-info-row">
                  <div className="user-info-label">תפקיד:</div>
                  <div className="user-info-value">👨‍🏫 מורה</div>
                </div>
                <div className="user-info-row">
                  <div className="user-info-label">מזהה משתמש:</div>
                  <div className="user-info-value">{user?.userId || 'לא זמין'}</div>
                </div>
                <div className="user-info-row">
                  <div className="user-info-label">מזהה בית ספר:</div>
                  <div className="user-info-value">{user?.schoolId || 'לא זמין'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{backgroundColor: stat.color + '20', color: stat.color}}>
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

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
