import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Award, Target, BookOpen, Calendar, BarChart3, Clock, CheckCircle, AlertCircle, Zap, Trophy, Medal } from 'lucide-react';

export default function QaitStudentStats() {
  const [timeRange, setTimeRange] = useState('semester');

  const overallStats = [
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

  const subjectPerformance = [
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

  const weeklyProgress = [
    { week: "שבוע 1", score: 85, tests: 2 },
    { week: "שבוע 2", score: 87, tests: 1 },
    { week: "שבוע 3", score: 89, tests: 3 },
    { week: "שבוע 4", score: 90, tests: 2 },
    { week: "שבוע 5", score: 91, tests: 2 },
    { week: "שבוע 6", score: 92, tests: 3 }
  ];

  const achievements = [
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

  const recentTests = [
    { id: 1, subject: "מתמטיקה", name: "אלגברה", grade: 95, date: "10/02/2026", classAvg: 82 },
    { id: 2, subject: "אנגלית", name: "Unit 5", grade: 88, date: "08/02/2026", classAvg: 85 },
    { id: 3, subject: "ביולוגיה", name: "התא", grade: 92, date: "05/02/2026", classAvg: 79 },
    { id: 4, subject: "פיזיקה", name: "תנועה", grade: 85, date: "03/02/2026", classAvg: 84 },
    { id: 5, subject: "היסטוריה", name: "מלחמת העולם", grade: 96, date: "01/02/2026", classAvg: 81 }
  ];

  const studyHabits = {
    bestTimeOfDay: "10:00-12:00",
    avgSessionLength: "45 דקות",
    preferredSubject: "מתמטיקה",
    studyStreak: 7,
    totalStudyTime: "42 שעות"
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp size={16} style={{color: '#10b981'}} />;
    if (trend === 'down') return <TrendingDown size={16} style={{color: '#ef4444'}} />;
    return <span style={{fontSize: '14px', color: '#6b7280'}}>—</span>;
  };

  const getStrengthColor = (strength) => {
    switch(strength) {
      case 'מצוין': return '#10b981';
      case 'חזק': return '#14b8a6';
      case 'טוב': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  return (
    <div style={styles.container} dir="rtl">
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>הסטטיסטיקות שלי</h1>
          <p style={styles.subtitle}>מעקב אחר ההתקדמות וההישגים שלך</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={styles.select}
        >
          <option value="week">שבוע אחרון</option>
          <option value="month">חודש אחרון</option>
          <option value="semester">סמסטר</option>
          <option value="year">שנה</option>
        </select>
      </div>

      {/* Overall Stats Cards */}
      <div style={styles.statsGrid}>
        {overallStats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{...styles.statIcon, backgroundColor: stat.color + '20', color: stat.color}}>
              {stat.icon}
            </div>
            <div style={styles.statContent}>
              <div style={styles.statLabel}>{stat.label}</div>
              <div style={styles.statValueRow}>
                <span style={styles.statValue}>{stat.value}</span>
                {stat.total && <span style={styles.statTotal}>{stat.total}</span>}
              </div>
              <div style={styles.statChange}>
                {stat.trend && getTrendIcon(stat.trend)}
                <span style={{color: stat.trend === 'up' ? '#10b981' : '#6b7280'}}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.mainLayout}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Weekly Progress Chart */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <BarChart3 size={20} />
              התקדמות שבועית
            </h2>
            <div style={styles.chartContainer}>
              <div style={styles.chartBars}>
                {weeklyProgress.map((item, index) => (
                  <div key={index} style={styles.barWrapper}>
                    <div style={{...styles.bar, height: `${item.score}%`}}>
                      <span style={styles.barValue}>{item.score}</span>
                    </div>
                    <div style={styles.barLabel}>{item.week}</div>
                    <div style={styles.barTests}>{item.tests} מבחנים</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Performance */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Target size={20} />
              ביצועים לפי נושא
            </h2>
            <div style={styles.subjectsList}>
              {subjectPerformance.map((subject, index) => (
                <div key={index} style={styles.subjectCard}>
                  <div style={styles.subjectHeader}>
                    <div style={styles.subjectInfo}>
                      <div style={{...styles.subjectDot, backgroundColor: subject.color}}></div>
                      <div>
                        <div style={styles.subjectName}>{subject.subject}</div>
                        <div style={styles.subjectMeta}>{subject.tests} מבחנים</div>
                      </div>
                    </div>
                    <div style={styles.subjectBadge}>
                      <div style={{...styles.strengthBadge, backgroundColor: getStrengthColor(subject.strength) + '20', color: getStrengthColor(subject.strength)}}>
                        {subject.strength}
                      </div>
                    </div>
                  </div>

                  <div style={styles.subjectScores}>
                    <div style={styles.scoreItem}>
                      <span style={styles.scoreLabel}>הממוצע שלי</span>
                      <span style={{...styles.scoreValue, color: subject.color}}>{subject.average}</span>
                    </div>
                    <div style={styles.scoreItem}>
                      <span style={styles.scoreLabel}>ממוצע הכיתה</span>
                      <span style={styles.scoreValue}>{subject.classAverage}</span>
                    </div>
                    <div style={styles.scoreItem}>
                      <span style={styles.scoreLabel}>מבחן אחרון</span>
                      <div style={styles.lastGrade}>
                        <span style={styles.scoreValue}>{subject.lastGrade}</span>
                        {getTrendIcon(subject.trend)}
                      </div>
                    </div>
                  </div>

                  <div style={styles.subjectBar}>
                    <div style={{...styles.subjectBarFill, width: `${subject.average}%`, backgroundColor: subject.color}}></div>
                  </div>

                  <div style={styles.comparison}>
                    {subject.average > subject.classAverage ? (
                      <span style={{color: '#10b981'}}>
                        +{subject.average - subject.classAverage} מעל הממוצע
                      </span>
                    ) : (
                      <span style={{color: '#ef4444'}}>
                        {subject.average - subject.classAverage} מתחת לממוצע
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tests */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Calendar size={20} />
              מבחנים אחרונים
            </h2>
            <div style={styles.testsList}>
              {recentTests.map(test => (
                <div key={test.id} style={styles.testItem}>
                  <div style={styles.testInfo}>
                    <div style={styles.testSubject}>{test.subject}</div>
                    <div style={styles.testName}>{test.name}</div>
                    <div style={styles.testDate}>{test.date}</div>
                  </div>
                  <div style={styles.testScores}>
                    <div style={styles.testGrade}>
                      <span style={styles.gradeValue}>{test.grade}</span>
                      <span style={styles.gradeLabel}>הציון שלי</span>
                    </div>
                    <div style={styles.testComparison}>
                      <span style={styles.comparisonValue}>
                        {test.grade > test.classAvg ? '+' : ''}{test.grade - test.classAvg}
                      </span>
                      <span style={styles.comparisonLabel}>vs. ממוצע</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Study Habits */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Zap size={20} />
              הרגלי למידה
            </h2>
            <div style={styles.habitsList}>
              <div style={styles.habitItem}>
                <div style={styles.habitIcon}>
                  <Clock size={20} style={{color: '#14b8a6'}} />
                </div>
                <div style={styles.habitContent}>
                  <div style={styles.habitLabel}>זמן אופטימלי</div>
                  <div style={styles.habitValue}>{studyHabits.bestTimeOfDay}</div>
                </div>
              </div>

              <div style={styles.habitItem}>
                <div style={styles.habitIcon}>
                  <Target size={20} style={{color: '#06b6d4'}} />
                </div>
                <div style={styles.habitContent}>
                  <div style={styles.habitLabel}>אורך סשן ממוצע</div>
                  <div style={styles.habitValue}>{studyHabits.avgSessionLength}</div>
                </div>
              </div>

              <div style={styles.habitItem}>
                <div style={styles.habitIcon}>
                  <BookOpen size={20} style={{color: '#10b981'}} />
                </div>
                <div style={styles.habitContent}>
                  <div style={styles.habitLabel}>נושא מועדף</div>
                  <div style={styles.habitValue}>{studyHabits.preferredSubject}</div>
                </div>
              </div>

              <div style={styles.habitItem}>
                <div style={styles.habitIcon}>
                  <TrendingUp size={20} style={{color: '#f59e0b'}} />
                </div>
                <div style={styles.habitContent}>
                  <div style={styles.habitLabel}>רצף למידה</div>
                  <div style={styles.habitValue}>{studyHabits.studyStreak} ימים 🔥</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Award size={20} />
              הישגים ({achievements.filter(a => a.earned).length}/{achievements.length})
            </h2>
            <div style={styles.achievementsList}>
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  style={achievement.earned ? styles.achievementCard : styles.achievementCardLocked}
                >
                  <div style={styles.achievementIcon}>{achievement.icon}</div>
                  <div style={styles.achievementContent}>
                    <div style={styles.achievementTitle}>{achievement.title}</div>
                    <div style={styles.achievementDescription}>{achievement.description}</div>
                    {achievement.earned && achievement.date && (
                      <div style={styles.achievementDate}>הושג ב-{achievement.date}</div>
                    )}
                  </div>
                  <div style={styles.achievementRarity}>
                    {achievement.rarity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>מידע מהיר</h2>
            <div style={styles.quickStats}>
              <div style={styles.quickStatItem}>
                <CheckCircle size={18} style={{color: '#10b981'}} />
                <span style={styles.quickStatText}>18/20 נושאים נשלטו</span>
              </div>
              <div style={styles.quickStatItem}>
                <Clock size={18} style={{color: '#06b6d4'}} />
                <span style={styles.quickStatText}>38 דקות ממוצע למבחן</span>
              </div>
              <div style={styles.quickStatItem}>
                <Target size={18} style={{color: '#f59e0b'}} />
                <span style={styles.quickStatText}>92% שיעור הגשה בזמן</span>
              </div>
              <div style={styles.quickStatItem}>
                <TrendingUp size={18} style={{color: '#8b5cf6'}} />
                <span style={styles.quickStatText}>שיפור של 5% בחודש</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  select: {
    padding: '10px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
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
    alignItems: 'flex-start',
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
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
  },
  statValueRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statTotal: {
    fontSize: '20px',
    color: '#9ca3af',
  },
  statChange: {
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  section: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  chartContainer: {
    padding: '20px 0',
  },
  chartBars: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '250px',
    gap: '8px',
  },
  barWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    background: 'linear-gradient(180deg, #14b8a6 0%, #06b6d4 100%)',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '8px',
    minHeight: '40px',
  },
  barValue: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
  },
  barLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '8px',
  },
  barTests: {
    fontSize: '10px',
    color: '#9ca3af',
    marginTop: '2px',
  },
  subjectsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  subjectCard: {
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  subjectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  subjectInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  subjectDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  subjectName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
  },
  subjectMeta: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  subjectBadge: {
    display: 'flex',
    gap: '8px',
  },
  strengthBadge: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '12px',
  },
  subjectScores: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '12px',
  },
  scoreItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  scoreLabel: {
    fontSize: '11px',
    color: '#9ca3af',
  },
  scoreValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  lastGrade: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  subjectBar: {
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  subjectBarFill: {
    height: '100%',
    transition: 'width 0.3s ease',
  },
  comparison: {
    fontSize: '12px',
    fontWeight: '500',
  },
  testsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  testItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  testInfo: {
    flex: 1,
  },
  testSubject: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#14b8a6',
    marginBottom: '4px',
  },
  testName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
  },
  testDate: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  testScores: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  testGrade: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gradeValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#14b8a6',
  },
  gradeLabel: {
    fontSize: '11px',
    color: '#9ca3af',
  },
  testComparison: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  comparisonValue: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#10b981',
  },
  comparisonLabel: {
    fontSize: '11px',
    color: '#9ca3af',
  },
  habitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  habitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  habitIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitContent: {
    flex: 1,
  },
  habitLabel: {
    fontSize: '12px',
    color: '#9ca3af',
    marginBottom: '4px',
  },
  habitValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
  },
  achievementsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  achievementCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f0fdfa',
    border: '2px solid #14b8a6',
    borderRadius: '8px',
    position: 'relative',
  },
  achievementCardLocked: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: '36px',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '4px',
  },
  achievementDescription: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px',
  },
  achievementDate: {
    fontSize: '11px',
    color: '#14b8a6',
  },
  achievementRarity: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#9ca3af',
    backgroundColor: 'white',
    padding: '4px 8px',
    borderRadius: '8px',
  },
  quickStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  quickStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  quickStatText: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '500',
  },
};