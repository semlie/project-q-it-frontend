import React from 'react';
import { FileText, Sparkles, GraduationCap } from 'lucide-react';

export default function QaitLandingPage() {
  return (
    <div style={styles.container} dir="rtl">
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div>
                <img src="../public/images/Gemini_Generated_Image_1lvncf1lvncf1lvn.png" alt="UNI-HIT Logo" style={{ height: '100px', marginBottom: '4px' }} />
            </div>
          </div>
          
          <div style={styles.headerButtons}>
            <button style={styles.dropdownButton}>
              מוצרים נוספים ▼
            </button>
            <button style={styles.loginButton}>
              התחברות ל־Q-it
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <main style={styles.main}>
        <img src="../public/images/Gemini_Generated_Image_1lvncf1lvncf1lvn.png" alt="Homepage Illustration" style={{ width: '100%', maxWidth: '600px', marginBottom: '40px', borderRadius: '16px' }} />
        <div style={styles.hero}>
          <h1 style={styles.mainTitle}>
           מתרגלים. נהנים. מצליחים.
          </h1>
          <p style={styles.subtitle}>
           המערכת החכמה שהופכת כל חומר לימודי למרתון שאלות אינטראקטיבי ב-3 רמות קושי.
          </p>
          <button style={styles.ctaButton}>
           התחל עכשיו בחינם
          </button>
        </div>

        {/* Features Section */}
        <div style={styles.featuresHeader}>
          <h2 style={styles.featuresTitle}>
            איך זה עובד?
          </h2>
        </div>

        <div style={styles.featuresContainer}>
          {/* Feature 1 */}
          <div style={styles.featureCard}>
            <div style={{...styles.iconCircle, background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)'}}>
              <FileText style={styles.icon} />
            </div>
            <h3 style={styles.featureTitle}>
              המורה מעלה חומר
            </h3>
            <p style={styles.featureText}>
              (PDF/Word)
            </p>
          </div>

          {/* Feature 2 */}
          <div style={styles.featureCard}>
            <div style={{...styles.iconCircle, background: 'linear-gradient(135deg, #fbbf24 0%, #eab308 100%)'}}>
              <Sparkles style={styles.icon} />
            </div>
            <h3 style={styles.featureTitle}>
              ה-AI שלנו מנתח ומייצר שאלות אמריקאיות.
            </h3>
            <p style={styles.featureText}>
            </p>
            <p style={styles.featureSubtext}>
            </p>
          </div>

          {/* Feature 3 */}
          <div style={styles.featureCard}>
            <div style={{...styles.iconCircle, background: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)'}}>
              <GraduationCap style={styles.icon} />
            </div>
            <h3 style={styles.featureTitle}>
              התלמידים מתרגלים ומגיעים לשיא ההצלחה.
            </h3>
            <p style={styles.featureText}>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    margin: '0',
    padding: '0',
    background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'auto',
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  headerContent: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoCircle: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  logoTitle: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#1f2937',
  },
  logoSubtitle: {
    fontSize: '12px',
    color: '#6b7280',
  },
  headerButtons: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  dropdownButton: {
    color: '#4b5563',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '8px 12px',
    transition: 'color 0.2s',
  },
  loginButton: {
    background: 'linear-gradient(90deg, #06b6d4 0%, #14b8a6 100%)',
    color: 'white',
    padding: '10px 24px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'box-shadow 0.3s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  main: {
    padding: '80px 16px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '64px',
  },
  mainTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '24px',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '20px',
    color: '#4b5563',
    marginBottom: '16px',
  },
  description: {
    fontSize: '18px',
    color: '#6b7280',
    marginBottom: '32px',
  },
  ctaButton: {
    background: 'linear-gradient(90deg, #06b6d4 0%, #14b8a6 100%)',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'all 0.3s',
    boxShadow: '0 10px 25px rgba(6, 182, 212, 0.3)',
  },
  featuresHeader: {
    marginBottom: '48px',
    textAlign: 'center',
  },
  featuresTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#374151',
  },
  featuresContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '32px',
    flexWrap: 'wrap',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'box-shadow 0.3s',
    minWidth: '280px',
    maxWidth: '320px',
  },
  iconCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  icon: {
    width: '40px',
    height: '40px',
    color: 'white',
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  },
  featureText: {
    color: '#4b5563',
    fontSize: '16px',
  },
  featureSubtext: {
    color: '#6b7280',
    fontSize: '14px',
    marginTop: '4px',
  },
};