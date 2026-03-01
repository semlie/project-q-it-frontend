
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, BookOpen, Zap, Globe, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { login as loginService } from '../services/auth.service';
import { Paths } from '../routes/paths';
import { useAuth } from '../context/AuthContext';

export const LoginPage = ({ onSwitch }: { onSwitch: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    UserEmail: '',
    UserPassword: '',
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-['Assistant',_sans-serif]" dir="rtl">
      
      {/* Visual Side (Branding) */}
      <div className="hidden md:flex md:w-1/2 bg-[#083344] relative overflow-hidden items-center justify-center p-12">
        {/* Immersive Background */}
        <div className="absolute inset-0">
          {/* Layered Gradients matching Logo Teal/Blue */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0e7490_0%,transparent_70%)] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#0891b2_0%,transparent_50%)] opacity-20" />
          
          {/* Floating Colorful Bubbles (Matching Logo) */}
          {[
            { color: 'bg-emerald-400', size: 'w-4 h-4', delay: 0, x: '20%' },
            { color: 'bg-amber-400', size: 'w-3 h-3', delay: 2, x: '40%' },
            { color: 'bg-rose-400', size: 'w-5 h-5', delay: 1, x: '60%' },
            { color: 'bg-cyan-400', size: 'w-6 h-6', delay: 3, x: '80%' },
          ].map((bubble, i) => (
            <motion.div
              key={i}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ 
                y: '-100vh', 
                opacity: [0, 1, 1, 0],
                x: ['0%', (i % 2 === 0 ? '10%' : '-10%'), '0%']
              }}
              transition={{ 
                duration: 15 + i * 2, 
                repeat: Infinity, 
                delay: bubble.delay,
                ease: "linear" 
              }}
              style={{ left: bubble.x, bottom: '-20px' }}
              className={`absolute ${bubble.color} ${bubble.size} rounded-full blur-[2px] shadow-lg shadow-white/10`}
            />
          ))}

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-16 text-center"
          >
            {/* Logo Area */}
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 border border-dashed border-cyan-400/20 rounded-full"
                />
                <div className="w-32 h-32 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center p-4 transform hover:rotate-3 transition-transform duration-500">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-pulse" />
                    <BookOpen size={64} className="text-cyan-600 fill-cyan-50" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-7xl font-black text-white tracking-tighter drop-shadow-sm">Q-it</h2>
                <p className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-sm">מתרגלים. נהנים. מצליחים.</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <h3 className="text-4xl font-extrabold text-white leading-tight">
                הופכים חומר <br />
                <span className="text-cyan-300">לתרגול חכם</span>
              </h3>
              <p className="text-white/70 text-lg max-w-sm mx-auto">
                כבר יצרנו מעל 10,000 שאלות עבור מאות מורים ותלמידים. הצטרפו למהפכת הלמידה.
              </p>
            </div>

            {/* Footer Stats */}
            <div className="pt-12 border-t border-white/10 grid grid-cols-3 gap-4">
              {[
                { label: "שאלות", value: "10K+" },
                { label: "משתמשים", value: "2K+" },
                { label: "דירוג", value: "4.9" }
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-1">
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] text-cyan-400/70 font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col p-6 md:p-12 lg:p-20 justify-center items-center bg-gray-50/50">
        <div className="w-full max-w-md space-y-10">
          
          {/* Mobile Logo */}
          <div className="md:hidden flex flex-col items-center gap-4 mb-8">
             <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100">
                <BookOpen size={32} className="text-cyan-600" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Q-it</h1>
          </div>

          <div className="space-y-2 text-center md:text-right">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">כיף לראות אותך שוב!</h2>
            <p className="text-gray-500 text-lg">התחבר כדי להמשיך לתרגל</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-500 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  placeholder="כתובת אימייל"
                  required
                  value={formData.UserEmail}
                  onChange={(e) => handleInputChange('UserEmail', e.target.value)}
                  className="w-full pr-12 pl-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 placeholder:text-gray-400 shadow-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-500 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="סיסמה"
                    required
                  value={formData.UserPassword}
                  onChange={(e) => handleInputChange('UserPassword', e.target.value)}
                    className="w-full pr-12 pl-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 placeholder:text-gray-400 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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

            <button 
              type="submit"
              className="w-full py-4 px-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all"
            >
              התחבר
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500 font-medium">או התחברו באמצעות</span>
              </div>
            </div>

            <button 
              type="button" 
              className="w-full flex items-center justify-center gap-3 py-4 px-8 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </button>

            <div className="text-center pt-4">
              <p className="text-gray-500 font-medium">
                אין לך חשבון?{' '}
                <button 
                  type="button" 
                  onClick={onSwitch}
                  className="text-cyan-600 font-bold hover:underline"
                >
                  הרשם כאן
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
