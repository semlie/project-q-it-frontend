import { CheckCircle, Circle } from 'lucide-react';
import { styles } from './styles';
import { QuizAnswer } from './types';

interface AnswersListProps {
  answers: QuizAnswer[];
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswerClick: (answerId: number) => void;
}

function getAnswerStyle(answer: QuizAnswer, selectedAnswer: number | null, isAnswered: boolean) {
  if (!isAnswered) {
    return selectedAnswer === answer.id ? styles.answerSelected : styles.answer;
  }

  if (answer.isCorrect) {
    return { ...styles.answer, ...styles.answerCorrect };
  }

  if (selectedAnswer === answer.id && !answer.isCorrect) {
    return { ...styles.answer, ...styles.answerWrong };
  }

  return styles.answer;
}

export default function AnswersList({ answers, selectedAnswer, isAnswered, onAnswerClick }: AnswersListProps) {
  return (
    <div style={styles.answersContainer}>
      {answers.map((answer) => (
        <button
          key={answer.id}
          onClick={() => onAnswerClick(answer.id)}
          style={getAnswerStyle(answer, selectedAnswer, isAnswered)}
          disabled={isAnswered}
        >
          <div style={styles.answerContent}>
            <div style={styles.answerIcon}>
              {isAnswered && answer.isCorrect ? (
                <CheckCircle size={24} />
              ) : selectedAnswer === answer.id ? (
                <CheckCircle size={24} />
              ) : (
                <Circle size={24} />
              )}
            </div>
            <span style={styles.answerText}>{answer.text}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
