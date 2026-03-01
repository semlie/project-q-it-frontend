
import { useAuth } from '../context/AuthContext';
import QaitTeacherDashboard from '../Dashboard/teacherDashboard';
import './dashboard.css';
import QaitStudentDashboard from './studentDashboard';
export default function QaitDashboard() {
  const { user } = useAuth();
  if (user?.role === 'teacher') {
    return <QaitTeacherDashboard />;
  }
  return <QaitStudentDashboard />;
}
