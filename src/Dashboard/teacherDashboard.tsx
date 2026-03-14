import React, { useState, useEffect } from 'react';
import { Home, FileEdit, BarChart3, Settings, Clock, CheckCircle, BookOpen, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Paths } from '../routes/paths';
import QaitSettings from '../Settings/settings';
import './dashboard.css';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardTopBar from './components/DashboardTopBar';
import UserInfoCard from './components/UserInfoCard';
import { DashboardTabItem } from './components/types';
import { getCoursesByUserId } from '../services/course.service';
import { Course } from '../Courses/components/types';

export default function QaitTeacherDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [courses, setCourses] = useState<Course[]>([]);
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

    if (tabId === 'stats') {
      navigate(`/${Paths.teacherStats}`);
      return;
    }

    setActiveTab(tabId);
  };

  useEffect(() => {
    const loadCourses = async () => {
      if (!user?.userId) return;
      try {
        const data = await getCoursesByUserId(user.userId);
        if (Array.isArray(data)) {
          const normalizedCourses: Course[] = data.map((course: any) => ({
            id: course.courseId || course.id || 0,
            name: course.courseName || course.name || 'ללא שם',
            teacher: course.teacherName || user.userName || 'לא צוין',
            description: course.description || '',
            color: course.color || '#14b8a6',
            icon: course.icon || '📚',
            progress: course.progress || 0,
            chapters: course.chapters || 0,
            completedChapters: course.completedChapters || 0,
            students: course.students || 0,
            averageGrade: course.averageGrade || 0,
            materials: course.materials || 0,
            tests: course.tests || 0,
            upcomingTest: course.upcomingTest || null,
            schoolId: course.schoolId || course.schoolId || 0,
          }));
          setCourses(normalizedCourses);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error('Failed loading teacher courses:', err);
        setCourses([]);
      }
    };

    loadCourses();
  }, [user]);

  const userData = {
    name: user?.userName || 'מורה',
    role: 'מורה',
    avatar: user?.userName ? user.userName.substring(0, 2).toUpperCase() : "MT"
  };
  const navItems: DashboardTabItem[] = [
    { id: 'home', label: 'דף הבית', icon: <Home size={20} /> },
    { id: 'classes', label: 'הקורסים שלי', icon: <BookOpen size={20} /> },
    { id: 'createTest', label: 'יצירת מבחנים', icon: <FileEdit size={20} /> },
    { id: 'stats', label: 'סטטיסטיקות כיתה', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'הגדרות', icon: <Settings size={20} /> },
  ];

  const userInfoRows = [
    { label: 'שם מלא', value: user?.userName || 'לא זמין' },
    { label: 'אימייל', value: user?.userEmail || 'לא זמין' },
    { label: 'תפקיד', value: '👨‍🏫 מורה' },
    { label: 'מזהה כיתה', value: user?.classId || 'לא זמין' },
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
              <h1 className="welcome-title">הקורסים שלי</h1>
              <p className="welcome-subtitle">נהל את כל הקורסים שלך</p>
              
              <button 
                onClick={() => navigate(`/${Paths.addCourse}`)}
                style={{
                  marginTop: '16px',
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                + הוסף קורס חדש
              </button>
              
              <div className="dashboard-section" style={{ marginTop: '24px' }}>
                <div className="tests-list">
                  {courses.map((course) => {
                    const courseName = (course as any).courseName || (course as any).name || 'קורס';
                    const nextClass = (course as any).nextClass || '';

                    return (
                      <div key={(course as any).courseId || (course as any).id} className="test-card">
                        <div className="test-card-header">
                          {nextClass && (
                            <div className="test-date">
                              <Clock size={16} />
                              {nextClass}
                            </div>
                          )}
                        </div>
                        <h3 className="test-title">{courseName}</h3>
                        <div className="test-details">
                        </div>
                        <button className="start-test-button">צפה בקורס</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : activeTab === 'stats' ? (
            <div style={{textAlign: 'center', padding: '60px 20px'}}>
              <BarChart3 size={64} style={{ color: '#10b981', marginBottom: '16px' }} />
              <h2 className="section-title">מעבר לסטטיסטיקות...</h2>
            </div>
          ) : (
            <>
              <h1 className="welcome-title">שלום, {userData.name}! 👋</h1>
              <UserInfoCard
                title="פרטי מורה"
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
