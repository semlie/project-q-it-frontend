import { BookOpen, GraduationCap } from 'lucide-react';
import { UserType } from './types';

interface UserTypeSelectorProps {
  userType: UserType;
  onChange: (value: UserType) => void;
}

export default function UserTypeSelector({ userType, onChange }: UserTypeSelectorProps) {
  return (
    <div className="flex p-1 bg-gray-200/50 rounded-2xl gap-1">
      <button
        onClick={() => onChange('student')}
        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all duration-300 ${
          userType === 'student' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <BookOpen size={20} />
        <span>תלמיד</span>
      </button>
      <button
        onClick={() => onChange('teacher')}
        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all duration-300 ${
          userType === 'teacher' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <GraduationCap size={20} />
        <span>מורה</span>
      </button>
    </div>
  );
}
