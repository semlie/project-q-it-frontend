export type Difficulty = 'קל' | 'בינוני' | 'קשה';

export interface QuizAnswer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  text: string;
  difficulty: Difficulty;
  answers: QuizAnswer[];
}
