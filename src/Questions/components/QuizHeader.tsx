import { styles } from './styles';

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuizHeader({ currentQuestion, totalQuestions }: QuizHeaderProps) {
  return (
    <>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img src="../assets/images/logo_q-it-rb.png" alt="Q-it Logo" style={styles.logo} />

          <div style={styles.headerInfo}>
            <div style={styles.progressInfo}>
              <span style={styles.progressText}>
                שאלה {currentQuestion} מתוך {totalQuestions}
              </span>
            </div>
          </div>

          <button style={styles.exitButton}>יציאה מהמבחן</button>
        </div>
      </header>

      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.progressBar, width: `${(currentQuestion / totalQuestions) * 100}%` }} />
      </div>
    </>
  );
}
