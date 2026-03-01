export interface Course {
  id: number;
  name: string;
  teacher: string;
  description: string;
  color: string;
  icon: string;
  progress: number;
  chapters: number;
  completedChapters: number;
  nextClass: string;
  students: number;
  averageGrade: number;
  materials: number;
  tests: number;
  upcomingTest: string | null;
}

export type CourseFilter = 'all' | 'active' | 'completed' | 'high-grade';
