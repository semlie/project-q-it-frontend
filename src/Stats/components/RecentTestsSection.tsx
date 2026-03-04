import { Calendar } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { styles } from './styles';
import { RecentTest } from './types';

interface RecentTestsSectionProps {
  recentTests: RecentTest[];
}

export default function RecentTestsSection({ recentTests }: RecentTestsSectionProps) {
  return (
    <div style={styles.section}>
      <SectionTitle icon={<Calendar size={20} />} title="מבחנים אחרונים" />
      <div style={styles.testsList}>
        {recentTests.map((test) => (
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
                  {test.grade > test.classAvg ? '+' : ''}
                  {test.grade - test.classAvg}
                </span>
                <span style={styles.comparisonLabel}>vs. ממוצע</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
