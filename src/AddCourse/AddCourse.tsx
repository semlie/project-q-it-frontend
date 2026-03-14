import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Plus, ArrowRight, BookOpen } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { addCourse } from '../services/course.service';
import axios from '../services/axios';
import { Paths } from '../routes/paths';

interface ClassOption {
  classId: number;
  className: string;
  schoolId: number;
}

const AddCourse: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
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
        console.error('Error loading classes:', err);
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
      const selectedClass = classes.find(c => c.classId === selectedClassId);
      await addCourse({
        CourseName: courseName,
        SchoolId: selectedClass?.schoolId || 0
      });
      
      alert('הקורס נוסף בהצלחה!');
      navigate(`/${Paths.dashboard}`);
    } catch (err: any) {
      console.error('Error adding course:', err);
      setError(err.response?.data || 'שגיאה בהוספת הקורס');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container} dir="rtl">
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <BookOpen size={32} />
          </div>
          <h1 style={styles.title}>הוספת קורס חדש</h1>
          <p style={styles.subtitle}>צור קורס חדש עבור הכיתות שלך</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>שם הקורס</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="לדוגמה: מתמטיקה, אנגלית, פיזיקה..."
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>כיתה</label>
            <select
              value={selectedClassId || ''}
              onChange={(e) => setSelectedClassId(Number(e.target.value))}
              style={styles.select}
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
              <p style={styles.hint}>אין לך כיתות משויכות. פנה למנהל המערכת.</p>
            )}
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => navigate(`/${Paths.dashboard}`)}
              style={styles.cancelButton}
              disabled={loading}
            >
              ביטול
            </button>
            <button
              type="submit"
              style={styles.submitButton}
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

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f8fafc',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  iconContainer: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#ecfeff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    color: '#0891b2',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    backgroundColor: 'white',
    outline: 'none',
  },
  hint: {
    fontSize: '12px',
    color: '#f59e0b',
    marginTop: '4px',
  },
  error: {
    padding: '12px',
    backgroundColor: '#fef2f2',
    borderRadius: '8px',
    color: '#dc2626',
    fontSize: '14px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '12px',
  },
  cancelButton: {
    flex: 1,
    padding: '12px 24px',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    backgroundColor: 'white',
    color: '#64748b',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default AddCourse;
