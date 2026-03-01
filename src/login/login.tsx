import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router';
import { login as loginService } from '../services/auth.service';
import { Paths } from '../routes/paths';
import { useAuth } from '../context/AuthContext';
import AuthVisualPanel from '../components/auth/AuthVisualPanel';
import AuthMobileBrand from '../components/auth/AuthMobileBrand';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import LoginVisualFooterStats from './components/LoginVisualFooterStats';
import LoginFormFields from './components/LoginFormFields';
import LoginFormFooter from './components/LoginFormFooter';

type LoginPageProps = {
  onSwitch?: () => void;
};

export const LoginPage = ({ onSwitch }: LoginPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt', formData);
    try {
      const response = await loginService(formData);
      console.log('Server response:', response);
      
      // Check if response is a string (token directly) or an object
      let token: string;
      let user: any;
      
      if (typeof response === 'string') {
        // Token returned directly as string
        token = response;
        console.log('Token received directly:', token);
      } else {
        // Token in object
        token = response.token || response.Token;
        user = response.user || response;
      }
      
      if (!token) {
        console.error('No token in response:', response);
        alert('❌ שגיאה: לא התקבל טוקן מהשרת');
        return;
      }
      
      // If we don't have user data, fetch it using the token
      if (!user || typeof response === 'string') {
        console.log('Fetching user data with token...');
        const { loginByToken } = await import('../services/auth.service');
        user = await loginByToken(token);
        console.log('User data fetched:', user);
      }
      
      login(user, token);
      alert('🎉 התחברת בהצלחה!');
      navigate(`/${Paths.dashboard}`);
    } catch (error) {
      console.error('Login failed:', error);
      alert('❌ שגיאה בהתחברות. אנא בדוק את פרטי ההתחברות.');
    }
  };

  const handleInputChange = (field: 'userEmail' | 'userPassword', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-['Assistant',_sans-serif]" dir="rtl">
      <AuthVisualPanel
        logo={
          <div className="w-32 h-32 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center p-4 transform hover:rotate-3 transition-transform duration-500">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-pulse" />
              <BookOpen size={64} className="text-cyan-600 fill-cyan-50" />
            </div>
          </div>
        }
        title="Q-it"
        subtitle="מתרגלים. נהנים. מצליחים."
        content={
          <>
            <h3 className="text-4xl font-extrabold text-white leading-tight">
              הופכים חומר <br />
              <span className="text-cyan-300">לתרגול חכם</span>
            </h3>
            <p className="text-white/70 text-lg max-w-sm mx-auto">
              כבר יצרנו מעל 10,000 שאלות עבור מאות מורים ותלמידים. הצטרפו למהפכת הלמידה.
            </p>
          </>
        }
        footer={<LoginVisualFooterStats />}
      />

      {/* Form Side */}
      <div className="flex-1 flex flex-col p-6 md:p-12 lg:p-20 justify-center items-center bg-gray-50/50">
        <div className="w-full max-w-md space-y-10">
          
          <AuthMobileBrand
            iconContainerClassName="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100"
            icon={<BookOpen size={32} className="text-cyan-600" />}
          />

          <div className="space-y-2 text-center md:text-right">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">כיף לראות אותך שוב!</h2>
            <p className="text-gray-500 text-lg">התחבר כדי להמשיך לתרגל</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <LoginFormFields
              showPassword={showPassword}
              userEmail={formData.userEmail}
              userPassword={formData.userPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onChangeEmail={(value) => handleInputChange('userEmail', value)}
              onChangePassword={(value) => handleInputChange('userPassword', value)}
            />

            <AuthSubmitButton label="התחבר" />

            <LoginFormFooter onSwitch={onSwitch} onNavigateRegister={navigate} />
          </form>
        </div>
      </div>
    </div>
  );
}
