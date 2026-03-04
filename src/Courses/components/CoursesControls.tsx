import { Search } from 'lucide-react';
import { CourseFilter } from './types';
import { styles } from './styles';

interface CoursesControlsProps {
  searchQuery: string;
  filterBy: CourseFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: CourseFilter) => void;
}

const filterOptions: Array<{ key: CourseFilter; label: string }> = [
  { key: 'all', label: 'הכל' },
  { key: 'active', label: 'פעילים' },
  { key: 'high-grade', label: 'ציונים גבוהים' },
];

export default function CoursesControls({
  searchQuery,
  filterBy,
  onSearchChange,
  onFilterChange,
}: CoursesControlsProps) {
  return (
    <div style={styles.controls}>
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="חפש קורס..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.filterButtons}>
        {filterOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => onFilterChange(option.key)}
            style={
              filterBy === option.key
                ? { ...styles.filterButton, ...styles.filterButtonActive }
                : styles.filterButton
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
