import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, Trophy, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatsHeader from './components/StatsHeader';
import OverallStatsGrid from './components/OverallStatsGrid';
import WeeklyProgressSection from './components/WeeklyProgressSection';
import SubjectPerformanceSection from './components/SubjectPerformanceSection';
import RecentTestsSection from './components/RecentTestsSection';
import StudyHabitsSection from './components/StudyHabitsSection';
import AchievementsSection from './components/AchievementsSection';
import QuickStatsSection from './components/QuickStatsSection';
import { styles } from './components/styles';
import {
  Achievement,
  OverallStat,
  RecentTest,
  SubjectPerformanceItem,
  WeeklyProgressItem,
} from './components/types';
import {
  getStudentOverallStats,
  getStudentSubjectPerformance,
  getStudentRecentTests,
  getStudentStudyHabits,
  getStudentAchievements,
  getStudentWeeklyProgress,
  StudyHabits,
} from '../services/stats.service';

export default function QaitStudentStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const [overallStats, setOverallStats] = useState<OverallStat[]>([]);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformanceItem[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgressItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentTests, setRecentTests] = useState<RecentTest[]>([]);
  const [studyHabits, setStudyHabits] = useState<{ bestTimeOfDay: string; avgSessionLength: string; preferredSubject: string; studyStreak: number; totalStudyTime: string } | null>(null);

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
          //habits
          const [overall, subjects, weekly, ach, recent] = await Promise.all([
            getStudentOverallStats(user.userId),
            //getStudentSubjectPerformance(user.userId, timeRange),
            getStudentWeeklyProgress(user.userId),
            getStudentAchievements(user.userId),
            getStudentRecentTests(user.userId),
            getStudentStudyHabits(user.userId),
          ]);

          // Map overall stats - backend returns array of {label, value, change, trend}
          const mappedOverall: OverallStat[] = overall ? overall.map((stat: any, index: number) => {
            const IconComponent = [TrendingUp, BookOpen, Clock, Trophy][index];
            return {
              label: stat.label || '',
              value: stat.value || '0',
              change: stat.change || '',
              trend: stat.trend,
              icon: <IconComponent size={24} />,
              color: ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b'][index]
            };
          }) : [];

          // Map subjects
          const mappedSubjects: SubjectPerformanceItem[] = subjects?.map((s: any, i: number) => ({
            subject: s.subject || '',
            average: s.average || 0,
            lastGrade: s.lastGrade || 0,
            trend: s.trend || 'stable',
            tests: s.tests || 0,
            classAverage: s.classAverage || 0,
            color: ['#14b8a6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'][i % 5],
            strength: s.strength || 'טוב'
          })) || [];

          // Map weekly progress - backend returns {day, tests, hours, average}
          const mappedWeekly: WeeklyProgressItem[] = weekly?.map((w: any) => ({
            week: w.day || '',
            score: w.average || 0,
            tests: w.tests || 0
          })) || [];

          // Map achievements
          const mappedAchievements: Achievement[] = ach?.map((a: any) => ({
            id: a.id || 0,
            title: a.title || '',
            description: a.description || '',
            icon: a.icon || '🏆',
            earned: true,
            date: a.date ? new Date(a.date).toLocaleDateString('he-IL') : '',
            rarity: a.type === 'streak' ? 'נדיר' : a.type === 'grade' ? 'מיוחד' : 'רגיל'
          })) || [];

          // Map recent tests
          const mappedRecent: RecentTest[] = recent?.map((r: any) => ({
            id: r.id || 0,
            subject: r.subject || '',
            name: r.title || '',
            grade: r.score || 0,
            date: r.date ? new Date(r.date).toLocaleDateString('he-IL') : '',
            classAvg: 0
          })) || [];

          // Map study habits - backend returns array of {day, hours}, we need single object
          // const mappedHabits = habits && habits.length > 0 ? {
          //   bestTimeOfDay: '10:00-12:00',
          //   avgSessionLength: '45 דקות',
          //   preferredSubject: 'מתמטיקה',
          //   studyStreak: 7,
          //   totalStudyTime: `${habits.reduce((sum, h) => sum + h.hours, 0).toFixed(1)} שעות`
          // } : null;

          setOverallStats(mappedOverall);
          setSubjectPerformance(mappedSubjects);
          setWeeklyProgress(mappedWeekly);
          setAchievements(mappedAchievements);
          setRecentTests(mappedRecent);
          //setStudyHabits(mappedHabits);
        } else {
          setOverallStats([]);
          setSubjectPerformance([]);
          setWeeklyProgress([]);
          setAchievements([]);
          setRecentTests([]);
          setStudyHabits(null);
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

  return (
    <div style={styles.container} dir="rtl">
      <StatsHeader title="הסטטיסטיקות שלי" />
      <OverallStatsGrid stats={overallStats} />

      <div style={styles.mainLayout}>
        <div style={styles.leftColumn}>
          <WeeklyProgressSection weeklyProgress={weeklyProgress} />
          <SubjectPerformanceSection subjectPerformance={subjectPerformance} />
          <RecentTestsSection recentTests={recentTests} />
        </div>

        <div style={styles.rightColumn}>
          <StudyHabitsSection studyHabits={studyHabits} />
          <AchievementsSection achievements={achievements} />
          <QuickStatsSection />
        </div>
      </div>
    </div>
  );
}