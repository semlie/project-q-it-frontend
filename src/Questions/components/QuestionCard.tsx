import { styles } from './styles';
import { Difficulty } from './types';

interface QuestionCardProps {
  currentQuestion: number;
  text: string;
  difficulty: Difficulty;
}

function getDifficultyStyle(difficulty: Difficulty) {
  switch (difficulty) {
    case 'קל':
      return { ...styles.difficultyBadge, ...styles.difficultyEasy };
    case 'בינוני':
      return { ...styles.difficultyBadge, ...styles.difficultyMedium };
    case 'קשה':
      return { ...styles.difficultyBadge, ...styles.difficultyHard };
    default:
      return styles.difficultyBadge;
  }
}

export default function QuestionCard({ currentQuestion, text, difficulty }: QuestionCardProps) {
  return (
    <div style={styles.questionCard}>
      <div style={styles.questionHeader}>
        <div style={styles.questionNumber}>שאלה {currentQuestion}</div>
        <div style={getDifficultyStyle(difficulty)}>{difficulty}</div>
      </div>
      <h2 style={styles.questionText}>{text}</h2>
    </div>
  );
}
