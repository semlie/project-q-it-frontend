import React, { useEffect, useState } from 'react';
import { BookOpen, Users, Clock, TrendingUp, Calendar, Search, Filter, Award, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCoursesByIdUser } from '../services/course.service';

// Add keyframe animation for spinner
const spinnerStyles = document.createElement('style');
spinnerStyles.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
if (!document.querySelector('#spinner-styles')) {
  spinnerStyles.id = 'spinner-styles';
  document.head.appendChild(spinnerStyles);
}

export default function QaitCoursesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [coursesData, setCoursesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Helper function to normalize course data from server
  const normalizeCourse = (course: any) => ({
    id: course.courseId || course.id || 0,
    name: course.courseName || course.name || 'ללא שם',
    teacher: course.teacherName || course.teacher || 'לא צוין',
    description: course.description || course.courseName || 'אין תיאור',
    color: course.color || '#14b8a6',
    icon: course.icon || '📚',
    progress: course.progress || 0,
    chapters: course.chapters || 0,
    completedChapters: course.completedChapters || 0,
    nextClass: course.nextClass || 'לא נקבע',
    students: course.students || 0,
    averageGrade: course.averageGrade || 0,
    materials: course.materials || 0,
    tests: course.tests || 0,
    upcomingTest: course.upcomingTest || null,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        if (user) {
          const data = await getCoursesByIdUser(user.userId);
          console.log('Fetched courses:', data);
          
          // Check if response is an error message
          if (typeof data === 'string' && data.includes('not found')) {
            setError(data);
            setCoursesData([]);
          } else if (Array.isArray(data)) {
            // Normalize array of courses
            const normalized = data.map(normalizeCourse);
            setCoursesData(normalized);
          } else if (data && typeof data === 'object') {
            const normalized = [normalizeCourse(data)];
            setCoursesData(normalized);
          } else {
            setCoursesData([]);
          }
        }
      } catch (error: any) {
        console.error('Error fetching courses:', error);
        setError(error?.message || 'שגיאה בטעינת הקורסים');
        setCoursesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);
  // const courses = [
  //   {
  //     id: 1,
  //     name: 'מתמטיקה',
  //     teacher: 'ד"ר מרים לוי',
  //     description: 'מתמטיקה לכיתה י - אלגברה, גאומטריה ופונקציות',
  //     color: '#14b8a6',
  //     icon: '📐',
  //     progress: 75,
  //     chapters: 12,
  //     completedChapters: 9,
  //     nextClass: 'יום ב\', 10:00',
  //     students: 28,
  //     averageGrade: 93,
  //     materials: 15,
  //     tests: 6,
  //     upcomingTest: 'מבחן פונקציות - 15/03/2026'
  //   },
  //   {
  //     id: 2,
  //     name: 'אנגלית',
  //     teacher: 'ג\'ון סמית',
  //     description: 'אנגלית ברמה מתקדמת - דקדוק, קריאה וכתיבה',
  //     color: '#06b6d4',
  //     icon: '🌍',
  //     progress: 60,
  //     chapters: 10,
  //     completedChapters: 6,
  //     nextClass: 'יום ג\', 14:00',
  //     students: 25,
  //     averageGrade: 89,
  //     materials: 12,
  //     tests: 5,
  //     upcomingTest: 'מבחן Unit 7 - 18/03/2026'
  //   },
  //   {
  //     id: 3,
  //     name: 'ביולוגיה',
  //     teacher: 'פרופ\' דוד כהן',
  //     description: 'ביולוגיה - תא, גנטיקה ואבולוציה',
  //     color: '#10b981',
  //     icon: '🧬',
  //     progress: 80,
  //     chapters: 8,
  //     completedChapters: 6,
  //     nextClass: 'יום ד\', 09:00',
  //     students: 30,
  //     averageGrade: 91,
  //     materials: 10,
  //     tests: 4,
  //     upcomingTest: null
  //   },
  //   {
  //     id: 4,
  //     name: 'פיזיקה',
  //     teacher: 'ד"ר שרה אברהם',
  //     description: 'פיזיקה - מכניקה, חשמל ומגנטיות',
  //     color: '#f59e0b',
  //     icon: '⚡',
  //     progress: 50,
  //     chapters: 10,
  //     completedChapters: 5,
  //     nextClass: 'יום ה\', 11:00',
  //     students: 27,
  //     averageGrade: 88,
  //     materials: 14,
  //     tests: 5,
  //     upcomingTest: 'מבחן חשמל - 20/03/2026'
  //   },
  //   {
  //     id: 5,
  //     name: 'היסטוריה',
  //     teacher: 'יוסף מזרחי',
  //     description: 'היסטוריה - מאה ה-20 ומלחמות העולם',
  //     color: '#8b5cf6',
  //     icon: '📜',
  //     progress: 90,
  //     chapters: 6,
  //     completedChapters: 5,
  //     nextClass: 'יום א\', 13:00',
  //     students: 26,
  //     averageGrade: 94,
  //     materials: 8,
  //     tests: 4,
  //     upcomingTest: 'מבחן סיכום - 25/03/2026'
  //   },
  //   {
  //     id: 6,
  //     name: 'ספרות',
  //     teacher: 'רחל ברק',
  //     description: 'ספרות עברית - שירה, פרוזה ודרמה',
  //     color: '#ec4899',
  //     icon: '📚',
  //     progress: 70,
  //     chapters: 8,
  //     completedChapters: 6,
  //     nextClass: 'יום ב\', 15:00',
  //     students: 24,
  //     averageGrade: 90,
  //     materials: 11,
  //     tests: 3,
  //     upcomingTest: null
  //   }
  // ];

  const filteredCourses = coursesData.filter((course: any) => {
    const matchesSearch = course.name?.includes(searchQuery) || 
                         course.teacher?.includes(searchQuery) ||
                         course.description?.includes(searchQuery);
    
    let matchesFilter = true;
    if (filterBy === 'active') matchesFilter = course.progress < 100;
    if (filterBy === 'completed') matchesFilter = course.progress === 100;
    if (filterBy === 'high-grade') matchesFilter = course.averageGrade >= 90;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={styles.container} dir="rtl">
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>הקורסים שלי</h1>
          <p style={styles.subtitle}>כל הקורסים שאתה רשום אליהם</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#14b8a620', color: '#14b8a6'}}>
            <BookOpen size={24} />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{filteredCourses.length}</div>
            <div style={styles.statLabel}>קורסים פעילים</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#10b98120', color: '#10b981'}}>
            <TrendingUp size={24} />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>
              {filteredCourses.length > 0 
                ? Math.round(filteredCourses.reduce((sum: number, course: any) => sum + (course.averageGrade || 0), 0) / filteredCourses.length)
                : 0}
            </div>
            <div style={styles.statLabel}>ממוצע כללי</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#06b6d420', color: '#06b6d4'}}>
            <Clock size={24} />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>
              {filteredCourses.length > 0
                ? Math.round(filteredCourses.reduce((sum: number, course: any) => sum + (course.progress || 0), 0) / filteredCourses.length)
                : 0}%
            </div>
            <div style={styles.statLabel}>התקדמות ממוצעת</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#f59e0b20', color: '#f59e0b'}}>
            <Award size={24} />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>
              {filteredCourses.filter((course: any) => course.upcomingTest).length}
            </div>
            <div style={styles.statLabel}>מבחנים קרובים</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <Search style={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="חפש קורס..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterButtons}>
          <button
            onClick={() => setFilterBy('all')}
            style={filterBy === 'all' ? {...styles.filterButton, ...styles.filterButtonActive} : styles.filterButton}
          >
            הכל
          </button>
          <button
            onClick={() => setFilterBy('active')}
            style={filterBy === 'active' ? {...styles.filterButton, ...styles.filterButtonActive} : styles.filterButton}
          >
            פעילים
          </button>
          <button
            onClick={() => setFilterBy('high-grade')}
            style={filterBy === 'high-grade' ? {...styles.filterButton, ...styles.filterButtonActive} : styles.filterButton}
          >
            ציונים גבוהים
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div style={styles.emptyState}>
          <div style={styles.loadingSpinner}></div>
          <h3 style={styles.emptyTitle}>טוען קורסים...</h3>
        </div>
      ) : error || coursesData.length === 0 ? (
        <div style={styles.emptyState}>
          <BookOpen size={48} style={styles.emptyIcon} />
          <h3 style={styles.emptyTitle}>
            {error ? 'לא נמצאו קורסים' : 'לא נמצאו קורסים'}
          </h3>
          <p style={styles.emptyText}>
            {error && error.includes('not found') 
              ? 'אתה עדיין לא רשום לאף קורס. פנה למנהל כדי להירשם לקורסים.'
              : searchQuery || filterBy !== 'all'
              ? 'נסה לשנות את החיפוש או הסינון'
              : 'אין לך קורסים כרגע'}
          </p>
        </div>
      ) : (
      <div style={styles.coursesGrid}>
        {filteredCourses.map(course => (
          <div key={course.id} style={styles.courseCard}>
            {/* Card Header */}
            <div style={{...styles.courseHeader, backgroundColor: course.color}}>
              <div style={styles.courseIcon}>{course.icon}</div>
              <div style={styles.courseHeaderInfo}>
                <h3 style={styles.courseName}>{course.name}</h3>
                <p style={styles.courseTeacher}>{course.teacher}</p>
              </div>
              <div style={styles.gradeBadge}>
                <div style={styles.gradeBadgeValue}>{course.averageGrade}</div>
                <div style={styles.gradeBadgeLabel}>ממוצע</div>
              </div>
            </div>

            {/* Card Content */}
            <div style={styles.courseContent}>
              <p style={styles.courseDescription}>{course.description}</p>

              {/* Progress */}
              <div style={styles.progressSection}>
                <div style={styles.progressHeader}>
                  <span style={styles.progressLabel}>התקדמות</span>
                  <span style={styles.progressValue}>
                    {course.completedChapters}/{course.chapters} פרקים
                  </span>
                </div>
                <div style={styles.progressBar}>
                  <div 
                    style={{
                      ...styles.progressBarFill, 
                      width: `${course.progress}%`,
                      backgroundColor: course.color
                    }}
                  ></div>
                </div>
              </div>

              {/* Course Stats */}
              <div style={styles.courseStats}>
                <div style={styles.courseStat}>
                  <BookOpen size={16} style={{color: '#6b7280'}} />
                  <span>{course.materials} חומרים</span>
                </div>
                <div style={styles.courseStat}>
                  <BarChart3 size={16} style={{color: '#6b7280'}} />
                  <span>{course.tests} מבחנים</span>
                </div>
                <div style={styles.courseStat}>
                  <Users size={16} style={{color: '#6b7280'}} />
                  <span>{course.students} תלמידים</span>
                </div>
              </div>

              {/* Next Class / Upcoming Test */}
              {course.upcomingTest && (
                <div style={styles.upcomingTest}>
                  <Calendar size={16} style={{color: '#f59e0b'}} />
                  <span>{course.upcomingTest}</span>
                </div>
              )}

              <div style={styles.nextClass}>
                <Clock size={16} style={{color: course.color}} />
                <span>שיעור הבא: {course.nextClass}</span>
              </div>
            </div>

            {/* Card Footer */}
            <div style={styles.courseFooter}>
              <button 
                style={{...styles.enterButton, backgroundColor: course.color}}
                onClick={() => console.log('Enter course', course.id)}
              >
                כניסה לקורס
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {!loading && !error && filteredCourses.length === 0 && coursesData.length > 0 && (
        <div style={styles.emptyState}>
          <BookOpen size={48} style={styles.emptyIcon} />
          <h3 style={styles.emptyTitle}>לא נמצאו קורסים תואמים</h3>
          <p style={styles.emptyText}>נסה לשנות את החיפוש או הסינון</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '32px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    marginBottom: '32px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    gap: '16px',
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: '400px',
  },
  searchIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px 10px 44px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
  },
  filterButtons: {
    display: 'flex',
    gap: '8px',
  },
  filterButton: {
    padding: '10px 20px',
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  filterButtonActive: {
    backgroundColor: '#f0fdfa',
    borderColor: '#14b8a6',
    color: '#14b8a6',
    fontWeight: '600',
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '24px',
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'all 0.3s',
    display: 'flex',
    flexDirection: 'column',
  },
  courseHeader: {
    padding: '24px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    position: 'relative',
  },
  courseIcon: {
    fontSize: '48px',
    lineHeight: 1,
  },
  courseHeaderInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '4px',
  },
  courseTeacher: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.9)',
  },
  gradeBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '12px 16px',
    borderRadius: '12px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
  },
  gradeBadgeValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
  },
  gradeBadgeLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.9)',
  },
  courseContent: {
    padding: '24px',
    flex: 1,
  },
  courseDescription: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  progressSection: {
    marginBottom: '20px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  progressLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
  },
  progressValue: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#14b8a6',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    transition: 'width 0.3s ease',
  },
  courseStats: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb',
  },
  courseStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#6b7280',
  },
  upcomingTest: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#92400e',
    marginBottom: '12px',
    fontWeight: '500',
  },
  nextClass: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '500',
  },
  courseFooter: {
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
  },
  enterButton: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  emptyState: {
    textAlign: 'center',
    padding: '64px 32px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  emptyIcon: {
    color: '#d1d5db',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#9ca3af',
  },
  loadingSpinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #14b8a6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px',
  },
};