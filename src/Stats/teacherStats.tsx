import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, BookOpen, FileEdit, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatsHeader from './components/StatsHeader';
import { styles } from './components/styles';

interface TeacherOverallStat {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
  total?: string;
}

interface ClassProgress {
  className: string;
  average: number;
  students: number;
  tests: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface TeacherSubjectItem {
  subject: string;
  classes: number;
  students: number;
  averageGrade: number;
  testsCreated: number;
  trend: 'up' | 'down' | 'stable';
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
  const [timeRange, setTimeRange] = useState('semester');
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

        // TODO: replace with actual API response
        const mockOverallStats: TeacherOverallStat[] = []; // placeholder array

        const mockClassProgress: ClassProgress[] = []; // placeholder

        const mockSubjects: TeacherSubjectItem[] = []; // placeholder

        const mockRecentTests: TeacherRecentTest[] = []; // placeholder

        setOverallStats(mockOverallStats);
        setClassProgress(mockClassProgress);
        setSubjects(mockSubjects);
        setRecentTests(mockRecentTests);

      } catch (err: any) {
        setError(err?.message || 'שגיאה בטעינת הסטטיסטיקות');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, timeRange]);

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

  return (
    <div style={styles.container} dir="rtl">
      <StatsHeader timeRange={timeRange} onChangeTimeRange={setTimeRange} />
      
      <div style={styles.overallStatsGrid}>
        {overallStats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{...styles.statIcon, backgroundColor: `${stat.color}20`, color: stat.color}}>
              {stat.icon}
            </div>
            <div style={styles.statContent}>
              <div style={styles.statLabel}>{stat.label}</div>
              <div style={styles.statValue}>
                {stat.value}
                {stat.total && <span style={styles.statTotal}>{stat.total}</span>}
              </div>
              {stat.change && (
                <div style={{...styles.statChange, color: stat.trend === 'up' ? '#10b981' : stat.trend === 'down' ? '#ef4444' : '#6b7280'}}>
                  {stat.change}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.mainLayout}>
        <div style={styles.leftColumn}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>התקדמות כיתות</h3>
            {classProgress.map((cls, index) => (
              <div key={index} style={styles.classProgressItem}>
                <div style={styles.classProgressHeader}>
                  <span style={styles.className}>{cls.className}</span>
                  <span style={{...styles.classTrend, color: cls.trend === 'up' ? '#10b981' : cls.trend === 'down' ? '#ef4444' : '#6b7280'}}>
                    {cls.trend === 'up' ? '↑' : cls.trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
                <div style={styles.progressBarContainer}>
                  <div style={{...styles.progressBar, width: `${cls.average}%`, backgroundColor: cls.color}} />
                </div>
                <div style={styles.classStats}>
                  <span>ממוצע: {cls.average}%</span>
                  <span>תלמידים: {cls.students}</span>
                  <span>מבחנים: {cls.tests}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>נושאים שלימדתי</h3>
            {subjects.map((subject, index) => (
              <div key={index} style={styles.subjectItem}>
                <div style={{...styles.subjectIcon, backgroundColor: `${subject.color}20`, color: subject.color}}>
                  <BookOpen size={20} />
                </div>
                <div style={styles.subjectContent}>
                  <div style={styles.subjectName}>{subject.subject}</div>
                  <div style={styles.subjectStats}>
                    <span>כיתות: {subject.classes}</span>
                    <span>תלמידים: {subject.students}</span>
                    <span>ממוצע: {subject.averageGrade}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>מבחנים אחרונים</h3>
            {recentTests.map((test) => (
              <div key={test.id} style={styles.recentTestItem}>
                <div style={styles.recentTestHeader}>
                  <span style={styles.recentTestTitle}>{test.title}</span>
                  <span style={styles.recentTestDate}>{test.date}</span>
                </div>
                <div style={styles.recentTestInfo}>
                  <span>{test.className}</span>
                  <span>הגשות: {test.submissions}</span>
                  <span style={{color: test.avgGrade >= 85 ? '#10b981' : test.avgGrade >= 70 ? '#f59e0b' : '#ef4444'}}>
                    ממוצע: {test.avgGrade}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
