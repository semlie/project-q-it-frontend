import React, { useEffect, useMemo, useState, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ArrowRight, BookOpen, CheckCircle2, ClipboardList } from 'lucide-react';
import { getChaptersByCourseId } from '../services/chapter.service';
import { Paths } from '../routes/paths';
import { AuthContext } from '../context/AuthContext';

type DifficultyLevel = 'מעורבב' | 'קל' | 'בינוני' | 'קשה';

interface AnswerItem {
  question: string;
  yourAnswer: string;
  isCorrect: boolean;
}

interface DifficultyTestCard {
  level: DifficultyLevel;
  questionCount: number;
  isDone: boolean;
  answeredCount: number;
  answers: AnswerItem[];
}

interface ChapterLocationState {
  chapter?: {
    id: number;
    title: string;
    isCompleted: boolean;
  };
  courseName?: string;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: '#f9fafb',
    padding: '32px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  content: {
    maxWidth: '980px',
    margin: '0 auto',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    backgroundColor: 'white',
    color: '#374151',
    cursor: 'pointer',
    fontWeight: 600,
    marginBottom: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '30px',
    color: '#111827',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  subtitle: {
    marginTop: '10px',
    color: '#6b7280',
    fontSize: '15px',
  },
  section: {
    marginTop: '22px',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: '#f8fafc',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '18px',
    color: '#111827',
    fontWeight: 700,
  },
  sectionText: {
    marginTop: '8px',
    color: '#4b5563',
    lineHeight: 1.7,
  },
  statusDone: {
    marginTop: '10px',
    color: '#059669',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusOpen: {
    marginTop: '10px',
    color: '#d97706',
    fontWeight: 700,
  },
  testsSection: {
    marginTop: '24px',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: 'white',
  },
  testsTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 800,
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  testsSubtitle: {
    marginTop: '8px',
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '16px',
  },
  testsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '12px',
  },
  testCard: {
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '14px',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  testLevel: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 800,
    color: '#111827',
  },
  testMeta: {
    fontSize: '14px',
    color: '#4b5563',
  },
  testDone: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#059669',
  },
  testOpen: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#d97706',
  },
  answersBtn: {
    marginTop: 'auto',
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid #14b8a6',
    backgroundColor: '#f0fdfa',
    color: '#0f766e',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '13px',
  },
  enterExamBtn: {
    marginTop: '4px',
    padding: '8px 10px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)',
    color: 'white',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '13px',
  },
  enterExamBtnDisabled: {
    marginTop: '4px',
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
    fontWeight: 700,
    cursor: 'not-allowed',
    fontSize: '13px',
  },
  answersPanel: {
    marginTop: '16px',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    backgroundColor: '#f8fafc',
  },
  answersTitle: {
    margin: 0,
    fontSize: '15px',
    fontWeight: 800,
    color: '#111827',
    marginBottom: '10px',
  },
  answerItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 10px',
    borderRadius: '8px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    marginBottom: '8px',
  },
  answerQuestion: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: 600,
  },
  answerMeta: {
    fontSize: '13px',
    color: '#4b5563',
  },
  answerCorrect: {
    fontSize: '12px',
    fontWeight: 800,
    color: '#059669',
  },
  answerWrong: {
    fontSize: '12px',
    fontWeight: 800,
    color: '#dc2626',
  },
};

