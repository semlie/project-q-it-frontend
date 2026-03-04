import { DashboardStatItem } from './types';

type StatsGridProps = {
  stats: DashboardStatItem[];
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
