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
  StudyHabits,
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
} from '../services/stats.service';

export default function QaitStudentStats() {
  const [timeRange, setTimeRange] = useState('semester');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const [overallStats, setOverallStats] = useState<OverallStat[]>([]);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformanceItem[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgressItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentTests, setRecentTests] = useState<RecentTest[]>([]);
  const [studyHabits, setStudyHabits] = useState<StudyHabits | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user) {
          setError('משתמש לא מחובר');
          return;
        }

        // fetch real stats from API
        if (user.userId) {
          const [overall, subjects, weekly, ach, recent, habits] = await Promise.all([
            getStudentOverallStats(user.userId),
            getStudentSubjectPerformance(user.userId, timeRange),
            getStudentWeeklyProgress(user.userId),
            getStudentAchievements(user.userId),
            getStudentRecentTests(user.userId),
            getStudentStudyHabits(user.userId),
          ]);
          setOverallStats(overall || []);
          setSubjectPerformance(subjects || []);
          setWeeklyProgress(weekly || []);
          setAchievements(ach || []);
          setRecentTests(recent || []);
          setStudyHabits(habits || null);
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