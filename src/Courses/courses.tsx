import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCoursesByIdUser } from '../services/course.service';
import CoursesStatsOverview from './components/CoursesStatsOverview';
import CoursesControls from './components/CoursesControls';
import CourseCard from './components/CourseCard';
import CoursesEmptyState from './components/CoursesEmptyState';
import { Course, CourseFilter } from './components/types';
import { styles } from './components/styles';

// Add keyframe animation for spinner
const spinnerStyles = document.createElement('style');
spinnerStyles.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
if (!document.querySelector('#spinner-styles')) {
  spinnerStyles.id = 'spinner-styles';
  document.head.appendChild(spinnerStyles);
}

export default function QaitCoursesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<CourseFilter>('all');
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Helper function to normalize course data from server
  const normalizeCourse = (course: any): Course => ({
    id: course.courseId || course.id || 0,
    name: course.courseName || course.name || 'ללא שם',
    teacher: course.teacherName || course.teacher || 'לא צוין',
    description: course.description || course.courseName || 'אין תיאור',
    color: course.color || '#14b8a6',
    icon: course.icon || '📚',
    progress: course.progress || 0,
    chapters: course.chapters || 0,
    completedChapters: course.completedChapters || 0,
    nextClass: course.nextClass || 'לא נקבע',
    students: course.students || 0,
    averageGrade: course.averageGrade || 0,
    materials: course.materials || 0,
    tests: course.tests || 0,
    upcomingTest: course.upcomingTest || null,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        if (user) {
          const data = await getCoursesByIdUser(user.userId);
          console.log('Fetched courses:', data);
          
          // Check if response is an error message
          if (typeof data === 'string' && data.includes('not found')) {
            setError(data);
            setCoursesData([]);
          } else if (Array.isArray(data)) {
            // Normalize array of courses
            const normalized = data.map(normalizeCourse);
            setCoursesData(normalized);
          } else if (data && typeof data === 'object') {
            const normalized = [normalizeCourse(data)];
            setCoursesData(normalized);
          } else {
            setCoursesData([]);
          }
        }
      } catch (error: any) {
        console.error('Error fetching courses:', error);
        setError(error?.message || 'שגיאה בטעינת הקורסים');
        setCoursesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.name?.includes(searchQuery) || 
                         course.teacher?.includes(searchQuery) ||
                         course.description?.includes(searchQuery);
    
    let matchesFilter = true;
    if (filterBy === 'active') matchesFilter = course.progress < 100;
    if (filterBy === 'completed') matchesFilter = course.progress === 100;
    if (filterBy === 'high-grade') matchesFilter = course.averageGrade >= 90;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={styles.container} dir="rtl">
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>הקורסים שלי</h1>
          <p style={styles.subtitle}>כל הקורסים שאתה רשום אליהם</p>
        </div>
      </div>

      {/* Stats Overview */}
      <CoursesStatsOverview filteredCourses={filteredCourses} />

      {/* Controls */}
      <CoursesControls
        searchQuery={searchQuery}
        filterBy={filterBy}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilterBy}
      />

      {/* Courses Grid */}
      {loading ? (
        <CoursesEmptyState
          title="טוען קורסים..."
          text="אנא המתן רגע"
          isLoading
        />
      ) : error || coursesData.length === 0 ? (
        <CoursesEmptyState
          title="לא נמצאו קורסים"
          text={
            error && error.includes('not found')
              ? 'אתה עדיין לא רשום לאף קורס. פנה למנהל כדי להירשם לקורסים.'
              : searchQuery || filterBy !== 'all'
                ? 'נסה לשנות את החיפוש או הסינון'
                : 'אין לך קורסים כרגע'
          }
        />
      ) : (
      <div style={styles.coursesGrid}>
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      )}

      {!loading && !error && filteredCourses.length === 0 && coursesData.length > 0 && (
        <CoursesEmptyState
          title="לא נמצאו קורסים תואמים"
          text="נסה לשנות את החיפוש או הסינון"
        />
      )}
    </div>
  );
}