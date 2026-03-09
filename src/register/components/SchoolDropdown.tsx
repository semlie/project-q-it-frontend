import { ChevronDown, School } from 'lucide-react';

interface SchoolDropdownProps {
  schools: any[]; // [{ schoolId: 1, nameSchool: '...' }]
  schoolId: number;
  isOpen: boolean;
  onToggle: () => void;
  onSelectSchool: (id: number) => void;
}

export default function SchoolDropdown({
  schools,
  schoolId,
  isOpen,
  onToggle,
  onSelectSchool,
}: SchoolDropdownProps) {
  
  // מציאת האובייקט כדי להציג את השם
  const selectedSchool = schools.find(s => s.schoolId === schoolId);

  return (
    <div className="relative group w-full">
      {/* כפתור ראשי */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 px-4 !bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all flex items-center justify-between shadow-sm"
      >
        <ChevronDown 
          size={20} 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
        
        <span className={`flex-1 text-right px-3 ${schoolId ? '!text-black font-semibold' : '!text-gray-400'}`}>
          {selectedSchool ? selectedSchool.nameSchool : 'בחר בית ספר'} 
        </span>
        
        <School size={20} className="text-gray-500" />
      </button>

      {/* רשימת האפשרויות */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 !bg-white border border-gray-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto">
          {schools.length > 0 ? (
            schools.map((school) => (
              <button
                key={school.schoolId}
                type="button"
                onClick={() => onSelectSchool(school.schoolId)}
                className="w-full px-6 py-4 text-right !bg-white hover:!bg-cyan-50 !text-black hover:!text-cyan-700 transition-colors border-b border-gray-50 last:border-0 first:rounded-t-2xl last:rounded-b-2xl font-medium block"
              >
                {school.nameSchool}
              </button>
            ))
          ) : (
            <div className="px-6 py-4 text-center !bg-white !text-gray-400 text-sm">
              לא נמצאו בתי ספר
            </div>
          )}
        </div>
      )}
    </div>
  );
}