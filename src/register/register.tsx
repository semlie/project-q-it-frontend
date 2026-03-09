import React, { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Zap } from 'lucide-react';
import './register.css';
import { useNavigate } from 'react-router';
import { register as registerService } from '../services/auth.service.ts';
import { Paths } from '../routes/paths';
import AuthVisualPanel from '../components/auth/AuthVisualPanel';
import GoogleAuthButton from '../components/auth/GoogleAuthButton';
import AuthMobileBrand from '../components/auth/AuthMobileBrand';
import AuthSubmitButton from '../components/auth/AuthSubmitButton';
import AuthProviderDivider from '../components/auth/AuthProviderDivider';
import AuthSwitchPrompt from '../components/auth/AuthSwitchPrompt';
import UserTypeSelector from './components/UserTypeSelector';
import ProfileImageUpload from './components/ProfileImageUpload';
import SchoolDropdown from './components/SchoolDropdown';
import GradeDropdown from './components/GradeDropdown';
import { RegisterFormData, UserType } from './components/types';
import { getSchools, getClassesBySchoolId } from '../services/schools.service.ts';

const logoImage = new URL('../assets/images/logo-q-it.png', import.meta.url).href;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<UserType>('student');
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  
  // schools הוא עכשיו מערך של אובייקטים: { id: number, nameSchool: string }
  const [schools, setSchools] = useState<any[]>([]);
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    UserName: '',
    UserEmail: '',
    UserPassword: '',
    confirmPassword: '',
    SchoolId: 0, // חזר להיות מספר
    grade: '' as string | string[]
  });

  // שליפת בתי הספר (אובייקטים)
 // בתוך RegisterPage.tsx

useEffect(() => {
  const fetchSchools = async () => {
    try {
      const schoolsData = await getSchools();
      // וודא ש-schoolsData הוא אכן מערך של אובייקטים [{schoolId, nameSchool}, ...]
      setSchools(schoolsData); 
    } catch (error) {
      console.error("Failed to fetch schools:", error);
    }
  };
  fetchSchools();
}, []);
 // שליפת כיתות לפי ה-ID של בית הספר
