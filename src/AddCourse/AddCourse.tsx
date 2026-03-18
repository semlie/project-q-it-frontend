import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Plus, BookOpen } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { addCourse } from '../services/course.service';
import axios from '../services/axios';
import { Paths } from '../routes/paths';

import styles from './AddCourse.css';

interface ClassOption {
  classId: number;
  className: string;
  schoolId: number;
}

const AddCourse: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const [courseName, setCourseName] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadClasses = async () => {
      if (!user?.userId) return;
      
      try {
        const response = await axios.get(`/api/TeacherClass/byTeacher/${user.userId}`);
        const teacherClasses = response.data;
        
        if (Array.isArray(teacherClasses) && teacherClasses.length > 0) {
          const classPromises = teacherClasses.map((tc: any) => 
            axios.get(`/api/Class/${tc.classId}`).then(res => res.data)
          );
          const classDetails = await Promise.all(classPromises);
          
          const classOptions: ClassOption[] = classDetails.map((cls: any) => ({
            classId: cls.classId,
            className: cls.className || `Class ${cls.classId}`,
            schoolId: cls.schoolId
          }));
          
          setClasses(classOptions);
        }
      } catch (err: any) {
        setError('שגיאה בטעינת הכיתות');
      }
    };
    
    loadClasses();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseName.trim()) {
      setError('יש להזין שם קורס');
      return;
    }
    
    if (!selectedClassId) {
      setError('יש לבחור כיתה');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addCourse({
        CourseName: courseName,
        ClassId: selectedClassId
      });
      
      alert('הקורס נוסף בהצלחה!');
      navigate(`/${Paths.dashboard}`);
    } catch (err: any) {
      setError(err.response?.data || 'שגיאה בהוספת הקורס');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container} dir="rtl">
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <BookOpen size={32} />
          </div>
          <h1 className={styles.title}>הוספת קורס חדש</h1>
          <p className={styles.subtitle}>צור קורס חדש עבור הכיתות שלך</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>שם הקורס</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="לדוגמה: מתמטיקה, אנגלית, פיזיקה..."
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>כיתה</label>
            <select
              value={selectedClassId || ''}
              onChange={(e) => setSelectedClassId(Number(e.target.value))}
              className={styles.select}
              disabled={loading}
            >
              <option value="">בחר כיתה</option>
              {classes.map((cls) => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.className}
                </option>
              ))}
            </select>
            {classes.length === 0 && (
              <p className={styles.hint}>אין לך כיתות משויכות. פנה למנהל המערכת.</p>
            )}
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => navigate(`/${Paths.dashboard}`)}
              className={styles.cancelButton}
              disabled={loading}
            >
              ביטול
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading || !courseName.trim() || !selectedClassId}
            >
              {loading ? 'שומר...' : 'שמור קורס'}
              {!loading && <Plus size={18} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
