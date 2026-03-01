import React, { useState } from 'react';
import { Home, BookOpen, BarChart3, Settings, LogOut, Bell, Search, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Paths } from '../routes/paths';
import './dashboard.css';

export default function QaitDashboard() {
  
  const [activeTab, setActiveTab] = useState('home');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log('Dashboard: Current user from context:', user);

  const handleLogout = () => {
    logout();
    navigate(`/${Paths.login}`);
  };

  const userData = {
    name: user?.userName || 'משתמש',
    role: user?.role === 'teacher' ? 'מורה' : 'תלמיד',
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
            onClick={() => setActiveTab('tests')}
            className={`nav-item ${activeTab === 'tests' ? 'active' : ''}`}
          >
            <BookOpen size={20} />
            <span>מבחנים</span>
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`}
          >
            <BarChart3 size={20} />
            <span>סטטיסטיקות</span>
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
              placeholder="חיפוש מבחנים, נושאים..."
              className="search-input"
            />
          </div>

          <div className="top-bar-right">
            <button className="notification-button">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

            <div className="user-info">
              <div className="user-details">
                <div className="user-name">{userData.name}</div>
                <div className="user-role">{userData.class}</div>
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
          <h1 className="welcome-title">שלום, {userData.name}! 👋</h1>
          <p className="welcome-subtitle">מוכנים למבחן הבא?</p>

          {/* User Info Card */}
          <div className="user-info-card">
            <div className="user-info-card-header">
              <h2 className="section-title">פרטי משתמש</h2>
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
                  <div className="user-info-value">
                    {user?.role === 'teacher' ? '👨‍🏫 מורה' : '👨‍🎓 תלמיד'}
                  </div>
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
        </div>
      </main>
    </div>
  );
}

