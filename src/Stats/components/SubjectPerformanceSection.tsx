import { Target, TrendingDown, TrendingUp } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { styles } from './styles';
import { SubjectPerformanceItem } from './types';

interface SubjectPerformanceSectionProps {
  subjectPerformance: SubjectPerformanceItem[];
}

function getTrendIcon(trend: string) {
  if (trend === 'up') return <TrendingUp size={16} style={{ color: '#10b981' }} />;
  if (trend === 'down') return <TrendingDown size={16} style={{ color: '#ef4444' }} />;
  return <span style={{ fontSize: '14px', color: '#6b7280' }}>—</span>;
}

function getStrengthColor(strength: string) {
  switch (strength) {
    case 'מצוין':
      return '#10b981';
    case 'חזק':
      return '#14b8a6';
    case 'טוב':
      return '#06b6d4';
    default:
      return '#6b7280';
  }
}

export default function SubjectPerformanceSection({ subjectPerformance }: SubjectPerformanceSectionProps) {
  return (
    <div style={styles.section}>
      <SectionTitle icon={<Target size={20} />} title="ביצועים לפי נושא" />
      <div style={styles.subjectsList}>
        {subjectPerformance.map((subject) => (
          <div key={subject.subject} style={styles.subjectCard}>
            <div style={styles.subjectHeader}>
              <div style={styles.subjectInfo}>
                <div style={{ ...styles.subjectDot, backgroundColor: subject.color }}></div>
                <div>
                  <div style={styles.subjectName}>{subject.subject}</div>
                  <div style={styles.subjectMeta}>{subject.tests} מבחנים</div>
                </div>
              </div>
              <div style={styles.subjectBadge}>
                <div
                  style={{
                    ...styles.strengthBadge,
                    backgroundColor: `${getStrengthColor(subject.strength)}20`,
                    color: getStrengthColor(subject.strength),
                  }}
                >
                  {subject.strength}
                </div>
              </div>
            </div>

            <div style={styles.subjectScores}>
              <div style={styles.scoreItem}>
                <span style={styles.scoreLabel}>הממוצע שלי</span>
                <span style={{ ...styles.scoreValue, color: subject.color }}>{subject.average}</span>
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
              <div
                style={{
                  ...styles.subjectBarFill,
                  width: `${subject.average}%`,
                  backgroundColor: subject.color,
                }}
              ></div>
            </div>

            <div style={styles.comparison}>
              {subject.average > subject.classAverage ? (
                <span style={{ color: '#10b981' }}>+{subject.average - subject.classAverage} מעל הממוצע</span>
              ) : (
                <span style={{ color: '#ef4444' }}>{subject.average - subject.classAverage} מתחת לממוצע</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
