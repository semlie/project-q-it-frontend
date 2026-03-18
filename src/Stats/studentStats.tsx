import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, Trophy, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatsHeader from './components/StatsHeader';
import OverallStatsGrid from './components/OverallStatsGrid';
import AchievementsSection from './components/AchievementsSection';
import { styles } from './components/styles';
import { Achievement, OverallStat } from './components/types';
import { getStudentOverallStats, getStudentAchievements } from '../services/stats.service';

export default function QaitStudentStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [overallStats, setOverallStats] = useState<OverallStat[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

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
          const [overall, ach] = await Promise.all([
            getStudentOverallStats(user.userId),
            getStudentAchievements(user.userId),
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
          
          setOverallStats(mappedOverall);
          setAchievements(mappedAchievements);
        } else {
          setOverallStats([]);
          setAchievements([]);
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
          {/* TODO: Add recent tests or weekly progress chart here */}
        </div>
        <div style={styles.rightColumn}>
          <AchievementsSection achievements={achievements} />
        </div>
      </div>
    </div>
  );
}
