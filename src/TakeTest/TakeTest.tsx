import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getQuestionsForChapter, submitAnswer, finishTest, TestQuestion, AnswerResult } from '../services/test.service';
import { Paths } from '../routes/paths';
import { AuthContext } from '../context/AuthContext';

const TakeTest: React.FC = () => {
  const { chapterId, level } = useParams<{ chapterId: string; level: string }>();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [finalResult, setFinalResult] = useState<any>(null);

  const levelMap: { [key: string]: number } = {
    'קל': 1,
    'בינוני': 2,
    'קשה': 3
  };

  useEffect(() => {
    const loadQuestions = async () => {
      if (!chapterId) return;
      if (!user?.userId) {
        console.error('User not logged in');
        setLoading(false);
        return;
      }
      try {
        const levelNum = level ? levelMap[level] : undefined;
        const data = await getQuestionsForChapter(parseInt(chapterId), levelNum);
        setQuestions(data);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [chapterId, level, user]);

  const handleAnswerSelect = (answerId: number) => {
    if (!isAnswered) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || !questions[currentIndex]) return;

    const userId = user?.userId;
    if (!userId) {
      alert('יש להתחבר למערכת כדי לענות על שאלות');
      return;
    }

    const questionId = questions[currentIndex].questionId;
    const answerId = selectedAnswer.toString();

    try {
      const result = await submitAnswer(userId, questionId, answerId);
      setAnswerResult(result);
      setIsAnswered(true);
      if (result.isCorrect) {
        setScore(prev => prev + 1);
      }
    } catch (error: any) {
      console.error('Error submitting answer:', error);
      alert('שגיאה בשליחת התשובה: ' + (error.response?.data || error.message));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setAnswerResult(null);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    const userId = user?.userId;
    if (!userId) {
      alert('יש להתחבר למערכת כדי לסיים את המבחן');
      return;
    }
    if (!chapterId) return;

    const duration = Math.round((Date.now() - startTime) / 1000);
    
    try {
      const result = await finishTest(userId, parseInt(chapterId), duration, score, questions.length);
      setFinalResult(result);
      setShowResults(true);
    } catch (error: any) {
      console.error('Error finishing test:', error);
      alert('שגיאה בשמירת התוצאות: ' + (error.response?.data || error.message));
    }
  };

  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1: return 'קל';
      case 2: return 'בינוני';
      case 3: return 'קשה';
      default: return '';
    }
  };

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return '#22c55e';
      case 2: return '#f59e0b';
      case 3: return '#ef4444';
      default: return '#6b7280';
    }
  };

  const currentQuestion = questions[currentIndex];

  if (loading || !currentQuestion) {
    return (
      <div style={styles.container} dir="rtl">
        <div style={styles.loading}>טוען שאלות...</div>
      </div>
    );
  }

  if (!user?.userId) {
    return (
      <div style={styles.container} dir="rtl">
        <div style={styles.noQuestions}>
          <h2>יש להתחבר למערכת כדי לגשת למבחן</h2>
          <button 
            style={styles.backButton}
            onClick={() => navigate('/login')}
          >
            התחברות
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={styles.container} dir="rtl">
        <div style={styles.noQuestions}>
          <h2>אין שאלות ברמה זו</h2>
          <button 
            style={styles.backButton}
            onClick={() => navigate(Paths.dashboard)}
          >
            חזור לדשבורד
          </button>
        </div>
      </div>
    );
  }

  if (showResults && finalResult) {
    const percentage = finalResult.percentage;
    let message = '';
    let messageColor = '';
    
    if (percentage >= 90) {
      message = 'מצוין! כל הכבוד! 🌟';
      messageColor = '#22c55e';
    } else if (percentage >= 70) {
      message = 'טוב מאוד! 👍';
      messageColor = '#3b82f6';
    } else if (percentage >= 50) {
      message = 'יש לך עוד מה ללמוד 📚';
      messageColor = '#f59e0b';
    } else {
      message = 'נסה שוב! 💪';
      messageColor = '#ef4444';
    }

    return (
      <div style={styles.container} dir="rtl">
        <div style={styles.resultsContainer}>
          <h1 style={styles.resultsTitle}>תוצאות המבחן</h1>
          
          <div style={styles.scoreCircle}>
            <span style={{...styles.scorePercentage, color: messageColor}}>
              {Math.round(percentage)}%
            </span>
            <span style={styles.scoreText}>
              {finalResult.score} / {finalResult.total}
            </span>
          </div>

          <p style={{...styles.resultMessage, color: messageColor}}>{message}</p>

          <button 
            style={styles.finishButton}
            onClick={() => navigate(Paths.dashboard)}
          >
            סיים
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container} dir="rtl">
      <div style={styles.header}>
        <div style={styles.progressBar}>
          {questions.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.progressDot,
                ...(index < currentIndex ? styles.progressDotCompleted : {}),
                ...(index === currentIndex ? styles.progressDotActive : {}),
              }}
            />
          ))}
        </div>
        <div style={styles.questionCounter}>
          שאלה {currentIndex + 1} מתוך {questions.length}
        </div>
      </div>

      <main style={styles.main}>
        <div style={styles.quizContainer}>
          <div style={styles.questionHeader}>
            <h2 style={styles.questionText}>{currentQuestion.text}</h2>
            <span style={{
              ...styles.difficultyBadge,
              backgroundColor: getDifficultyColor(currentQuestion.level),
            }}>
              {getDifficultyLabel(currentQuestion.level)}
            </span>
          </div>

          <div style={styles.answersList}>
            {currentQuestion.answers.map((answer) => {
              const isSelected = selectedAnswer === answer.id;
              const isCorrectAnswer = answer.isCorrect;
              
              let answerStyle = {...styles.answerCard};
              
              if (isAnswered) {
                if (isCorrectAnswer) {
                  answerStyle = {...answerStyle, ...styles.answerCorrect};
                } else if (isSelected && !isCorrectAnswer) {
                  answerStyle = {...answerStyle, ...styles.answerWrong};
                }
              } else if (isSelected) {
                answerStyle = {...answerStyle, ...styles.answerSelected};
              }

              return (
                <div
                  key={answer.id}
                  style={answerStyle}
                  onClick={() => handleAnswerSelect(answer.id)}
                >
                  <div style={styles.answerContent}>
                    <span style={styles.answerText}>{answer.text}</span>
                    {isAnswered && isCorrectAnswer && (
                      <span style={styles.correctIcon}>✓</span>
                    )}
                    {isAnswered && isSelected && !isCorrectAnswer && (
                      <span style={styles.wrongIcon}>✗</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isAnswered && answerResult && (
            <div style={styles.feedback}>
              <div style={{
                ...styles.feedbackHeader,
                backgroundColor: answerResult.isCorrect ? '#dcfce7' : '#fee2e2',
              }}>
                <span style={{
                  ...styles.feedbackTitle,
                  color: answerResult.isCorrect ? '#16a34a' : '#dc2626',
                }}>
                  {answerResult.isCorrect ? 'תשובה נכונה! 🎉' : 'תשובה שגויה'}
                </span>
              </div>
              {answerResult.explanation && (
                <div style={styles.feedbackBody}>
                  <strong>הסבר:</strong>
                  <p style={styles.explanationText}>{answerResult.explanation}</p>
                </div>
              )}
            </div>
          )}

          <div style={styles.navigation}>
            {!isAnswered ? (
              <button
                style={{
                  ...styles.submitButton,
                  ...(selectedAnswer === null ? styles.submitButtonDisabled : {}),
                }}
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                שלח תשובה
              </button>
            ) : (
              <button
                style={styles.nextButton}
                onClick={handleNext}
              >
                {currentIndex < questions.length - 1 ? 'שאלה הבאה →' : 'סיים מבחן'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '20px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    fontSize: '1.2rem',
    color: '#64748b',
  },
  noQuestions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: '20px',
  },
  backButton: {
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  header: {
    maxWidth: '800px',
    margin: '0 auto 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  progressBar: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  progressDot: {
    flex: 1,
    minWidth: '30px',
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  },
  progressDotCompleted: {
    backgroundColor: '#22c55e',
  },
  progressDotActive: {
    backgroundColor: '#3b82f6',
    height: '10px',
  },
  questionCounter: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '0.9rem',
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  quizContainer: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    gap: '15px',
  },
  questionText: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0,
    flex: 1,
  },
  difficultyBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  answersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  answerCard: {
    padding: '16px 20px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  answerSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  answerCorrect: {
    borderColor: '#22c55e',
    backgroundColor: '#dcfce7',
  },
  answerWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#fee2e2',
  },
  answerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answerText: {
    fontSize: '1rem',
    color: '#334155',
  },
  correctIcon: {
    color: '#22c55e',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  wrongIcon: {
    color: '#ef4444',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  feedback: {
    marginTop: '20px',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  feedbackHeader: {
    padding: '12px 20px',
  },
  feedbackTitle: {
    fontWeight: '600',
    fontSize: '1rem',
  },
  feedbackBody: {
    padding: '16px 20px',
    backgroundColor: '#f8fafc',
  },
  explanationText: {
    margin: '8px 0 0',
    color: '#475569',
    lineHeight: 1.6,
  },
  navigation: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  submitButton: {
    padding: '14px 40px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  submitButtonDisabled: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed',
  },
  nextButton: {
    padding: '14px 40px',
    backgroundColor: '#22c55e',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  resultsContainer: {
    maxWidth: '500px',
    margin: '40px auto',
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  resultsTitle: {
    fontSize: '1.8rem',
    color: '#1e293b',
    marginBottom: '30px',
  },
  scoreCircle: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px',
    border: '4px solid #e2e8f0',
  },
  scorePercentage: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: '1rem',
    color: '#64748b',
  },
  resultMessage: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '30px',
  },
  resultsDetails: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '30px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  detailLabel: {
    fontSize: '0.9rem',
    color: '#64748b',
  },
  detailValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  finishButton: {
    padding: '14px 50px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default TakeTest;
