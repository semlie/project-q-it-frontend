import React from 'react';
import { FileText, Sparkles, GraduationCap } from 'lucide-react';
import './homepage.css';
import { useNavigate } from 'react-router';
import FeatureCard from './components/FeatureCard';

const logoImage = new URL('../assets/images/logo_q-it-rb.png', import.meta.url).href;

export default function QaitLandingPage() {
   const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: 'המורה מעלה חומר',
      text: '(PDF/Word)',
      circleClassName: 'icon-circle-green',
      icon: <FileText className="icon" />,
    },
    {
      id: 2,
      title: 'ה-AI שלנו מנתח ומייצר שאלות אמריקאיות.',
      text: '',
      circleClassName: 'icon-circle-yellow',
      icon: <Sparkles className="icon" />,
    },
    {
      id: 3,
      title: 'התלמידים מתרגלים ומגיעים לשיא ההצלחה.',
      text: '',
      circleClassName: 'icon-circle-red',
      icon: <GraduationCap className="icon" />,
    },
  ];

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
            <button className="login-button" onClick={() => navigate('/login')}>
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
          <button className="cta-button" onClick={() => navigate('/register')}>
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
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              text={feature.text}
              circleClassName={feature.circleClassName}
              icon={feature.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}