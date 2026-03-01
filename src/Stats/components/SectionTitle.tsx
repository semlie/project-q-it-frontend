import { ReactNode } from 'react';
import { styles } from './styles';

interface SectionTitleProps {
  icon?: ReactNode;
  title: string;
}

export default function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <h2 style={styles.sectionTitle}>
      {icon}
      {title}
    </h2>
  );
}
