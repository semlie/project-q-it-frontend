import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function QaitLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt', { email, password });
  };

  return (
    <div style={styles.container} dir="rtl">
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'%3E%3Ctext x='10' y='50' font-size='24' fill='%2306b6d4' font-weight='bold'%3EQ-it%3C/text%3E%3Ctext x='10' y='70' font-size='12' fill='%2306b6d4'%3EUNI-HIT%3C/text%3E%3C/svg%3E"
            alt="Q-it Logo" 
            style={styles.logo}
          />
          
          <div style={styles.nav}>
            <button style={styles.navButton}>הזדהותויתרס</button>
            <button style={{...styles.navButton, ...styles.navButtonActive}}>סוגדו מדיים</button>
          </div>
        </div>
      </header>

      <div style={styles.mainContent}>
        {/* Left Side - Network Background */}
        <div style={styles.leftSide}>
          <div style={styles.networkBg}>
            <svg style={styles.networkSvg} viewBox="0 0 600 800">
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

            <div style={styles.logoContainer}>
              <div style={styles.logoBubble}>
                <div style={styles.logoCircle}>
                  <span style={styles.logoQ}>Q</span>
                  <div style={styles.logoDots}>
                    <span style={{...styles.dot, background: '#fff'}}></span>
                    <span style={{...styles.dot, background: '#fbbf24'}}></span>
                    <span style={{...styles.dot, background: '#f97316'}}></span>
                    <span style={{...styles.dot, background: '#ef4444'}}></span>
                  </div>
                </div>
                <div style={styles.logoText}>
                  <div style={styles.logoTitle}>Q-it</div>
                  <div style={styles.logoSubtitle}>0165-99</div>
                  <div style={styles.logoTagline}>PFKW1561R8 Bnyucraien</div>
                </div>
              </div>
              
              <div style={styles.statsText}>
                <div style={styles.statsLine}>10,000 עיר מנכבות 10,000</div>
                <div style={styles.statsLine}>מבח החליח סבה 1-S00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={styles.rightSide}>
          <div style={styles.formContainer}>
            <h1 style={styles.title}>!קרא מררת. וצויח</h1>
            <p style={styles.subtitle}>מרח ניול צח פשות גבמחחור ומור נעיע</p>
            
            <div style={styles.tabContainer}>
              <button style={styles.tab}>עוצמה</button>
              <span style={styles.tabSeparator}>/</span>
              <button style={styles.activeTab}>סוגה חפכה</button>
            </div>

            <div style={styles.formDiv}>
              <div style={styles.inputGroup}>
                <div style={styles.inputWrapper}>
                  <Mail style={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="סיגמ/מיוחסח"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <button 
                  type="button"
                  style={styles.forgotPassword}
                >
                  ?סומוזז לי-3
                </button>
                <div style={styles.inputWrapper}>
                  <Lock style={styles.inputIcon} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="סמח ניבמח"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button onClick={handleSubmit} style={styles.submitButton}>
                סגס חAB5A כומ
              </button>

              <button type="button" style={styles.googleButton}>
                <svg style={styles.googleIcon} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                אוטבורח_תטשוררו ומעיור ןGoogle mbooglc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 0',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
  },
  nav: {
    display: 'flex',
    gap: '32px',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '8px 0',
  },
  navButtonActive: {
    color: '#0891b2',
    borderBottom: '3px solid #0891b2',
    fontWeight: '600',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
  },
  leftSide: {
    flex: 1,
    background: 'linear-gradient(135deg, #0c4a6e 0%, #0e7490 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  networkBg: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  networkSvg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logoContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
  },
  logoBubble: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '60px',
  },
  logoCircle: {
    width: '100px',
    height: '100px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoQ: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#0891b2',
  },
  logoDots: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    display: 'flex',
    gap: '4px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  logoText: {
    textAlign: 'right',
  },
  logoTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  logoSubtitle: {
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '5px',
  },
  logoTagline: {
    fontSize: '14px',
    opacity: 0.9,
  },
  statsText: {
    fontSize: '28px',
    fontWeight: '600',
    lineHeight: '1.5',
  },
  statsLine: {
    marginBottom: '8px',
  },
  rightSide: {
    flex: 1,
    backgroundColor: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#0891b2',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#6b7280',
    marginBottom: '32px',
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    justifyContent: 'flex-end',
  },
  tab: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontSize: '16px',
    cursor: 'pointer',
  },
  activeTab: {
    background: 'none',
    border: 'none',
    color: '#14b8a6',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  tabSeparator: {
    color: '#d1d5db',
  },
  formDiv: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputGroup: {
    position: 'relative',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    right: '16px',
    color: '#9ca3af',
    width: '20px',
    height: '20px',
  },
  input: {
    width: '100%',
    padding: '16px 48px 16px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  eyeButton: {
    position: 'absolute',
    left: '16px',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    padding: '4px',
  },
  forgotPassword: {
    position: 'absolute',
    top: '-28px',
    right: '0',
    background: 'none',
    border: 'none',
    color: '#14b8a6',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    marginTop: '8px',
  },
  googleButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    color: '#6b7280',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
  },
};