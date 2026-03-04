import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

interface LoginFormFieldsProps {
  showPassword: boolean;
  userEmail: string;
  userPassword: string;
  onTogglePassword: () => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
}

export default function LoginFormFields({
  showPassword,
  userEmail,
  userPassword,
  onTogglePassword,
  onChangeEmail,
  onChangePassword,
}: LoginFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-500 transition-colors">
          <Mail size={20} />
        </div>
        <input
          type="email"
          placeholder="כתובת אימייל"
          required
          value={userEmail}
          onChange={(e) => onChangeEmail(e.target.value)}
          className="w-full pr-12 pl-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 placeholder:text-gray-400 shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <div className="relative group">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-500 transition-colors">
            <Lock size={20} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="סיסמה"
            required
            value={userPassword}
            onChange={(e) => onChangePassword(e.target.value)}
            className="w-full pr-12 pl-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 placeholder:text-gray-400 shadow-sm"
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="text-left">
          <button type="button" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">
            שכחת סיסמה?
          </button>
        </div>
      </div>
    </div>
  );
}