useEffect(() => {
  const fetchClasses = async () => {
    // בדיקה שבאמת נבחר ID תקין (גדול מ-0)
    if (!formData.SchoolId || formData.SchoolId === 0) {
      setAvailableClasses([]);
      return;
    }
    setIsLoadingClasses(true);
    try {
      const rawClassesData = await getClassesBySchoolId(Number(formData.SchoolId));
      console.log("Classes from server:", rawClassesData); // לבדיקה בקונסול
      // כאן התיקון הקריטי: 
      // השרת מחזיר className, לכן נחלץ אותו. 
      // הוספתי הגנה למקרה שהשדה מגיע בשם אחר.
      const formattedClasses = rawClassesData.map((item: any) => {
        if (typeof item === 'object') {
          return item.className || item.nameClass || "כיתה ללא שם";
        }
        return item;
      });
      setAvailableClasses(formattedClasses || []);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      setAvailableClasses([]);
    } finally {
      setIsLoadingClasses(false);
    }
  };
  fetchClasses();
}, [formData.SchoolId]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.UserPassword !== formData.confirmPassword) {
        alert("הסיסמאות אינן תואמות");
        return;
    }

    let user = { ...formData, userType };
    
    try {
      if (userType === 'student' && Array.isArray(user.grade)) {
        user.grade = user.grade[0]; 
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append('UserName', user.UserName);
      formDataToSend.append('UserEmail', user.UserEmail);
      formDataToSend.append('UserPassword', user.UserPassword);
      formDataToSend.append('Role', user.userType);
      formDataToSend.append('SchoolId', user.SchoolId.toString());
      
      const gradeValue = Array.isArray(user.grade) ? user.grade.join(',') : user.grade;
      formDataToSend.append('Grade', gradeValue);
      
      if (profileImage) {
        formDataToSend.append('FileImage', profileImage);
      }
      
      await registerService(formDataToSend);
      alert('🎉 ההרשמה הושלמה בהצלחה!');
      navigate(`/${Paths.login}`);
    } catch (error) {
      console.error("Error registering user:", error);
      alert('❌ שגיאה בהרשמה.');
    }
  };

  const handleInputChange = <K extends keyof RegisterFormData>(field: K, value: RegisterFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result as string);
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
        const currentGrades = Array.isArray(prev.grade) ? prev.grade : [];
        const isSelected = currentGrades.includes(grade);
        const newGrades = isSelected ? currentGrades.filter(g => g !== grade) : [...currentGrades, grade];
        return { ...prev, grade: newGrades };
      });
    } else {
      handleInputChange('grade', grade);
      setShowGradeDropdown(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-['Assistant',_sans-serif]" dir="rtl">
      <AuthVisualPanel
        logo={
          <div className="w-32 h-32 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center p-4 transform hover:rotate-3 transition-transform duration-500">
            <img src={logoImage} alt="Q-it Logo" />
          </div>
        }
        title="Q-it"
        subtitle="מתרגלים. נהנים. מצליחים."
        content={
          <>
            <h3 className="text-4xl font-extrabold text-white leading-tight">
              הצטרפו למהפכת <br />
              <span className="text-cyan-300">החינוך הדיגיטלי</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['חדשני', 'חווייתי', 'מותאם אישית'].map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-medium backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </>
        }
      />

      <div className="flex-1 flex flex-col p-6 md:p-12 lg:p-20 justify-center items-center bg-gray-50/50">
        <div className="w-full max-w-md space-y-10">
          
          <AuthMobileBrand
            iconContainerClassName="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center"
            icon={<Zap size={32} className="text-white fill-white" />}
          />

          <div className="space-y-2 text-center md:text-right">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">!הצטרפו אלינו</h2>
            <p className="text-gray-500 text-lg">צרו חשבון חדש והתחילו את המסע הלימודי שלכם</p>
          </div>

          <UserTypeSelector userType={userType} onChange={setUserType} />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
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

              <ProfileImageUpload
                profileImage={profileImage}
                profileImagePreview={profileImagePreview}
                onImageChange={handleImageChange}
                onRemove={removeProfileImage}
              />

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
              
              <SchoolDropdown
                schools={schools}
                schoolId={formData.SchoolId}
                isOpen={showSchoolDropdown}
                onToggle={() => setShowSchoolDropdown(!showSchoolDropdown)}
                onSelectSchool={(id) => {
                  handleInputChange('SchoolId', id);
                  setShowSchoolDropdown(false);
                }}
              />

              <div className={!formData.SchoolId ? "opacity-50 pointer-events-none" : ""}>
                <GradeDropdown
                  grades={availableClasses}
                  grade={formData.grade}
                  userType={userType}
                  isOpen={showGradeDropdown}
                  onToggle={() => {
                    if (formData.SchoolId && formData.SchoolId !== 0) {
                      setShowGradeDropdown(!showGradeDropdown);
                    } else {
                      alert("אנא בחר בית ספר תחילה");
                    }
                  }}
                  onSelectGrade={handleGradeToggle}
                />
                {isLoadingClasses && <p className="text-xs text-cyan-600 mt-1 mr-2 animate-pulse">טוען כיתות...</p>}
              </div>

              {/* שאר שדות הסיסמה נשארים ללא שינוי */}
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

            <AuthSubmitButton label={userType === 'student' ? 'הרשמה כתלמיד' : 'הרשמה כמורה'} />
            <AuthProviderDivider text="או הרשמו באמצעות" />
            <GoogleAuthButton />
            <AuthSwitchPrompt
              prefix="כבר יש לך חשבון?"
              actionText="כניסה למערכת"
              onAction={() => navigate(`/${Paths.login}`)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}