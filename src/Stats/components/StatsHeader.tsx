import { styles } from './styles';

interface StatsHeaderProps {
  title?: string;
}

export default function StatsHeader({ title}: StatsHeaderProps) {
  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>{title || 'הסטטיסטיקות שלי'}</h1>
        <p style={styles.subtitle}>מעקב אחר ההתקדמות וההישגים שלך</p>
      </div>
    </div>
  );
}
