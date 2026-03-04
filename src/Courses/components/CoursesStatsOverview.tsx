import { Award, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { Course } from './types';
import { styles } from './styles';

interface CoursesStatsOverviewProps {
  filteredCourses: Course[];
}

export default function CoursesStatsOverview({ filteredCourses }: CoursesStatsOverviewProps) {
  const averageGrade =
    filteredCourses.length > 0
      ? Math.round(
          filteredCourses.reduce((sum, course) => sum + (course.averageGrade || 0), 0) /
            filteredCourses.length,
        )
      : 0;

  const averageProgress =
    filteredCourses.length > 0
      ? Math.round(
          filteredCourses.reduce((sum, course) => sum + (course.progress || 0), 0) /
            filteredCourses.length,
        )
      : 0;

  const upcomingTests = filteredCourses.filter((course) => course.upcomingTest).length;

  const statItems = [
    {
      label: 'קורסים פעילים',
      value: filteredCourses.length,
      icon: <BookOpen size={24} />,
      iconStyle: { backgroundColor: '#14b8a620', color: '#14b8a6' },
    },
    {
      label: 'ממוצע כללי',
      value: averageGrade,
      icon: <TrendingUp size={24} />,
      iconStyle: { backgroundColor: '#10b98120', color: '#10b981' },
    },
    {
      label: 'התקדמות ממוצעת',
      value: `${averageProgress}%`,
      icon: <Clock size={24} />,
      iconStyle: { backgroundColor: '#06b6d420', color: '#06b6d4' },
    },
    {
      label: 'מבחנים קרובים',
      value: upcomingTests,
      icon: <Award size={24} />,
      iconStyle: { backgroundColor: '#f59e0b20', color: '#f59e0b' },
    },
  ];

  return (
    <div style={styles.statsGrid}>
      {statItems.map((item) => (
        <div key={item.label} style={styles.statCard}>
          <div style={{ ...styles.statIcon, ...item.iconStyle }}>{item.icon}</div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{item.value}</div>
            <div style={styles.statLabel}>{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
