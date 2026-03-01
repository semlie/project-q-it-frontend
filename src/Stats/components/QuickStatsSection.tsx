import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { styles } from './styles';

export default function QuickStatsSection() {
  return (
    <div style={styles.section}>
      <SectionTitle title="מידע מהיר" />
      <div style={styles.quickStats}>
        <div style={styles.quickStatItem}>
          <CheckCircle size={18} style={{ color: '#10b981' }} />
          <span style={styles.quickStatText}>18/20 נושאים נשלטו</span>
        </div>
        <div style={styles.quickStatItem}>
          <Clock size={18} style={{ color: '#06b6d4' }} />
          <span style={styles.quickStatText}>38 דקות ממוצע למבחן</span>
        </div>
        <div style={styles.quickStatItem}>
          <Target size={18} style={{ color: '#f59e0b' }} />
          <span style={styles.quickStatText}>92% שיעור הגשה בזמן</span>
        </div>
        <div style={styles.quickStatItem}>
          <TrendingUp size={18} style={{ color: '#8b5cf6' }} />
          <span style={styles.quickStatText}>שיפור של 5% בחודש</span>
        </div>
      </div>
    </div>
  );
}
