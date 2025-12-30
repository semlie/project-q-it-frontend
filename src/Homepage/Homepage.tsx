import React from 'react';
import { FileText, Sparkles, GraduationCap } from 'lucide-react';
import logoImage from '../assets/images/logo_q-it-rb.png';
import './homepage.css';

export default function QaitLandingPage() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div>
                <img src={logoImage} alt="UNI-HIT Logo" className="logo-image" />
            </div>
          </div>
          
          <div className="header-buttons">
            <button className="dropdown-button">
              מוצרים נוספים ▼
            </button>
            <button className="login-button">
              התחברות ל־Q-it
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <main className="main">
        <img src={logoImage} alt="Homepage Illustration" className="hero-image" />
        <div className="hero">
          <h1 className="main-title">
           מתרגלים. נהנים. מצליחים.
          </h1>
          <p className="subtitle">
           המערכת החכמה שהופכת כל חומר לימודי למרתון שאלות אינטראקטיבי ב-3 רמות קושי.
          </p>
          <button className="cta-button">
           התחל עכשיו בחינם
          </button>
        </div>

        {/* Features Section */}
        <div className="features-header">
          <h2 className="features-title">
            איך זה עובד?
          </h2>
        </div>

        <div className="features-container">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="icon-circle icon-circle-green">
              <FileText className="icon" />
            </div>
            <h3 className="feature-title">
              המורה מעלה חומר
            </h3>
            <p className="feature-text">
              (PDF/Word)
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="icon-circle icon-circle-yellow">
              <Sparkles className="icon" />
            </div>
            <h3 className="feature-title">
              ה-AI שלנו מנתח ומייצר שאלות אמריקאיות.
            </h3>
            <p className="feature-text">
            </p>
            <p className="feature-subtext">
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="icon-circle icon-circle-red">
              <GraduationCap className="icon" />
            </div>
            <h3 className="feature-title">
              התלמידים מתרגלים ומגיעים לשיא ההצלחה.
            </h3>
            <p className="feature-text">
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}