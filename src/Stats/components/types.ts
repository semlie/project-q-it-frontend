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

export interface SubjectPerformanceItem {
  subject: string;
  average: number;
  lastGrade: number;
  trend: Trend;
  tests: number;
  classAverage: number;
  color: string;
  strength: string;
}

export interface WeeklyProgressItem {
  week: string;
  score: number;
  tests: number;
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

export interface RecentTest {
  id: number;
  subject: string;
  name: string;
  grade: number;
  date: string;
  classAvg: number;
}

export interface StudyHabits {
  bestTimeOfDay: string;
  avgSessionLength: string;
  preferredSubject: string;
  studyStreak: number;
  totalStudyTime: string;
}
