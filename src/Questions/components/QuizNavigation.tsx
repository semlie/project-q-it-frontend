import { ArrowLeft, ArrowRight } from 'lucide-react';
import { styles } from './styles';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  isAnswered: boolean;
  hasSelectedAnswer: boolean;
  onPrevious: () => void;
  onSubmit: () => void;
  onNext: () => void;
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  isAnswered,
  hasSelectedAnswer,
  onPrevious,
  onSubmit,
  onNext,
}: QuizNavigationProps) {
  return (
    <div style={styles.navigationContainer}>
      <button onClick={onPrevious} style={styles.prevButton} disabled={currentQuestion === 1}>
        <ArrowRight size={20} />
        שאלה קודמת
      </button>

      {!isAnswered ? (
        <button
          onClick={onSubmit}
          style={hasSelectedAnswer ? styles.submitButton : styles.submitButtonDisabled}
          disabled={!hasSelectedAnswer}
        >
          בדוק תשובה
        </button>
      ) : (
        <button onClick={onNext} style={styles.nextButton} disabled={currentQuestion === totalQuestions}>
          שאלה הבאה
          <ArrowLeft size={20} />
        </button>
      )}
    </div>
  );
}
