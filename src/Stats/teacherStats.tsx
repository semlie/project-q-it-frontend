import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, BookOpen, FileEdit, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatsHeader from './components/StatsHeader';
import { styles } from './components/styles';
import {
  getTeacherOverallStats,
  getTeacherClassProgress,
  getTeacherSubjects,
  getTeacherRecentTests,
} from '../services/stats.service';

interface TeacherOverallStat {
  label: string;
  value: string;
  change?: string;
  trend?: string;
  icon: React.ReactNode;
  color: string;
}

interface ClassProgress {
  className: string;
  average: number;
  students: number;
  tests: number;
  trend: string;
  color: string;
}

interface TeacherSubjectItem {
  subject: string;
  classes: number;
  students: number;
  averageGrade: number;
  testsCreated: number;
  trend: string;
  color: string;
}

interface TeacherRecentTest {
  id: number;
  subject: string;
  className: string;
  title: string;
  date: string;
  submissions: number;
  avgGrade: number;
}

export default function QaitTeacherStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const [overallStats, setOverallStats] = useState<TeacherOverallStat[]>([]);
  const [classProgress, setClassProgress] = useState<ClassProgress[]>([]);
  const [subjects, setSubjects] = useState<TeacherSubjectItem[]>([]);
  const [recentTests, setRecentTests] = useState<TeacherRecentTest[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user) {
          setError('משתמש לא מחובר');
          return;
        }

        if (user.userId) {
          const [overall, classes, subs, recent] = await Promise.all([
            getTeacherOverallStats(user.userId),
            getTeacherClassProgress(user.userId),
            getTeacherSubjects(user.userId),
            getTeacherRecentTests(user.userId),
          ]);

          console.log('Teacher Stats API Response:');
          console.log('- Overall:', overall);
          console.log('- Classes:', classes);
          console.log('- Subjects:', subs);
          console.log('- Recent:', recent);
          
          // Map overall stats - backend returns array of {label, value}
          const mappedOverall: TeacherOverallStat[] = overall ? overall.map((stat: any, index: number) => {
            const IconComponent = [Users, FileEdit, TrendingUp, BookOpen][index];
            return {
              label: stat.label || '',
              value: stat.value || '0',
              change: stat.change || '',
              trend: stat.trend,
              icon: <IconComponent size={24} />,
              color: ['#10b981', '#06b6d4', '#f59e0b', '#8b5cf6'][index]
            };
          }) : [];

          const mappedClasses: ClassProgress[] = classes?.map((c: any, i: number) => ({
            className: c.className || `כיתה ${i + 1}`,
            average: c.average || 0,
            students: c.students || 0,
            tests: c.tests || 0,
            trend: c.trend || 'stable',
            color: ['#14b8a6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'][i % 5]
          })) || [];

          const mappedSubjects: TeacherSubjectItem[] = subs?.map((s: any, i: number) => ({
            subject: s.subject || 'נושא',
            classes: s.classes || 0,
            students: s.students || 0,
            averageGrade: s.averageGrade || 0,
            testsCreated: s.testsCreated || 0,
            trend: s.trend || 'stable',
            color: ['#14b8a6', '#06b6d4', '#10b981', '#f59e0b'][i % 4]
          })) || [];

          // Backend returns RecentTest: { id, subject, title, date, score, maxScore, duration }
          const mappedRecent: TeacherRecentTest[] = recent?.map((t: any) => ({
            id: t.id || 0,
            subject: t.subject || '',
            className: '',
            title: t.title || '',
            date: t.date ? new Date(t.date).toLocaleDateString('he-IL') : '',
            submissions: t.maxScore || 0,
            avgGrade: t.score || 0
          })) || [];

          setOverallStats(mappedOverall);
          setClassProgress(mappedClasses);
          setSubjects(mappedSubjects);
          setRecentTests(mappedRecent);
        } else {
          setOverallStats([]);
          setClassProgress([]);
          setSubjects([]);
          setRecentTests([]);
        }

      } catch (err: any) {
        setError(err?.message || 'שגיאה בטעינת הסטטיסטיקות');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div style={{...styles.container, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px'}} dir="rtl">
        <Loader2 size={48} style={{animation: 'spin 1s linear infinite', color: '#06b6d4'}} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{...styles.container, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '400px'}} dir="rtl">
        <AlertCircle size={48} style={{color: '#ef4444', marginBottom: '16px'}} />
        <p style={{color: '#ef4444', fontSize: '18px'}}>{error}</p>
      </div>
    );
  }

  const hasData = overallStats.length > 0 || classProgress.length > 0 || subjects.length > 0;

  return (
    <div style={styles.container} dir="rtl">
      <StatsHeader title="סטטיסטיקות הכיתה"/>
      
      {!hasData ? (
        <div style={{textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <BookOpen size={64} style={{color: '#9ca3af', marginBottom: '16px'}} />
          <h2 style={{fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '8px'}}>אין נתונים זמינים</h2>
          <p style={{color: '#6b7280', fontSize: '14px'}}>טרם נוספו מבחנים או תלמידים לכיתות שלך</p>
        </div>
      ) : (
        <>
          <div style={styles.statsGrid}>
            {overallStats.map((stat, index) => (
              <div key={index} style={styles.statCard}>
                <div style={{...styles.statIcon, backgroundColor: `${stat.color}20`, color: stat.color}}>
                  {stat.icon}
                </div>
                <div style={styles.statContent}>
                  <div style={styles.statLabel}>{stat.label}</div>
                  <div style={styles.statValue}>
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.mainLayout}>
            <div style={styles.leftColumn}>
              {classProgress.length > 0 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>התקדמות לפי כיתות</h3>
                  {classProgress.map((cls, index) => (
                    <div key={index} style={styles.classProgressItem}>
                      <div style={styles.classProgressHeader}>
                        <span style={styles.className}>{cls.className}</span>
                        <span style={{...styles.classTrend, color: '#10b981', fontWeight: 'bold'}}>
                          {cls.average.toFixed(1)}%
                        </span>
                      </div>
                      <div style={styles.progressBarContainer}>
                        <div style={{...styles.progressBar, width: `${Math.min(cls.average, 100)}%`, backgroundColor: cls.color}} />
                      </div>
                      <div style={styles.classStats}>
                        <span>👥 {cls.students} תלמידים</span>
                        <span>📝 {cls.tests} מבחנים</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {subjects.length > 0 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>ממוצעים לפי מקצוע</h3>
                  {subjects.map((subject, index) => (
                    <div key={index} style={styles.subjectItem}>
                      <div style={{...styles.subjectIcon, backgroundColor: `${subject.color}20`, color: subject.color}}>
                        <BookOpen size={20} />
                      </div>
                      <div style={{...styles.subjectContent, flex: 1}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                          <span style={styles.subjectName}>{subject.subject}</span>
                          <span style={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: subject.averageGrade >= 85 ? '#10b981' : subject.averageGrade >= 70 ? '#f59e0b' : '#ef4444'
                          }}>
                            {subject.averageGrade.toFixed(1)}%
                          </span>
                        </div>
                        <div style={styles.progressBarContainer}>
                          <div style={{...styles.progressBar, width: `${Math.min(subject.averageGrade, 100)}%`, backgroundColor: subject.color}} />
                        </div>
                        <div style={styles.subjectStats}>
                          <span>🏫 {subject.classes} כיתות</span>
                          <span>👥 {subject.students} תלמידים</span>
                          <span>📝 {subject.testsCreated} מבחנים</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={styles.rightColumn}>
              {recentTests.length > 0 && (
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>מבחנים אחרונים</h3>
                  {recentTests.map((test) => (
                    <div key={test.id} style={styles.recentTestItem}>
                      <div style={styles.recentTestHeader}>
                        <span style={styles.recentTestTitle}>{test.title}</span>
                        <span style={styles.recentTestDate}>{test.date}</span>
                      </div>
                      <div style={styles.recentTestInfo}>
                        <span>📚 {test.subject}</span>
                        <span style={{
                          fontWeight: 'bold',
                          color: test.avgGrade >= 85 ? '#10b981' : test.avgGrade >= 70 ? '#f59e0b' : '#ef4444'
                        }}>
                          ⭐ {test.avgGrade}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
