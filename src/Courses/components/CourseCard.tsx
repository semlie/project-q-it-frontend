import { BarChart3, BookOpen, Calendar, Clock, Users } from 'lucide-react';
import { Course } from './types';
import { styles } from './styles';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div style={styles.courseCard}>
      <div style={{ ...styles.courseHeader, backgroundColor: course.color }}>
        <div style={styles.courseIcon}>{course.icon}</div>
        <div style={styles.courseHeaderInfo}>
          <h3 style={styles.courseName}>{course.name}</h3>
          <p style={styles.courseTeacher}>{course.teacher}</p>
        </div>
        <div style={styles.gradeBadge}>
          <div style={styles.gradeBadgeValue}>{course.averageGrade}</div>
          <div style={styles.gradeBadgeLabel}>ממוצע</div>
        </div>
      </div>

      <div style={styles.courseContent}>
        <p style={styles.courseDescription}>{course.description}</p>

        <div style={styles.progressSection}>
          <div style={styles.progressHeader}>
            <span style={styles.progressLabel}>התקדמות</span>
            <span style={styles.progressValue}>
              {course.completedChapters}/{course.chapters} פרקים
            </span>
          </div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${course.progress}%`,
                backgroundColor: course.color,
              }}
            />
          </div>
        </div>

        <div style={styles.courseStats}>
          <div style={styles.courseStat}>
            <BookOpen size={16} style={{ color: '#6b7280' }} />
            <span>{course.materials} חומרים</span>
          </div>
          <div style={styles.courseStat}>
            <BarChart3 size={16} style={{ color: '#6b7280' }} />
            <span>{course.tests} מבחנים</span>
          </div>
          <div style={styles.courseStat}>
            <Users size={16} style={{ color: '#6b7280' }} />
            <span>{course.students} תלמידים</span>
          </div>
        </div>

        {course.upcomingTest && (
          <div style={styles.upcomingTest}>
            <Calendar size={16} style={{ color: '#f59e0b' }} />
            <span>{course.upcomingTest}</span>
          </div>
        )}

        <div style={styles.nextClass}>
          <Clock size={16} style={{ color: course.color }} />
          <span>שיעור הבא: {course.nextClass}</span>
        </div>
      </div>

      <div style={styles.courseFooter}>
        <button
          style={{ ...styles.enterButton, backgroundColor: course.color }}
          onClick={() => console.log('Enter course', course.id)}
        >
          כניסה לקורס
        </button>
      </div>
    </div>
  );
}