function asNumber(value: any, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function pickByKeys(source: any, keys: string[]) {
  for (const key of keys) {
    if (source && source[key] !== undefined && source[key] !== null) {
      return source[key];
    }
  }
  return undefined;
}

function fallbackTests(): DifficultyTestCard[] {
  return [
    {
      level: 'מעורבב',
      questionCount: 12,
      isDone: false,
      answeredCount: 0,
      answers: [],
    },
    {
      level: 'קל',
      questionCount: 8,
      isDone: true,
      answeredCount: 8,
      answers: [
        { question: 'שאלה 1', yourAnswer: 'א', isCorrect: true },
        { question: 'שאלה 2', yourAnswer: 'ג', isCorrect: false },
      ],
    },
    {
      level: 'בינוני',
      questionCount: 10,
      isDone: false,
      answeredCount: 0,
      answers: [],
    },
    {
      level: 'קשה',
      questionCount: 6,
      isDone: false,
      answeredCount: 0,
      answers: [],
    },
  ];
}

function buildTestsByDifficulty(chapterRaw: any): DifficultyTestCard[] {
  if (!chapterRaw || typeof chapterRaw !== 'object') {
    return fallbackTests();
  }

  const defs: Array<{ level: DifficultyLevel; prefix: string }> = [
    { level: 'מעורבב', prefix: 'mixed' },
    { level: 'קל', prefix: 'easy' },
    { level: 'בינוני', prefix: 'medium' },
    { level: 'קשה', prefix: 'hard' },
  ];

  const cards = defs.map(({ level, prefix }) => {
    const questionCount = asNumber(
      pickByKeys(chapterRaw, [`${prefix}QuestionsCount`, `${prefix}QuestionCount`, `${prefix}Questions`, `${prefix}Count`]),
      0,
    );

    const answeredCount = asNumber(
      pickByKeys(chapterRaw, [`${prefix}AnsweredCount`, `${prefix}AnswersCount`]),
      0,
    );

    const rawDone = pickByKeys(chapterRaw, [`${prefix}Done`, `${prefix}IsDone`, `${prefix}Completed`]);
    const rawAnswers = pickByKeys(chapterRaw, [`${prefix}Answers`, `${prefix}AnsweredQuestions`, `${prefix}UserAnswers`]);

    const answers: AnswerItem[] = Array.isArray(rawAnswers)
      ? rawAnswers.map((item: any, index: number) => ({
          question: item.question || item.questionText || `שאלה ${index + 1}`,
          yourAnswer: item.yourAnswer || item.answer || item.selectedOption || '—',
          isCorrect: Boolean(item.isCorrect ?? item.correct ?? false),
        }))
      : [];

    const isDone =
      typeof rawDone === 'boolean'
        ? rawDone
        : answers.length > 0
          ? true
          : answeredCount > 0 && questionCount > 0
            ? answeredCount >= questionCount
            : false;

    return {
      level,
      questionCount,
      answeredCount: answeredCount || answers.length,
      isDone,
      answers,
    };
  });

  const hasAnyData = cards.some((card) => card.questionCount > 0 || card.answers.length > 0 || card.isDone);
  return hasAnyData ? cards : fallbackTests();
}

export default function QaitCourseChapterPage() {
  const [chapterRaw, setChapterRaw] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);

  const navigate = useNavigate();
  const { chapterId, courseId } = useParams();
  const location = useLocation();
  const state = (location.state as ChapterLocationState | null) || null;

  useEffect(() => {
    const loadChapter = async () => {
      if (!courseId) return;

      try {
        const data = await getChaptersByCourseId(Number(courseId));
        if (Array.isArray(data)) {
          const found = data.find((item) => String(item.chapterId || item.id) === String(chapterId));
          if (found) {
            setChapterRaw(found);
          }
        }
      } catch (error) {
        console.error('Failed loading chapter details', error);
      }
    };

    loadChapter();
  }, [chapterId, courseId]);

  const testsByDifficulty = useMemo(() => buildTestsByDifficulty(chapterRaw), [chapterRaw]);
  const selectedTest = testsByDifficulty.find((test) => test.level === selectedLevel) || null;

  const chapterTitle = state?.chapter?.title || chapterRaw?.chapterName || chapterRaw?.title || `פרק ${chapterId}`;
  const chapterDescription =
    chapterRaw?.chapterDescription ||
    chapterRaw?.description ||
    chapterRaw?.summary ||
    'כאן יוצגו חומרי הפרק והתרגול לפי רמות קושי.';
  const isCompleted = Boolean(state?.chapter?.isCompleted ?? chapterRaw?.isCompleted ?? false);
  const courseName = state?.courseName || 'הקורס';

  return (
    <div style={styles.container} dir="rtl">
      <div style={styles.content}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowRight size={18} />
          חזרה לפרטי הקורס
        </button>

        <div style={styles.card}>
          <h1 style={styles.title}>
            <BookOpen size={28} /> {chapterTitle}
          </h1>
          <p style={styles.subtitle}>קורס: {courseName}</p>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>תוכן הפרק</h2>
            <p style={styles.sectionText}>{chapterDescription}</p>
            {isCompleted ? (
              <div style={styles.statusDone}>
                <CheckCircle2 size={16} /> פרק זה כבר הושלם
              </div>
            ) : (
              <div style={styles.statusOpen}>פרק זה פתוח ללמידה</div>
            )}
          </div>

          <div style={styles.testsSection}>
            <h2 style={styles.testsTitle}>
              <ClipboardList size={20} /> מבחנים לפי רמה
            </h2>
            <div style={styles.testsSubtitle}>בחר מבחן: מעורבב / קל / בינוני / קשה</div>
            <div style={styles.testsGrid}>
              {testsByDifficulty.map((test) => (
                <div key={test.level} style={styles.testCard}>
                  <h3 style={styles.testLevel}>{test.level}</h3>
                  <div style={styles.testMeta}>כמות שאלות: {test.questionCount}</div>
                  <div style={styles.testMeta}>נענו: {test.answeredCount}</div>
                  <div style={test.isDone ? styles.testDone : styles.testOpen}>
                    {test.isDone ? 'בוצע ✅' : 'לא בוצע'}
                  </div>

                  <button
                    type="button"
                    style={test.questionCount > 0 ? styles.enterExamBtn : styles.enterExamBtnDisabled}
                    disabled={test.questionCount === 0}
                    onClick={() => {
                      if (test.questionCount > 0 && chapterId) {
                        navigate(`/${Paths.takeTest.replace(':chapterId', chapterId)}`);
                      }
                    }}
                  >
                    כניסה למבחן
                  </button>

                  {test.isDone && (
                    <button type="button" style={styles.answersBtn} onClick={() => setSelectedLevel(test.level)}>
                      צפייה בתשובות שעניתי
                    </button>
                  )}
                </div>
              ))}
            </div>

            {selectedTest && selectedTest.isDone && (
              <div style={styles.answersPanel}>
                <h4 style={styles.answersTitle}>תשובות - רמה {selectedTest.level}</h4>

                {selectedTest.answers.length === 0 && (
                  <div style={styles.answerMeta}>אין פירוט תשובות זמין, אך המבחן מסומן כבוצע.</div>
                )}

                {selectedTest.answers.map((answer, index) => (
                  <div key={index} style={styles.answerItem}>
                    <div>
                      <div style={styles.answerQuestion}>{answer.question}</div>
                      <div style={styles.answerMeta}>תשובתך: {answer.yourAnswer}</div>
                    </div>
                    <div style={answer.isCorrect ? styles.answerCorrect : styles.answerWrong}>
                      {answer.isCorrect ? 'נכון' : 'שגוי'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
