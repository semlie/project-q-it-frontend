import { BookOpen, Clock, Target, TrendingUp, Zap } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { styles } from './styles';
import { StudyHabits } from './types';

interface StudyHabitsSectionProps {
  studyHabits: StudyHabits | null;
}

export default function StudyHabitsSection({ studyHabits }: StudyHabitsSectionProps) {
  const habits = studyHabits || {
    bestTimeOfDay: "-",
    avgSessionLength: "-",
    preferredSubject: "-",
    studyStreak: 0,
    totalStudyTime: "-"
  };
  
  return (
    <div style={styles.section}>
      <SectionTitle icon={<Zap size={20} />} title="הרגלי למידה" />
      <div style={styles.habitsList}>
        <div style={styles.habitItem}>
          <div style={styles.habitIcon}>
            <Clock size={20} style={{ color: '#14b8a6' }} />
          </div>
          <div style={styles.habitContent}>
            <div style={styles.habitLabel}>זמן אופטימלי</div>
            <div style={styles.habitValue}>{habits.bestTimeOfDay}</div>
          </div>
        </div>

        <div style={styles.habitItem}>
          <div style={styles.habitIcon}>
            <Target size={20} style={{ color: '#06b6d4' }} />
          </div>
          <div style={styles.habitContent}>
            <div style={styles.habitLabel}>אורך סשן ממוצע</div>
            <div style={styles.habitValue}>{habits.avgSessionLength}</div>
          </div>
        </div>

        <div style={styles.habitItem}>
          <div style={styles.habitIcon}>
            <BookOpen size={20} style={{ color: '#10b981' }} />
          </div>
          <div style={styles.habitContent}>
            <div style={styles.habitLabel}>נושא מועדף</div>
            <div style={styles.habitValue}>{habits.preferredSubject}</div>
          </div>
        </div>

        <div style={styles.habitItem}>
          <div style={styles.habitIcon}>
            <TrendingUp size={20} style={{ color: '#f59e0b' }} />
          </div>
          <div style={styles.habitContent}>
            <div style={styles.habitLabel}>רצף למידה</div>
            <div style={styles.habitValue}>{habits.studyStreak} ימים</div>
          </div>
        </div>
      </div>
    </div>
  );
}
