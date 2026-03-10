import axios from './axios';
const url = '/api/TestTaking';

export interface TestQuestion {
  questionId: number;
  text: string;
  level: number;
  answers: {
    id: number;
    text: string;
    isCorrect: boolean;
    description: string;
  }[];
}

export interface AnswerResult {
  isCorrect: boolean;
  correctAnswerId: string;
  explanation: string;
}

export interface TestResult {
  score: number;
  total: number;
  percentage: number;
  correctAnswers: number[];
  wrongAnswers: number[];
}

export const getQuestionsForChapter = async (chapterId: number): Promise<TestQuestion[]> => {
  const response = await axios.get(`${url}/chapter/${chapterId}`);
  return response.data;
};

export const submitAnswer = async (
  studentId: number,
  questionId: number,
  selectedAnswerId: string
): Promise<AnswerResult> => {
  const response = await axios.post(`${url}/submit-answer`, {
    studentId,
    questionId,
    selectedAnswerId
  });
  return response.data;
};

export const finishTest = async (
  studentId: number,
  chapterId: number,
  duration: number
): Promise<TestResult> => {
  const response = await axios.post(`${url}/finish`, {
    studentId,
    chapterId,
    duration
  });
  return response.data;
};

export const getStudentResults = async (studentId: number) => {
  const response = await axios.get(`${url}/results/${studentId}`);
  return response.data;
};
