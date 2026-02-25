
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, BookOpen, ChevronLeft, Globe, ShieldCheck, Zap, School, Hash, ChevronDown, Camera, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import './register.css';
import logoImage from '../assets/images/icon.jpg';
import { useNavigate } from 'react-router';
import { register as  registerService} from '../services/auth.service.ts';
import { Paths } from '../routes/paths';
import { i } from 'motion/react-client';
export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    UserName: '',
    UserEmail: '',
    UserPassword: '',
    confirmPassword: '',
    SchoolId: 0,
    grade: '' as string | string[]
  });

  const schools = [
    { id: 1, name: 'תיכון אורט' },
    { id: 2, name: 'תיכון אלון' },
    { id: 3, name: 'בית ספר ריאלי' },
    { id: 4, name: 'אחר' }
  ];
  const grades = ['ז', 'ח', 'ט', 'י', 'יא', 'יב'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let user = { ...formData, userType };
    console.log(user);
     try {
      // if(user.UserPassword != user.confirmPassword) {
      //   alert("סיסמה ואימות סיסמה אינם תואמים");
      //   return;
      // }
      // if(!user.SchoolId) {
      //   alert("אנא בחר בית ספר");
      //   return;
      // }
      // if(!user.grade || (Array.isArray(user.grade) && user.grade.length === 0)) {
      //   alert("אנא בחר כיתה");
      //   return;
      // }
      // if(userType === 'teacher' && (!Array.isArray(user.grade) || user.grade.length === 0)) {
      //   alert("מורים חייבים לבחור לפחות כיתה אחת");
      //   return;
      // }
      // if(userType === 'student' && Array.isArray(user.grade)) {
      //   alert("תלמידים יכולים לבחור רק כיתה אחת");
      //   return;
      // }
      if(userType === 'student' && Array.isArray(user.grade)) {
        user.grade = user.grade[0]; // Convert to single string for students
      }
      
      // Prepare FormData to send file
      const formDataToSend = new FormData();
      formDataToSend.append('UserName', user.UserName);
      formDataToSend.append('UserEmail', user.UserEmail);
      formDataToSend.append('UserPassword', user.UserPassword);
      formDataToSend.append('Role', user.userType);
      formDataToSend.append('SchoolId', user.SchoolId.toString());
      
      // Add image file if exists (with field name 'FileImage' as server expects)
      if (profileImage) {
        formDataToSend.append('FileImage', profileImage);
      }
      
         const adduser = await registerService(formDataToSend);
         
         // Success message
         alert('🎉 ההרשמה הושלמה בהצלחה! מעביר אותך לדף ההתחברות...');
         
         // Navigate to login after short delay
         setTimeout(() => {
           navigate(`/${Paths.login}`);
         }, 1500);
     } catch (error) {
        console.error("Error registering user:", error);
        alert('❌ שגיאה בהרשמה. אנא נסה שנית.');
     }
};
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('תמונה חייבת להיות קטנה מ-5MB');
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview('');
  };

  const handleGradeToggle = (grade: string) => {
    if (userType === 'teacher') {
      setFormData(prev => {
        const currentGrades = Array.isArray(prev.grade) ? prev.grade : prev.grade ? [prev.grade] : [];
        const isSelected = currentGrades.includes(grade);
        const newGrades = isSelected
          ? currentGrades.filter(g => g !== grade)
          : [...currentGrades, grade];
        return { ...prev, grade: newGrades };
      });
    } else {
      handleInputChange('grade', grade);
      setShowGradeDropdown(false);
    }
  };

  const getGradeDisplay = () => {
    if (Array.isArray(formData.grade)) {
      return formData.grade.length > 0 
        ? `כיתות: ${formData.grade.join(', ')}` 
        : 'כיתה';
    }
    return formData.grade ? `כיתה ${formData.grade}` : 'כיתה';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-['Assistant',_sans-serif]" dir="rtl">
      {/* Left Side (Visual/Branding) */}
      <div className="hidden md:flex md:w-1/2 bg-[#083344] relative overflow-hidden items-center justify-center p-12">
        {/* Immersive Background */}
        <div className="absolute inset-0">
          {/* Layered Gradients matching Logo Teal/Blue */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#0e7490_0%,transparent_70%)] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,#0891b2_0%,transparent_50%)] opacity-20" />
          
          {/* Floating Colorful Bubbles (Matching Logo) */}
          {[
            { color: 'bg-emerald-400', size: 'w-4 h-4', delay: 0, x: '20%', y: '80%' },
            { color: 'bg-amber-400', size: 'w-3 h-3', delay: 2, x: '40%', y: '70%' },
            { color: 'bg-rose-400', size: 'w-5 h-5', delay: 1, x: '60%', y: '85%' },
            { color: 'bg-cyan-400', size: 'w-6 h-6', delay: 3, x: '80%', y: '75%' },
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

        <div className="relative z-10 w-full max-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-16 text-center"
          >
            {/* Logo Area */}
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                {/* Outer Glow Ring */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 border border-dashed border-cyan-400/20 rounded-full"
                />
                <div className="w-32 h-32 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center p-4 transform hover:rotate-3 transition-transform duration-500">
                  {/* Placeholder for the actual logo image */}
                 {/*<div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-pulse" />
                    <BookOpen size={64} className="text-cyan-600 fill-cyan-50" />
                  </div>*/}
                  <img src={logoImage} alt="Q-it Logo"/>
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
                הצטרפו למהפכת <br />
                <span className="text-cyan-300">החינוך הדיגיטלי</span>
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3">
                {["חדשני", "חווייתי", "מותאם אישית"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-medium backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="flex-1 flex flex-col p-6 md:p-12 lg:p-20 justify-center items-center bg-gray-50/50">
        <div className="w-full max-w-md space-y-10">
          
          {/* Header Mobile Only */}
          <div className="md:hidden flex flex-col items-center gap-4 mb-8">
             <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center">
                <Zap size={32} className="text-white fill-white" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Q-it</h1>
          </div>

          <div className="space-y-2 text-center md:text-right">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">!הצטרפו אלינו</h2>
            <p className="text-gray-500 text-lg">צרו חשבון חדש והתחילו את המסע הלימודי שלכם</p>
          </div>
          {/* User Type Selector */}
          <div className="flex p-1 bg-gray-200/50 rounded-2xl gap-1">
            <button 
              onClick={() => setUserType('student')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all duration-300 ${
                userType === 'student' 
                ? 'bg-white text-cyan-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen size={20} />
              <span>תלמיד</span>
            </button>
            <button 
              onClick={() => setUserType('teacher')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all duration-300 ${
                userType === 'teacher' 
                ? 'bg-white text-cyan-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <GraduationCap size={20} />
              <span>מורה</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              {/* Full Name */}
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-500 transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  placeholder="שם מלא"
                  required
                  value={formData.UserName}
                  onChange={(e) => handleInputChange('UserName', e.target.value)}
                  className="w-full pr-12 pl-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
              {/* Profile Image Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 text-right">
                  תמונת פרופיל (אופציונלי)
                </label>
                <div className="flex items-center gap-4">
                  {profileImagePreview ? (
                    <div className="relative">
                      <img 
                        src={profileImagePreview} 
                        alt="Profile preview" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeProfileImage}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <Camera size={32} className="text-gray-400" />
                    </div>
                  )}
                  <label className="flex-1 cursor-pointer">
                    <div className="w-full py-4 px-4 !bg-white border border-gray-200 rounded-2xl hover:border-cyan-500 transition-all text-gray-600 flex items-center justify-between group">
                      <Upload size={20} className="text-gray-400 group-hover:text-cyan-500 transition-colors" />
                      <span className="text-sm">
                        {profileImage ? profileImage.name : 'בחר תמונה'}
                      </span>
                      <Camera size={20} className="text-gray-400 group-hover:text-cyan-500 transition-colors" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

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
                  className="w-full pr-12 pl-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                />
              </div>
              
              {/* School ComboBox */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
                  className="w-full py-4 px-4 !bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 flex items-center justify-between"
                >
                  <ChevronDown size={20} className="text-gray-400" />
                  <span className={formData.SchoolId ? 'text-gray-900' : 'text-gray-400'}>
                    {schools.find(school => school.id === formData.SchoolId)?.name || 'בית ספר'}
                  </span>
                  <School size={20} className="text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                </button>
                {showSchoolDropdown && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
                    {schools.map((school, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          handleInputChange('SchoolId', school.id.toString());
                          setShowSchoolDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-right hover:bg-cyan-50 transition-colors text-gray-900 first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        {school.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Grade ComboBox */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setShowGradeDropdown(!showGradeDropdown)}
                  className="w-full py-4 px-4 !bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 flex items-center justify-between"
                >
                  <ChevronDown size={20} className="text-gray-400" />
                  <span className={(Array.isArray(formData.grade) ? formData.grade.length > 0 : formData.grade) ? 'text-gray-900' : 'text-gray-400'}>
                    {getGradeDisplay()}
                  </span>
                  <Hash size={20} className="text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                </button>
                {showGradeDropdown && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-auto">
                    {grades.map((grade, index) => {
                      const isSelected = Array.isArray(formData.grade) 
                        ? formData.grade.includes(grade) 
                        : formData.grade === grade;
                      
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleGradeToggle(grade)}
                          className={`w-full px-4 py-3 text-right hover:bg-cyan-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl flex items-center justify-between ${
                            isSelected ? 'bg-cyan-50' : ''
                          }`}
                        >
                          <span className="text-gray-900">כיתה {grade}</span>
                          {userType === 'teacher' && (
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-gray-300'
                            }`}>
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
              {/* Password */}
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
                  className="w-full pr-12 pl-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="אימות סיסמה"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pr-12 pl-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 px-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all"
            >
              {userType === 'student' ? 'הרשמה כתלמיד' : 'הרשמה כמורה'}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500 font-medium">או הרשמו באמצעות</span>
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
                כבר יש לך חשבון?{' '}
                <button type="button" className="text-cyan-600 font-bold hover:underline">
                  כניסה למערכת
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
