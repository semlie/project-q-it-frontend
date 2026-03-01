import { styles } from './styles';

interface StatsHeaderProps {
  timeRange: string;
  onChangeTimeRange: (value: string) => void;
}

export default function StatsHeader({ timeRange, onChangeTimeRange }: StatsHeaderProps) {
  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>הסטטיסטיקות שלי</h1>
        <p style={styles.subtitle}>מעקב אחר ההתקדמות וההישגים שלך</p>
      </div>
      <select value={timeRange} onChange={(e) => onChangeTimeRange(e.target.value)} style={styles.select}>
        <option value="week">שבוע אחרון</option>
        <option value="month">חודש אחרון</option>
        <option value="semester">סמסטר</option>
        <option value="year">שנה</option>
      </select>
    </div>
  );
}
