import { BarChart3, BookOpen, Calendar, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Paths } from '../../routes/paths';
import { Course } from './types';
import { styles } from './styles';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();
  return (
    <div style={styles.courseCard}>
      <div style={{ ...styles.courseHeader, backgroundColor: course.color }}>
        <div style={styles.courseIcon}>{course.icon}</div>
        <div style={styles.courseHeaderInfo}>
          <h3 style={styles.courseName}>{course.name}</h3>
          <p style={styles.courseTeacher}>{course.teacher}</p>
        </div>
      </div>
      <div style={styles.courseContent}>
       <p style={styles.courseDescription}>{course.description}</p>
        {course.upcomingTest && (
          <div style={styles.upcomingTest}>
            <Calendar size={16} style={{ color: '#f59e0b' }} />
            <span>{course.upcomingTest}</span>
          </div>
        )}
      </div>
      <div style={styles.courseFooter}>
        <button
          style={{ ...styles.enterButton, backgroundColor: course.color }}
          onClick={() =>
            navigate(`/${Paths.courseDetails.replace(':courseId', String(course.id))}`, {
              state: { course },
            })
          }> כניסה לקורס
        </button>
      </div>
    </div>
  );
}