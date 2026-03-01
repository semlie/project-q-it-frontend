import { ChevronDown, School } from 'lucide-react';
import { SchoolOption } from './types';

interface SchoolDropdownProps {
  schools: SchoolOption[];
  schoolId: number;
  isOpen: boolean;
  onToggle: () => void;
  onSelectSchool: (schoolId: number) => void;
}

export default function SchoolDropdown({
  schools,
  schoolId,
  isOpen,
  onToggle,
  onSelectSchool,
}: SchoolDropdownProps) {
  return (
    <div className="relative group">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 px-4 !bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 flex items-center justify-between"
      >
        <ChevronDown size={20} className="text-gray-400" />
        <span className={schoolId ? 'text-gray-900' : 'text-gray-400'}>
          {schools.find((school) => school.id === schoolId)?.name || 'בית ספר'}
        </span>
        <School size={20} className="text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
          {schools.map((school) => (
            <button
              key={school.id}
              type="button"
              onClick={() => onSelectSchool(school.id)}
              className="w-full px-4 py-3 text-right hover:bg-cyan-50 transition-colors text-gray-900 first:rounded-t-2xl last:rounded-b-2xl"
            >
              {school.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
