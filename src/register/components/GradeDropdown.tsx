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
    return grade.length > 0 ? `כיתות: ${grade.join(', ')}` : 'בחר כיתות';
  }
  return grade ? `כיתה ${grade}` : 'בחר כיתה';
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
    <div className="relative group w-full">
      {/* הכפתור הראשי - רקע לבן וטקסט שחור */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 px-4 !bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all flex items-center justify-between shadow-sm"
      >
        <ChevronDown 
          size={20} 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
        
        <span className={`flex-1 text-right px-3 ${hasGrade ? '!text-black font-semibold' : '!text-gray-400'}`}>
          {getGradeDisplay(grade)}
        </span>
        
        <Hash size={20} className="text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
      </button>

      {/* תפריט הכיתות שנפתח */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 !bg-white border border-gray-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto">
          {grades.length > 0 ? (
            grades.map((gradeOption, index) => {
              const isSelected = Array.isArray(grade) ? grade.includes(gradeOption) : grade === gradeOption;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => onSelectGrade(gradeOption)}
                  className={`w-full px-6 py-4 text-right !bg-white hover:!bg-cyan-50 transition-colors border-b border-gray-50 last:border-0 first:rounded-t-2xl last:rounded-b-2xl flex items-center justify-between group/item`}
                >
                  {/* צ'קבוקס למורים בצד שמאל */}
                  {userType === 'teacher' && (
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  )}

                  {/* טקסט הכיתה בשחור */}
                  <span className={`text-right flex-1 ${isSelected ? '!text-cyan-700 font-bold' : '!text-black font-medium'}`}>
                    כיתה {gradeOption}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="px-6 py-4 text-center !bg-white !text-gray-400 text-sm">
              אין כיתות זמינות
            </div>
          )}
        </div>
      )}
    </div>
  );
}