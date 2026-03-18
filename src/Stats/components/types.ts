import { ReactNode } from 'react';

export type Trend = 'up' | 'down' | 'stable';

export interface OverallStat {
  label: string;
  value: string;
  total?: string;
  change: string;
  trend?: Trend;
  icon: ReactNode;
  color: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
  rarity: string;
}
