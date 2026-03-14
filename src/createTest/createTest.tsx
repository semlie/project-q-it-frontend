import React, { useEffect, useState, useContext } from 'react';
import { Plus, Trash2, Save, Eye, Settings, Sparkles, Upload, X, FileText } from 'lucide-react';
import { QuestionType } from '../types/questionType';
import { addAnswerOptions, addQuestion as addQuestionApi } from '../services/question.service';
import { AnswerOptionsType } from '../types/answerOptionsType';
import { getAiQuizzes } from '../services/quiz.service';
import { getCoursesByUserId } from '../services/course.service';
import { getChaptersByCourseId } from '../services/chapter.service';
import { AuthContext } from '../context/AuthContext';

const QaitCreateTest = () => {
  const { user } = useContext(AuthContext);
  
  const [courses, setCourses] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  
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
  const [aiDifficulty, setAiDifficulty] = useState(0); // 0 = mixed, 1 = easy, 2 = medium, 3 = hard
  const [aiAdditionalInstructions, setAiAdditionalInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      if (user?.userId) {
        try {
          const coursesData = await getCoursesByUserId(user.userId);
          setCourses(coursesData || []);
        } catch (error) {
          console.error('Error loading courses:', error);
        }
      }
    };
    loadCourses();
  }, [user]);

  useEffect(() => {
    const loadChapters = async () => {
      if (selectedCourse) {
        try {
          const chaptersData = await getChaptersByCourseId(selectedCourse);
          setChapters(chaptersData || []);
        } catch (error) {
          console.error('Error loading chapters:', error);
        }
      } else {
        setChapters([]);
        setSelectedChapter(null);
      }
    };
    loadChapters();
  }, [selectedCourse]);

  const handleCourseChange = (courseId: number) => {
    setSelectedCourse(courseId);
    const course = courses.find(c => c.courseId === courseId || c.CourseId === courseId);
    if (course) {
      setTestData(prev => ({ 
        ...prev, 
        subject: course.courseName || course.CourseName || '' 
      }));
    }
  };

  const handleChapterChange = (chapterId: number) => {
    setSelectedChapter(chapterId);
  };

  // פונקציה לייצור שאלות באמצעות AI
  const generateQuestionsWithAI = async () => {
    if (aiFiles.length === 0) {
      alert("אנא העלה קובץ תחילה");
      return;
    }

    try {
      setIsGenerating(true);
      
      const response = await getAiQuizzes(aiFiles[0], numQuestions, aiDifficulty, aiAdditionalInstructions);
      
      if (!response || !response.questions) {
        throw new Error("לא התקבלו נתונים תקינים מה-AI");
      }

      // עדכון כותרת המבחן
      if (response.quizTitle) {
        setTestData(prev => ({ ...prev, title: response.quizTitle }));
      }

      const charToIndex: Record<string, number> = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
      
      const levelToDifficulty: Record<number, string> = {
        1: 'קל',
        2: 'בינוני',
        3: 'קשה'
      };

      const aiGeneratedQuestions = response.questions.map((aiQ: any, index: number) => ({
        id: Date.now() + index,
        question: aiQ.questionText,
        answers: aiQ.options.map((opt: any) => opt.optionText),
        correctAnswer: charToIndex[aiQ.correctAnswerId] || 0,
        difficulty: levelToDifficulty[aiQ.level] || 'בינוני',
        points: 1
      }));

      // הוספה לשאלות הקיימות
      setQuestions(prev => {
        const existing = prev.filter(q => q.question.trim() !== '');
        return [...existing, ...aiGeneratedQuestions];
      });
      
      setShowAiPanel(false);
      setAiFiles([]);
      alert(`🎉 נוצרו ${aiGeneratedQuestions.length} שאלות מהקובץ: ${aiFiles[0].name}`);

    } catch (error) {
      console.error('AI Generation failed:', error);
      alert('שגיאה בתקשורת עם השרת. וודא שהקובץ תקין והשרת זמין.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveTest = async () => {
    if (!selectedChapter) {
      alert('יש לבחור פרק לפני שמירת המבחן');
      return;
    }

    const validQuestions = questions.filter((q) => q.question.trim().length > 0);
    if (validQuestions.length === 0) {
      alert('יש להוסיף לפחות שאלה אחת');
      return;
    }

    try {
      const difficultyToLevel: Record<string, 1 | 2 | 3> = {
        'קל': 1,
        'בינוני': 2,
        'קשה': 3,
      };

      for (const questionItem of validQuestions) {
        const questionPayload: QuestionType = {
          QuestionId: 0,
          Questions: questionItem.question,
          Level: difficultyToLevel[questionItem.difficulty] ?? 2,
          ChapterId: selectedChapter,
        };

        const createdQuestion = await addQuestionApi(questionPayload);
        const createdQuestionId = createdQuestion?.questionId || createdQuestion?.id;

        if (!createdQuestionId) continue;

        for (let i = 0; i < questionItem.answers.length; i++) {
          const optionText = questionItem.answers[i]?.trim();
          if (!optionText) continue;

          const optionPayload: AnswerOptionsType = {
            AnswerOptionsId: 0,
            QuestionId: Number(createdQuestionId),
            Option: optionText,
            IsCorrect: questionItem.correctAnswer === i,
            Description: '',
          };

          await addAnswerOptions(optionPayload);
        }
      }

      alert('המבחן נשמר בהצלחה!');
      // Reset form
      setQuestions([{
        id: 1,
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: 0,
        difficulty: 'בינוני',
        points: 1
      }]);
      setTestData({
        title: '',
        subject: '',
        description: '',
        duration: 45,
        scheduledDate: '',
        scheduledTime: '',
        classes: [],
        passingGrade: 60
      });
      setSelectedCourse(null);
      setSelectedChapter(null);
      setChapters([]);
    } catch (error) {
      console.error('Failed saving test', error);
      alert('שמירת המבחן נכשלה');
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      id: Date.now(),
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: 0,
      difficulty: 'בינוני',
      points: 1
    }]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateAnswer = (questionId: number, answerIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newAnswers = [...q.answers];
        newAnswers[answerIndex] = value;
        return { ...q, answers: newAnswers };
      }
      return q;
    }));
  };

  const handleFileUpload = (e: any) => {
    const files = Array.from(e.target.files);
    setAiFiles([...aiFiles, ...files] as any);
  };

  const removeFile = (index: number) => {
    setAiFiles(aiFiles.filter((_, i) => i !== index));
  };

  const totalPoints = questions.reduce((sum, q) => sum + parseInt(q.points as any || 0), 0);

  return (
    <div style={styles.container} dir="rtl">
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>יצירת מבחן חדש</h1>
          <p style={styles.subtitle}>צור מבחן מותאם אישית לתלמידים שלך</p>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.saveButton} onClick={saveTest}><Save size={18} /> שמור מבחן</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}><Settings size={20} /> הגדרות מבחן</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>שם המבחן</label>
              <input type="text" value={testData.title} onChange={(e) => setTestData({...testData, title: e.target.value})} style={styles.input} placeholder="הזן שם למבחן" />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>קורס</label>
              <select 
                value={selectedCourse || ''} 
                onChange={(e) => handleCourseChange(Number(e.target.value))} 
                style={styles.select}
              >
                <option value="">בחר קורס</option>
                {courses.map(course => (
                  <option key={course.courseId || course.CourseId} value={course.courseId || course.CourseId}>
                    {course.courseName || course.CourseName}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>פרק</label>
              <select 
                value={selectedChapter || ''} 
                onChange={(e) => handleChapterChange(Number(e.target.value))}
                style={styles.select}
                disabled={!selectedCourse}
              >
                <option value="">בחר פרק</option>
                {chapters.map(chapter => (
                  <option key={chapter.chapterId || chapter.ChapterId} value={chapter.chapterId || chapter.ChapterId}>
                    {chapter.name || chapter.Name}
                  </option>
                ))}
              </select>
              {selectedCourse && chapters.length === 0 && (
                <p style={styles.noChapters}>אין פרקים בקורס זה</p>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>משך זמן (דקות)</label>
              <input type="number" value={testData.duration} onChange={(e) => setTestData({...testData, duration: Number(e.target.value)})} style={styles.input} />
            </div>
          </div>

          <div style={styles.summaryCard}>
            <h4 style={styles.summaryTitle}>סיכום</h4>
            <div style={styles.summaryItem}><span>שאלות:</span><span style={styles.summaryValue}>{questions.filter(q => q.question.trim()).length}</span></div>
            <div style={styles.summaryItem}><span>נקודות:</span><span style={styles.summaryValue}>{totalPoints}</span></div>
            {selectedChapter && (
              <div style={styles.summaryItem}><span>פרק:</span><span style={styles.summaryValueSelected}>נבחר ✓</span></div>
            )}
          </div>
        </div>

        <div style={styles.questionsContainer}>
          <div style={styles.questionsHeader}>
            <h2 style={styles.questionsTitle}>שאלות</h2>
            <div style={styles.headerButtons}>
              <button style={styles.aiButton} onClick={() => setShowAiPanel(!showAiPanel)}>
                <Sparkles size={18} /> צור שאלות עם AI
              </button>
              <button style={styles.addQuestionButton} onClick={addQuestion}>
                <Plus size={18} /> הוסף שאלה
              </button>
            </div>
          </div>

          {showAiPanel && (
            <div style={styles.aiPanel}>
              <div style={styles.aiPanelHeader}>
                <div style={styles.aiPanelTitle}>
                  <Sparkles size={24} style={{color: '#8b5cf6'}} />
                  <div>
                    <h3 style={styles.aiTitle}>מחולל שאלות AI</h3>
                    <p style={styles.aiSubtitle}>העלה קובץ וה-AI יבנה את השאלות עבורך</p>
                  </div>
                </div>
                <button style={styles.closeButton} onClick={() => setShowAiPanel(false)}><X size={20} /></button>
              </div>

              <div style={styles.aiPanelContent}>
                <label style={styles.uploadArea}>
                  <input type="file" multiple onChange={handleFileUpload} style={{display: 'none'}} />
                  <Upload size={32} style={{color: '#8b5cf6'}} />
                  <span style={styles.uploadTitle}>לחץ להעלאת חומר לימודי</span>
                </label>

                {aiFiles.length > 0 && (
                  <div style={styles.filesList}>
                    {aiFiles.map((f: any, i) => (
                      <div key={i} style={styles.fileItem}>
                        <FileText size={18} style={{color: '#8b5cf6'}} />
                        <span style={styles.fileName}>{f.name}</span>
                        <button onClick={() => removeFile(i)} style={styles.removeFileButton}><X size={16} /></button>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                  <div>
                    <label style={{ ...styles.label, marginBottom: '6px' }}>מספר שאלות</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="50"
                      value={numQuestions} 
                      onChange={(e) => setNumQuestions(Number(e.target.value))} 
                      style={styles.input} 
                    />
                  </div>
                  <div>
                    <label style={{ ...styles.label, marginBottom: '6px' }}>רמת קושי</label>
                    <select 
                      value={aiDifficulty} 
                      onChange={(e) => setAiDifficulty(Number(e.target.value))} 
                      style={styles.select}
                    >
                      <option value={0}>מעורבב</option>
                      <option value={1}>קל</option>
                      <option value={2}>בינוני</option>
                      <option value={3}>קשה</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <label style={{ ...styles.label, marginBottom: '6px' }}>הנחיות נוספות (אופציונלי)</label>
                  <textarea 
                    value={aiAdditionalInstructions} 
                    onChange={(e) => setAiAdditionalInstructions(e.target.value)} 
                    style={{ ...styles.textarea, minHeight: '60px' }}
                    placeholder="לדוגמה: התמקד בהגדרות ומושגים..."
                  />
                </div>

                <button 
                  style={{...styles.generateButton, opacity: isGenerating ? 0.7 : 1}} 
                  onClick={generateQuestionsWithAI}
                  disabled={isGenerating || aiFiles.length === 0}
                >
                  {isGenerating ? 'מייצר שאלות...' : `צור ${numQuestions} שאלות`}
                </button>
              </div>
            </div>
          )}

          <div style={styles.questionsList}>
            {questions.map((q, index) => (
              <div key={q.id} style={styles.questionCard}>
                <div style={styles.questionCardHeader}>
                  <div style={styles.questionNumber}>שאלה {index + 1}</div>
                  <button style={styles.deleteButton} onClick={() => removeQuestion(q.id)}><Trash2 size={18} /></button>
                </div>
                <div style={styles.questionForm}>
                  <textarea 
                    placeholder="כתוב את השאלה..." 
                    value={q.question} 
                    onChange={(e) => updateQuestion(q.id, 'question', e.target.value)} 
                    style={styles.textarea} 
                  />
                  <div style={styles.answersSection}>
                    {q.answers.map((ans, i) => (
                      <div key={i} style={styles.answerRow}>
                        <input 
                          type="radio" 
                          checked={q.correctAnswer === i} 
                          onChange={() => updateQuestion(q.id, 'correctAnswer', i)} 
                          name={`correct-${q.id}`}
                        />
                        <input 
                          type="text" 
                          value={ans} 
                          onChange={(e) => updateAnswer(q.id, i, e.target.value)} 
                          style={styles.answerInput} 
                          placeholder={`תשובה ${i+1}`} 
                        />
                      </div>
                    ))}
                  </div>
                  <div style={styles.difficultyRow}>
                    <label style={styles.difficultyLabel}>רמת קושי:</label>
                    <select 
                      value={q.difficulty}
                      onChange={(e) => updateQuestion(q.id, 'difficulty', e.target.value)}
                      style={styles.difficultySelect}
                    >
                      <option value="קל">קל</option>
                      <option value="בינוני">בינוני</option>
                      <option value="קשה">קשה</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', overflowY: 'auto', padding: '32px', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'Assistant, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  title: { fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' },
  subtitle: { fontSize: '16px', color: '#6b7280' },
  headerActions: { display: 'flex', gap: '12px' },
  previewButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '8px', color: '#6b7280', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  saveButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  mainContent: { display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: '24px' },
  sidebarSection: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  sidebarTitle: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' },
  input: { width: '100%', padding: '10px 12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none' },
  select: { width: '100%', padding: '10px 12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', backgroundColor: 'white' },
  textarea: { width: '100%', padding: '10px 12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '80px' },
  summaryCard: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  summaryTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' },
  summaryItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e5e7eb' },
  summaryValue: { fontWeight: 'bold', color: '#14b8a6' },
  summaryValueSelected: { fontWeight: 'bold', color: '#22c55e' },
  questionsContainer: { display: 'flex', flexDirection: 'column', gap: '16px' },
  questionsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  questionsTitle: { fontSize: '24px', fontWeight: 'bold', color: '#1f2937' },
  headerButtons: { display: 'flex', gap: '12px' },
  aiButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '600', cursor: 'pointer' },
  addQuestionButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '600', cursor: 'pointer' },
  questionCard: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  questionCardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  questionNumber: { fontWeight: 'bold', color: '#14b8a6' },
  deleteButton: { color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' },
  questionForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
  answersSection: { display: 'flex', flexDirection: 'column', gap: '8px' },
  answerRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  answerInput: { flex: 1, padding: '10px 12px', border: '2px solid #e5e7eb', borderRadius: '8px' },
  difficultyRow: { display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' },
  difficultyLabel: { fontSize: '14px', color: '#6b7280' },
  difficultySelect: { padding: '8px 12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
  aiPanel: { backgroundColor: '#faf5ff', border: '2px solid #e9d5ff', borderRadius: '12px', padding: '24px', marginBottom: '24px' },
  aiPanelHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '24px' },
  aiPanelTitle: { display: 'flex', gap: '16px' },
  aiTitle: { fontSize: '18px', fontWeight: 'bold' },
  aiSubtitle: { fontSize: '14px', color: '#6b7280' },
  uploadArea: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px', border: '2px dashed #c4b5fd', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer' },
  uploadTitle: { fontSize: '16px', fontWeight: '600', marginTop: '12px' },
  filesList: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' },
  fileItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'white', border: '1px solid #e9d5ff', borderRadius: '8px' },
  fileName: { flex: 1, fontSize: '14px' },
  removeFileButton: { color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' },
  generateButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 24px', background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%', marginTop: '16px' },
  closeButton: { background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' },
  noChapters: { fontSize: '12px', color: '#ef4444', marginTop: '4px' }
};

export default QaitCreateTest;
