import { styles } from './styles';
import { QuizAnswer } from './types';

interface AnswerFeedbackProps {
  answers: QuizAnswer[];
  selectedAnswer: number | null;
}

export default function AnswerFeedback({ answers, selectedAnswer }: AnswerFeedbackProps) {
  const selected = answers.find((answer) => answer.id === selectedAnswer);
  const correct = answers.find((answer) => answer.isCorrect);
  const isCorrectAnswer = !!selected?.isCorrect;

  return (
    <div style={isCorrectAnswer ? styles.feedbackCorrect : styles.feedbackWrong}>
      {isCorrectAnswer ? (
        <div>
          <div style={styles.feedbackTitle}>✓ תשובה נכונה!</div>
          <p style={styles.feedbackText}>כל הכבוד! התשובה שלך נכונה.</p>
        </div>
      ) : (
        <div>
          <div style={styles.feedbackTitle}>✗ תשובה שגויה</div>
          <p style={styles.feedbackText}>התשובה הנכונה היא: {correct?.text}</p>
        </div>
      )}
    </div>
  );
}
