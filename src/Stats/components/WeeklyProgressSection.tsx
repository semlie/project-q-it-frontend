import { BarChart3 } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { styles } from './styles';
import { WeeklyProgressItem } from './types';

interface WeeklyProgressSectionProps {
  weeklyProgress: WeeklyProgressItem[];
}

export default function WeeklyProgressSection({ weeklyProgress }: WeeklyProgressSectionProps) {
  return (
    <div style={styles.section}>
      <SectionTitle icon={<BarChart3 size={20} />} title="התקדמות שבועית" />
      <div style={styles.chartContainer}>
        <div style={styles.chartBars}>
          {weeklyProgress.map((item) => (
            <div key={item.week} style={styles.barWrapper}>
              <div style={{ ...styles.bar, height: `${item.score}%` }}>
                <span style={styles.barValue}>{item.score}</span>
              </div>
              <div style={styles.barLabel}>{item.week}</div>
              <div style={styles.barTests}>{item.tests} מבחנים</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
