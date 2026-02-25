import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './login.css';

export default function QaitLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt', { email, password });
  };

  return (
    <div className="login-container">
      {/* Header */}
     {/*  <header className="login-header">
        <div className="login-header-content">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'%3E%3Ctext x='10' y='50' font-size='24' fill='%2306b6d4' font-weight='bold'%3EQ-it%3C/text%3E%3Ctext x='10' y='70' font-size='12' fill='%2306b6d4'%3EUNI-HIT%3C/text%3E%3C/svg%3E"
            alt="Q-it Logo" 
            className="login-logo"
          />
          
          <div className="login-nav">
            <button className="login-nav-button">הזדהותויתרס</button>
            <button className="login-nav-button login-nav-button-active">סוגדו מדיים</button>
          </div>
        </div>
      </header> */}

      <div className="login-main-content">
        {/* Left Side - Network Background */}
        <div className="login-left-side">
          <div className="login-network-bg">
            <svg className="login-network-svg" viewBox="0 0 600 800">
              {/* Network lines */}
              <line x1="50" y1="100" x2="150" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="150" y1="200" x2="250" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="250" y1="150" x2="350" y2="250" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="100" y1="300" x2="200" y2="400" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="200" y1="400" x2="300" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="300" y1="350" x2="400" y2="450" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="150" y1="500" x2="250" y2="600" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="250" y1="600" x2="350" y2="550" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="50" y1="250" x2="100" y2="300" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="350" y1="250" x2="400" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              
              {/* Network nodes */}
              <circle cx="50" cy="100" r="8" fill="rgba(255,255,255,0.6)" />
              <circle cx="150" cy="200" r="10" fill="rgba(255,255,255,0.7)" />
              <circle cx="250" cy="150" r="12" fill="rgba(255,255,255,0.5)" />
              <circle cx="350" cy="250" r="15" fill="rgba(255,255,255,0.8)" />
              <circle cx="100" cy="300" r="8" fill="rgba(255,255,255,0.6)" />
              <circle cx="200" cy="400" r="10" fill="rgba(255,255,255,0.7)" />
              <circle cx="300" cy="350" r="12" fill="rgba(255,255,255,0.6)" />
              <circle cx="400" cy="450" r="14" fill="rgba(255,255,255,0.75)" />
              <circle cx="150" cy="500" r="9" fill="rgba(255,255,255,0.65)" />
              <circle cx="250" cy="600" r="11" fill="rgba(255,255,255,0.7)" />
              <circle cx="350" cy="550" r="13" fill="rgba(255,255,255,0.6)" />
              <circle cx="400" cy="200" r="10" fill="rgba(255,255,255,0.65)" />
              <circle cx="50" cy="250" r="8" fill="rgba(255,255,255,0.55)" />
            </svg>

            <div className="login-logo-container">
              <div className="login-logo-bubble">
                <div className="login-logo-circle">
                  <span className="login-logo-q">Q</span>
                  <div className="login-logo-dots">
                    <span className="login-dot" style={{background: '#fff'}}></span>
                    <span className="login-dot" style={{background: '#fbbf24'}}></span>
                    <span className="login-dot" style={{background: '#f97316'}}></span>
                    <span className="login-dot" style={{background: '#ef4444'}}></span>
                  </div>
                </div>
                <div className="login-logo-text">
                  <div className="login-logo-title">Q-it</div>
                  <div className="login-logo-subtitle">0165-99</div>
                  <div className="login-logo-tagline">PFKW1561R8 Bnyucraien</div>
                </div>
              </div>
              
              <div className="login-stats-text">
                <div className="login-stats-line">הופכים חומר לתרגול חכם</div>
                <div className="login-stats-line">כבר יצרנו מעל 10,000 שאלות עבור מאות מורים ותלמידים. הצטרפו למהפכת הלמידה.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-right-side">
          <div className="login-form-container">
            <h1 className="login-title">כיף לראות אותך שוב!</h1>
            <p className="login-subtitle">התחבר כדי להמשיך לתרגל</p>
            
            <div className="login-tab-container">
              <button className="login-tab">עוצמה</button>
              <span className="login-tab-separator">/</span>
              <button className="login-active-tab">סוגה חפכה</button>
            </div>

            <div className="login-form-div">
              <div className="login-input-group">
                <div className="login-input-wrapper">
                  <Mail className="login-input-icon" />
                  <input
                    type="email"
                    placeholder="םייל"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                  />
                </div>
              </div>

              <div className="login-input-group">
                <button 
                  type="button"
                  className="login-forgot-password"
                >
                  שכחת סיסמה?
                </button>
                <div className="login-input-wrapper">
                  <Lock className="login-input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="סיסמה"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-eye-button"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button onClick={() => handleSubmit} className="login-submit-button">
                התחבר
              </button>
              <a href="/register" style={{textAlign: 'center', color: '#6b7280', textDecoration: 'none'}}>אין חשבון? הרשם כאן</a>
              <button type="button" className="login-google-button">
                <svg className="login-google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                התחבר עם Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}