import React, { useState } from 'react';
import { TrendingUp, BookOpen, Trophy, Clock } from 'lucide-react';
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

export default function QaitStudentStats() {
  const [timeRange, setTimeRange] = useState('semester');

  const overallStats: OverallStat[] = [
    { 
      label: "ממוצע כללי", 
      value: "91.5", 
      change: "+2.3",
      trend: "up",
      icon: <TrendingUp size={24} />, 
      color: "#10b981" 
    },
    { 
      label: "מבחנים שבוצעו", 
      value: "24", 
      total: "26",
      change: "92%",
      icon: <BookOpen size={24} />, 
      color: "#06b6d4" 
    },
    { 
      label: "דירוג בכיתה", 
      value: "#3", 
      total: "/28",
      change: "Top 11%",
      icon: <Trophy size={24} />, 
      color: "#f59e0b" 
    },
    { 
      label: "שעות למידה", 
      value: "42", 
      change: "+8",
      trend: "up",
      icon: <Clock size={24} />, 
      color: "#8b5cf6" 
    }
  ];

  const subjectPerformance: SubjectPerformanceItem[] = [
    { 
      subject: "מתמטיקה", 
      average: 93, 
      lastGrade: 95,
      trend: "up",
      tests: 6, 
      classAverage: 82,
      color: "#14b8a6",
      strength: "חזק" 
    },
    { 
      subject: "אנגלית", 
      average: 89, 
      lastGrade: 88,
      trend: "stable",
      tests: 5, 
      classAverage: 85,
      color: "#06b6d4",
      strength: "טוב" 
    },
    { 
      subject: "ביולוגיה", 
      average: 91, 
      lastGrade: 92,
      trend: "up",
      tests: 4, 
      classAverage: 79,
      color: "#10b981",
      strength: "חזק" 
    },
    { 
      subject: "פיזיקה", 
      average: 88, 
      lastGrade: 85,
      trend: "down",
      tests: 5, 
      classAverage: 84,
      color: "#f59e0b",
      strength: "טוב" 
    },
    { 
      subject: "היסטוריה", 
      average: 94, 
      lastGrade: 96,
      trend: "up",
      tests: 4, 
      classAverage: 81,
      color: "#8b5cf6",
      strength: "מצוין" 
    }
  ];

  const weeklyProgress: WeeklyProgressItem[] = [
    { week: "שבוע 1", score: 85, tests: 2 },
    { week: "שבוע 2", score: 87, tests: 1 },
    { week: "שבוע 3", score: 89, tests: 3 },
    { week: "שבוע 4", score: 90, tests: 2 },
    { week: "שבוע 5", score: 91, tests: 2 },
    { week: "שבוע 6", score: 92, tests: 3 }
  ];

  const achievements: Achievement[] = [
    { 
      id: 1, 
      title: "מצטיין", 
      description: "3 מבחנים ברציפות מעל 90", 
      icon: "🏆", 
      earned: true,
      date: "15/02/2026",
      rarity: "נדיר"
    },
    { 
      id: 2, 
      title: "מהיר כברק", 
      description: "סיים מבחן ב-30 דקות", 
      icon: "⚡", 
      earned: true,
      date: "10/02/2026",
      rarity: "נדיר"
    },
    { 
      id: 3, 
      title: "מתמיד", 
      description: "התחבר 7 ימים ברציפות", 
      icon: "🔥", 
      earned: true,
      date: "08/02/2026",
      rarity: "רגיל"
    },
    { 
      id: 4, 
      title: "פרפקציוניסט", 
      description: "קבל 100 במבחן", 
      icon: "💯", 
      earned: false,
      rarity: "נדיר מאוד"
    },
    { 
      id: 5, 
      title: "מוביל הכיתה", 
      description: "הגע למקום ראשון", 
      icon: "👑", 
      earned: false,
      rarity: "אגדי"
    }
  ];

  const recentTests: RecentTest[] = [
    { id: 1, subject: "מתמטיקה", name: "אלגברה", grade: 95, date: "10/02/2026", classAvg: 82 },
    { id: 2, subject: "אנגלית", name: "Unit 5", grade: 88, date: "08/02/2026", classAvg: 85 },
    { id: 3, subject: "ביולוגיה", name: "התא", grade: 92, date: "05/02/2026", classAvg: 79 },
    { id: 4, subject: "פיזיקה", name: "תנועה", grade: 85, date: "03/02/2026", classAvg: 84 },
    { id: 5, subject: "היסטוריה", name: "מלחמת העולם", grade: 96, date: "01/02/2026", classAvg: 81 }
  ];

  const studyHabits: StudyHabits = {
    bestTimeOfDay: "10:00-12:00",
    avgSessionLength: "45 דקות",
    preferredSubject: "מתמטיקה",
    studyStreak: 7,
    totalStudyTime: "42 שעות"
  };

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