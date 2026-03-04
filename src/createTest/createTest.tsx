import React, { useState } from 'react';
import { Plus, Trash2, Save, Eye, Settings, Calendar, Clock, BookOpen, Users, Sparkles, Upload, X, FileText } from 'lucide-react';
import { QuestionType } from '../types/questionType';
import { addAnswerOptions, addQuestion as addQuestionApi } from '../services/question.service';
import { AnswerOptionsType } from '../types/answerOptionsType';

const QaitCreateTest = () => {
  const [testData, setTestData] = useState({
    title: '',
    subject: '',
    description: '',
    duration: 45,
    scheduledDate: '',
    scheduledTime: '',
    classes: [],
    passingGrade: 60
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: 0,
      difficulty: 'בינוני',
      points: 1
    }
  ]);

  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiFiles, setAiFiles] = useState([]);
  const [aiInstructions, setAiInstructions] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [aiDifficulty, setAiDifficulty] = useState('מעורב');

  const subjects = ['מתמטיקה', 'אנגלית', 'עברית', 'ביולוגיה', 'פיזיקה', 'כימיה', 'היסטוריה', 'ספרות'];
  const classes = ['י\'1', 'י\'2', 'י\'3', 'י\'4', 'י\'5'];
  const saveTest = async () => {
    try {
      const difficultyToLevel: Record<string, 1 | 2 | 3> = {
        קל: 1,
        בינוני: 2,
        קשה: 3,
      };

      const validQuestions = questions.filter((question) => question.question.trim().length > 0);

      for (const questionItem of validQuestions) {
        const questionPayload: QuestionType = {
          QuestionId: 0,
          Questions: questionItem.question,
          Level: difficultyToLevel[questionItem.difficulty] ?? 2,
          ChapterId: 1,
        };

        const createdQuestion = await addQuestionApi(questionPayload);
        const createdQuestionId =
          createdQuestion?.questionId ||
          createdQuestion?.QuestionId ||
          createdQuestion?.id ||
          createdQuestion?.data?.questionId ||
          createdQuestion?.data?.QuestionId ||
          createdQuestion?.data?.id;

        if (!createdQuestionId) {
          continue;
        }

        for (let answerIndex = 0; answerIndex < questionItem.answers.length; answerIndex += 1) {
          const optionText = questionItem.answers[answerIndex]?.trim();
          if (!optionText) continue;

          const optionPayload: AnswerOptionsType = {
            AnswerOptionsId: 0,
            QuestionId: Number(createdQuestionId),
            Option: optionText,
            IsCorrect: questionItem.correctAnswer === answerIndex,
            Description: '',
          };

          await addAnswerOptions(optionPayload);
        }
      }

      alert('המבחן נשמר בהצלחה');
    } catch (error) {
      console.error('Failed saving test', error);
      alert('שמירת המבחן נכשלה, נסה שוב');
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: 0,
      difficulty: 'בינוני',
      points: 1
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateAnswer = (questionId, answerIndex, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newAnswers = [...q.answers];
        newAnswers[answerIndex] = value;
        return { ...q, answers: newAnswers };
      }
      return q;
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAiFiles([...aiFiles, ...files]);
  };

  const removeFile = (index) => {
    setAiFiles(aiFiles.filter((_, i) => i !== index));
  };

  const generateQuestionsWithAI = async () => {
    // כאן תוסיף את החיבור למודל AI
    console.log('Generating questions with AI...', {
      files: aiFiles,
      instructions: aiInstructions,
      numQuestions: numQuestions,
      difficulty: aiDifficulty
    });
    
    // לדוגמה - הוסף שאלות דמה (בפועל יגיעו מה-AI)
    const aiGeneratedQuestions = Array.from({ length: numQuestions }, (_, i) => ({
      id: questions.length + i + 1,
      question: `שאלה שנוצרה על ידי AI ${i + 1}`,
      answers: ['תשובה 1', 'תשובה 2', 'תשובה 3', 'תשובה 4'],
      correctAnswer: 1,
      difficulty: aiDifficulty === 'מעורב' ? ['קל', 'בינוני', 'קשה'][Math.floor(Math.random() * 3)] : aiDifficulty,
      points: 1
    }));
    
    setQuestions([...questions, ...aiGeneratedQuestions]);
    setShowAiPanel(false);
    setAiFiles([]);
    setAiInstructions('');
  };

  const totalPoints = questions.reduce((sum, q) => sum + parseInt(q.points || 0), 0);

  return (
    <div style={styles.container} dir="rtl">
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>יצירת מבחן חדש</h1>
          <p style={styles.subtitle}>צור מבחן מותאם אישית לתלמידים שלך</p>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.previewButton}>
            <Eye size={18} />
            תצוגה מקדימה
          </button>
          <button style={styles.saveButton} onClick={saveTest}>
            <Save size={18} />
            שמור מבחן
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Left Sidebar - Test Settings */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>
              <Settings size={20} />
              הגדרות מבחן
            </h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>שם המבחן</label>
              <input
                type="text"
                placeholder="לדוגמה: מבחן באלגברה"
                value={testData.title}
                onChange={(e) => setTestData({...testData, title: e.target.value})}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>נושא</label>
              <select
                value={testData.subject}
                onChange={(e) => setTestData({...testData, subject: e.target.value})}
                style={styles.select}
              >
                <option value="">בחר נושא</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>תיאור</label>
              <textarea
                placeholder="תיאור קצר של המבחן..."
                value={testData.description}
                onChange={(e) => setTestData({...testData, description: e.target.value})}
                style={styles.textarea}
                rows={3}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>משך זמן (דקות)</label>
              <input
                type="number"
                value={testData.duration}
                onChange={(e) => setTestData({...testData, duration: e.target.value})}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>ציון עובר (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={testData.passingGrade}
                onChange={(e) => setTestData({...testData, passingGrade: e.target.value})}
                style={styles.input}
              />
            </div>
          </div>
          {/* Summary Card */}
          <div style={styles.summaryCard}>
            <h4 style={styles.summaryTitle}>סיכום</h4>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>שאלות:</span>
              <span style={styles.summaryValue}>{questions.length}</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>נקודות:</span>
              <span style={styles.summaryValue}>{totalPoints}</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>משך:</span>
              <span style={styles.summaryValue}>{testData.duration} דקות</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>כיתות:</span>
              <span style={styles.summaryValue}>{testData.classes.length}</span>
            </div>
          </div>
        </div>

        {/* Main Content - Questions */}
        <div style={styles.questionsContainer}>
          <div style={styles.questionsHeader}>
            <h2 style={styles.questionsTitle}>שאלות</h2>
            <div style={styles.headerButtons}>
              <button style={styles.aiButton} onClick={() => setShowAiPanel(!showAiPanel)}>
                <Sparkles size={18} />
                צור שאלות עם AI
              </button>
              <button style={styles.addQuestionButton} onClick={addQuestion}>
                <Plus size={18} />
                הוסף שאלה
              </button>
            </div>
          </div>

          {/* AI Panel */}
          {showAiPanel && (
            <div style={styles.aiPanel}>
              <div style={styles.aiPanelHeader}>
                <div style={styles.aiPanelTitle}>
                  <Sparkles size={24} style={{color: '#8b5cf6'}} />
                  <div>
                    <h3 style={styles.aiTitle}>צור שאלות באמצעות בינה מלאכותית</h3>
                    <p style={styles.aiSubtitle}>העלה חומרי לימוד והמערכת תיצור שאלות אוטומטית</p>
                  </div>
                </div>
                <button style={styles.closeButton} onClick={() => setShowAiPanel(false)}>
                  <X size={20} />
                </button>
              </div>

              <div style={styles.aiPanelContent}>
                {/* File Upload */}
                <div style={styles.uploadSection}>
                  <label style={styles.uploadArea}>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                      onChange={handleFileUpload}
                      style={{display: 'none'}}
                    />
                    <Upload size={32} style={{color: '#8b5cf6'}} />
                    <div style={styles.uploadText}>
                      <span style={styles.uploadTitle}>לחץ להעלאת קבצים</span>
                      <span style={styles.uploadDesc}>PDF, Word, PowerPoint, טקסט</span>
                    </div>
                  </label>

                  {/* Uploaded Files */}
                  {aiFiles.length > 0 && (
                    <div style={styles.filesList}>
                      {aiFiles.map((file, index) => (
                        <div key={index} style={styles.fileItem}>
                          <FileText size={18} style={{color: '#8b5cf6'}} />
                          <span style={styles.fileName}>{file.name}</span>
                          <button 
                            style={styles.removeFileButton}
                            onClick={() => removeFile(index)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI Settings */}
                <div style={styles.aiSettings}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>מספר שאלות</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>רמת קושי</label>
                    <select
                      value={aiDifficulty}
                      onChange={(e) => setAiDifficulty(e.target.value)}
                      style={styles.select}
                    >
                      <option value="מעורב">מעורב</option>
                      <option value="קל">קל</option>
                      <option value="בינוני">בינוני</option>
                      <option value="קשה">קשה</option>
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>הוראות נוספות (אופציונלי)</label>
                  <textarea
                    placeholder="לדוגמה: התמקד בפרק 3, צור שאלות על נושא X..."
                    value={aiInstructions}
                    onChange={(e) => setAiInstructions(e.target.value)}
                    style={styles.textarea}
                    rows={3}
                  />
                </div>

                <button 
                  style={styles.generateButton}
                  onClick={generateQuestionsWithAI}
                  disabled={aiFiles.length === 0}
                >
                  <Sparkles size={18} />
                  צור {numQuestions} שאלות
                </button>
              </div>
            </div>
          )}

          <div style={styles.questionsList}>
            {questions.map((q, index) => (
              <div key={q.id} style={styles.questionCard}>
                <div style={styles.questionCardHeader}>
                  <div style={styles.questionNumber}>שאלה {index + 1}</div>
                  <button 
                    style={styles.deleteButton}
                    onClick={() => removeQuestion(q.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div style={styles.questionForm}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>נוסח השאלה</label>
                    <textarea
                      placeholder="כתוב את השאלה כאן..."
                      value={q.question}
                      onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                      style={styles.textarea}
                      rows={2}
                    />
                  </div>

                  <div style={styles.answersSection}>
                    <label style={styles.label}>תשובות</label>
                    {q.answers.map((answer, answerIndex) => (
                      <div key={answerIndex} style={styles.answerRow}>
                        <input
                          type="radio"
                          name={`correct-${q.id}`}
                          checked={q.correctAnswer === answerIndex}
                          onChange={() => updateQuestion(q.id, 'correctAnswer', answerIndex)}
                          style={styles.radio}
                        />
                        <input
                          type="text"
                          placeholder={`תשובה ${answerIndex + 1}`}
                          value={answer}
                          onChange={(e) => updateAnswer(q.id, answerIndex, e.target.value)}
                          style={styles.answerInput}
                        />
                      </div>
                    ))}
                    <div style={styles.correctAnswerHint}>
                      בחר את התשובה הנכונה על ידי סימון העיגול
                    </div>
                  </div>

                  <div style={styles.questionMeta}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>רמת קושי</label>
                      <select
                        value={q.difficulty}
                        onChange={(e) => updateQuestion(q.id, 'difficulty', e.target.value)}
                        style={styles.selectSmall}
                      >
                        <option value="קל">קל</option>
                        <option value="בינוני">בינוני</option>
                        <option value="קשה">קשה</option>
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>נקודות</label>
                      <input
                        type="number"
                        min="1"
                        value={q.points}
                        onChange={(e) => updateQuestion(q.id, 'points', e.target.value)}
                        style={styles.inputSmall}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {questions.length === 0 && (
            <div style={styles.emptyState}>
              <BookOpen size={48} style={styles.emptyIcon} />
              <h3 style={styles.emptyTitle}>אין שאלות במבחן</h3>
              <p style={styles.emptyText}>לחץ על "הוסף שאלה" כדי להתחיל</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    overflowY: 'auto',
    padding: '32px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  previewButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    color: '#6b7280',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    gap: '24px',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  sidebarSection: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #e5e7eb',
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#14b8a6',
  },
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  questionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerButtons: {
    display: 'flex',
    gap: '12px',
  },
  aiButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  addQuestionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  questionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  questionCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  questionCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  questionNumber: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#14b8a6',
  },
  deleteButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  questionForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  answersSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  answerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  radio: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  answerInput: {
    flex: 1,
    padding: '10px 12px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  },
  correctAnswerHint: {
    fontSize: '12px',
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: '4px',
  },
  questionMeta: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  selectSmall: {
    width: '100%',
    padding: '8px 10px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
  },
  inputSmall: {
    width: '100%',
    padding: '8px 10px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  },
  emptyState: {
    textAlign: 'center',
    padding: '64px 32px',
    backgroundColor: 'white',
    borderRadius: '12px',
  },
  emptyIcon: {
    color: '#d1d5db',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#9ca3af',
  },
  aiPanel: {
    backgroundColor: '#faf5ff',
    border: '2px solid #e9d5ff',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  aiPanelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  aiPanelTitle: {
    display: 'flex',
    gap: '16px',
  },
  aiTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '4px',
  },
  aiSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
  },
  closeButton: {
    padding: '6px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    borderRadius: '6px',
  },
  aiPanelContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  uploadSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  uploadArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '32px',
    border: '2px dashed #c4b5fd',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  uploadText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  uploadTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
  },
  uploadDesc: {
    fontSize: '14px',
    color: '#9ca3af',
  },
  filesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'white',
    border: '1px solid #e9d5ff',
    borderRadius: '8px',
  },
  fileName: {
    flex: 1,
    fontSize: '14px',
    color: '#1f2937',
  },
  removeFileButton: {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  aiSettings: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  generateButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 24px',
    background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};
export default QaitCreateTest;