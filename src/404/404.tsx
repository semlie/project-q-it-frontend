import React from 'react';
import { AlertTriangle, Home, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={styles.container} dir="rtl">
      {/* Header - זהה למקור לשמירה על עקביות */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoSection}>
            <div style={styles.logoCircle}>
              <span style={styles.logoText}>Q</span>
            </div>
            <div>
              <div style={styles.logoTitle}>Q-ai-t</div>
              <div style={styles.logoSubtitle}>UNI-HIT</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.errorContainer}>
          {/* Icon Section */}
          <div style={{...styles.iconCircle, background: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)'}}>
            <AlertTriangle style={styles.icon} />
          </div>

          <h1 style={styles.errorCode}>404</h1>
          <h2 style={styles.mainTitle}>אופס! הדף לא נמצא</h2>
          <p style={styles.description}>
            נראה שהדף שחיפשת עבר למקום אחר או שמעולם לא היה קיים. 
            אל דאגה, אנחנו כאן כדי לעזור לך לחזור למסלול.
          </p>

          <div style={styles.buttonGroup}>
            <button 
              onClick={() => window.location.href = '/'} 
              style={styles.ctaButton}
            >
              <Home size={20} style={{marginLeft: '8px'}} />
              חזרה לדף הבית
            </button>
            
            <button 
              onClick={() => window.history.back()} 
              style={styles.secondaryButton}
            >
              חזור לדף הקודם
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '16px',
    display: 'flex',
    justifyContent: 'flex-start',
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
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  errorContainer: {
    textAlign: 'center' as const,
    backgroundColor: 'white',
    padding: '60px 40px',
    borderRadius: '24px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
    maxWidth: '600px',
    width: '100%',
  },
  errorCode: {
    fontSize: '120px',
    fontWeight: '900',
    background: 'linear-gradient(90deg, #06b6d4 0%, #14b8a6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0',
    lineHeight: '1',
  },
  mainTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px',
  },
  description: {
    fontSize: '18px',
    color: '#6b7280',
    marginBottom: '40px',
    lineHeight: '1.6',
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
  buttonGroup: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  ctaButton: {
    background: 'linear-gradient(90deg, #06b6d4 0%, #14b8a6 100%)',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 10px 20px rgba(6, 182, 212, 0.2)',
  },
  secondaryButton: {
    background: 'white',
    color: '#4b5563',
    padding: '14px 28px',
    borderRadius: '9999px',
    border: '2px solid #e5e7eb',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
};