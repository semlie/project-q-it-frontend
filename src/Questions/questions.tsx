import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function QaitQuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 10;

  const question = {
    text: "מהי בירת צרפת?",
    difficulty: "קל", // אפשרויות: "קל", "בינוני", "קשה"
    answers: [
      { id: 1, text: "לונדון", isCorrect: false },
      { id: 2, text: "פריז", isCorrect: true },
      { id: 3, text: "ברלין", isCorrect: false }
    ]
  };

  const getDifficultyStyle = () => {
    switch(question.difficulty) {
      case "קל":
        return { ...styles.difficultyBadge, ...styles.difficultyEasy };
      case "בינוני":
        return { ...styles.difficultyBadge, ...styles.difficultyMedium };
      case "קשה":
        return { ...styles.difficultyBadge, ...styles.difficultyHard };
      default:
        return styles.difficultyBadge;
    }
  };

  const handleAnswerClick = (answerId) => {
    if (!isAnswered) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmit = () => {
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuestion(prev => prev + 1);
  };

  const handlePrevious = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuestion(prev => prev - 1);
  };

  const getAnswerStyle = (answer) => {
    if (!isAnswered) {
      return selectedAnswer === answer.id ? styles.answerSelected : styles.answer;
    }
    
    if (answer.isCorrect) {
      return { ...styles.answer, ...styles.answerCorrect };
    }
    
    if (selectedAnswer === answer.id && !answer.isCorrect) {
      return { ...styles.answer, ...styles.answerWrong };
    }
    
    return styles.answer;
  };

  return (
    <div style={styles.container} dir="rtl">
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img 
            src="../assets/images/logo_q-it-rb.png"
            alt="Q-it Logo" 
            style={styles.logo}
          />
          
          <div style={styles.headerInfo}>
            <div style={styles.progressInfo}>
              <span style={styles.progressText}>שאלה {currentQuestion} מתוך {totalQuestions}</span>
            </div>
          </div>

          <button style={styles.exitButton}>
            יציאה מהמבחן
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div style={styles.progressBarContainer}>
        <div style={{...styles.progressBar, width: `${(currentQuestion / totalQuestions) * 100}%`}}></div>
      </div>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.quizContainer}>
          {/* Question Card */}
          <div style={styles.questionCard}>
            <div style={styles.questionHeader}>
              <div style={styles.questionNumber}>שאלה {currentQuestion}</div>
              <div style={getDifficultyStyle()}>
                {question.difficulty}
              </div>
            </div>
            <h2 style={styles.questionText}>{question.text}</h2>
          </div>

          {/* Answers */}
          <div style={styles.answersContainer}>
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerClick(answer.id)}
                style={getAnswerStyle(answer)}
                disabled={isAnswered}
              >
                <div style={styles.answerContent}>
                  <div style={styles.answerIcon}>
                    {isAnswered && answer.isCorrect ? (
                      <CheckCircle size={24} />
                    ) : selectedAnswer === answer.id ? (
                      <CheckCircle size={24} />
                    ) : (
                      <Circle size={24} />
                    )}
                  </div>
                  <span style={styles.answerText}>{answer.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div style={
              question.answers.find(a => a.id === selectedAnswer)?.isCorrect 
                ? styles.feedbackCorrect 
                : styles.feedbackWrong
            }>
              {question.answers.find(a => a.id === selectedAnswer)?.isCorrect ? (
                <div>
                  <div style={styles.feedbackTitle}>✓ תשובה נכונה!</div>
                  <p style={styles.feedbackText}>כל הכבוד! התשובה שלך נכונה.</p>
                </div>
              ) : (
                <div>
                  <div style={styles.feedbackTitle}>✗ תשובה שגויה</div>
                  <p style={styles.feedbackText}>התשובה הנכונה היא: {question.answers.find(a => a.isCorrect)?.text}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={styles.navigationContainer}>
            <button 
              onClick={handlePrevious}
              style={styles.prevButton}
              disabled={currentQuestion === 1}
            >
              <ArrowRight size={20} />
              שאלה קודמת
            </button>

            {!isAnswered ? (
              <button 
                onClick={handleSubmit}
                style={selectedAnswer ? styles.submitButton : styles.submitButtonDisabled}
                disabled={!selectedAnswer}
              >
                בדוק תשובה
              </button>
            ) : (
              <button 
                onClick={handleNext}
                style={styles.nextButton}
                disabled={currentQuestion === totalQuestions}
              >
                שאלה הבאה
                <ArrowLeft size={20} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 0',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  progressInfo: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
  },
  progressText: {
    color: '#0891b2',
  },
  exitButton: {
    padding: '10px 20px',
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    color: '#6b7280',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  progressBarContainer: {
    width: '100%',
    height: '4px',
    backgroundColor: '#e5e7eb',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)',
    transition: 'width 0.3s ease',
  },
  main: {
    flex: 1,
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  quizContainer: {
    width: '100%',
    maxWidth: '800px',
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    marginBottom: '32px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  questionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  questionNumber: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#f0fdfa',
    color: '#14b8a6',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },
  difficultyBadge: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },
  difficultyEasy: {
    backgroundColor: '#d1fae5',
    color: '#059669',
  },
  difficultyMedium: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  },
  difficultyHard: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  questionText: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    lineHeight: '1.4',
    margin: 0,
  },
  answersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '32px',
  },
  answer: {
    width: '100%',
    padding: '20px 24px',
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'right',
    fontSize: '16px',
  },
  answerSelected: {
    width: '100%',
    padding: '20px 24px',
    backgroundColor: '#f0fdfa',
    border: '2px solid #14b8a6',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'right',
    fontSize: '16px',
  },
  answerCorrect: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981',
    cursor: 'not-allowed',
  },
  answerWrong: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
    cursor: 'not-allowed',
  },
  answerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  answerIcon: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
  answerText: {
    flex: 1,
    fontSize: '18px',
    fontWeight: '500',
    color: '#1f2937',
  },
  feedbackCorrect: {
    padding: '20px 24px',
    backgroundColor: '#d1fae5',
    border: '2px solid #10b981',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  feedbackWrong: {
    padding: '20px 24px',
    backgroundColor: '#fee2e2',
    border: '2px solid #ef4444',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  feedbackTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#1f2937',
  },
  feedbackText: {
    fontSize: '16px',
    color: '#374151',
    margin: 0,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
  },
  prevButton: {
    padding: '14px 24px',
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    color: '#6b7280',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  submitButton: {
    padding: '14px 32px',
    background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  submitButtonDisabled: {
    padding: '14px 32px',
    backgroundColor: '#d1d5db',
    border: 'none',
    borderRadius: '12px',
    color: '#9ca3af',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
  },
  nextButton: {
    padding: '14px 32px',
    background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
};