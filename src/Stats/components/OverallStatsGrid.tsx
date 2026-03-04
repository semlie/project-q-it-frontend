import { TrendingDown, TrendingUp } from 'lucide-react';
import { styles } from './styles';
import { OverallStat } from './types';

interface OverallStatsGridProps {
  stats: OverallStat[];
}

function getTrendIcon(trend?: string) {
  if (trend === 'up') return <TrendingUp size={16} style={{ color: '#10b981' }} />;
  if (trend === 'down') return <TrendingDown size={16} style={{ color: '#ef4444' }} />;
  return <span style={{ fontSize: '14px', color: '#6b7280' }}>—</span>;
}

export default function OverallStatsGrid({ stats }: OverallStatsGridProps) {
  return (
    <div style={styles.statsGrid}>
      {stats.map((stat) => (
        <div key={stat.label} style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: `${stat.color}20`, color: stat.color }}>
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
              <span style={{ color: stat.trend === 'up' ? '#10b981' : '#6b7280' }}>{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
