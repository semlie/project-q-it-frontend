import { ChevronDown, Hash } from 'lucide-react';
import { GradeValue, UserType } from './types';

interface GradeDropdownProps {
  grades: string[];
  grade: GradeValue;
  userType: UserType;
  isOpen: boolean;
  onToggle: () => void;
  onSelectGrade: (grade: string) => void;
}

function getGradeDisplay(grade: GradeValue) {
  if (Array.isArray(grade)) {
    return grade.length > 0 ? `כיתות: ${grade.join(', ')}` : 'כיתה';
  }
  return grade ? `כיתה ${grade}` : 'כיתה';
}

export default function GradeDropdown({
  grades,
  grade,
  userType,
  isOpen,
  onToggle,
  onSelectGrade,
}: GradeDropdownProps) {
  const hasGrade = Array.isArray(grade) ? grade.length > 0 : !!grade;

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 px-4 !bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 flex items-center justify-between"
      >
        <ChevronDown size={20} className="text-gray-400" />
        <span className={hasGrade ? 'text-gray-900' : 'text-gray-400'}>{getGradeDisplay(grade)}</span>
        <Hash size={20} className="text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
          {grades.map((gradeOption, index) => {
            const isSelected = Array.isArray(grade) ? grade.includes(gradeOption) : grade === gradeOption;

            return (
              <button
                key={index}
                type="button"
                onClick={() => onSelectGrade(gradeOption)}
                className={`w-full px-4 py-3 text-right hover:bg-cyan-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl flex items-center justify-between ${
                  isSelected ? 'bg-cyan-50' : ''
                }`}
              >
                <span className="text-gray-900">כיתה {gradeOption}</span>
                {userType === 'teacher' && (
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
