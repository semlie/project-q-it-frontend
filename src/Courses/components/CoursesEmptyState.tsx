import { BookOpen } from 'lucide-react';
import { styles } from './styles';

interface CoursesEmptyStateProps {
  title: string;
  text: string;
  isLoading?: boolean;
}

export default function CoursesEmptyState({ title, text, isLoading = false }: CoursesEmptyStateProps) {
  return (
    <div style={styles.emptyState}>
      {isLoading ? (
        <div style={styles.loadingSpinner}></div>
      ) : (
        <BookOpen size={48} style={styles.emptyIcon} />
      )}
      <h3 style={styles.emptyTitle}>{title}</h3>
      <p style={styles.emptyText}>{text}</p>
    </div>
  );
}
