import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ArrowRight, BookOpen, Clock, Download, FileText, GraduationCap, ListChecks, Search, Trophy, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCoursesByIdUser } from '../services/course.service';
import { Course } from './components/types';
import { Paths } from '../routes/paths';
import { getChaptersByCourseId } from '../services/chapter.service';
import { getMaterialsByIdCourse } from '../services/materials.service';
import './courseDetails.css';

interface ChapterItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface CourseLocationState {
  course?: Course;
}

interface MaterialItem {
  id: number;
  name: string;
  description?: string;
  type: string;
  url: string | null;
}

function normalizeCourse(course: any): Course {
  return {
    id: course.courseId || course.id || 0,
    name: course.courseName || course.name || 'ללא שם',
    teacher: course.teacherName || course.teacher || 'לא צוין',
    description: course.description || course.courseName || 'אין תיאור',
    color: course.color || '#14b8a6',
    icon: course.icon || '📚',
    progress: course.progress || 0,
    chapters: course.chapters || 0,
    completedChapters: course.completedChapters || 0,
    students: course.students || 0,
    averageGrade: course.averageGrade || 0,
    materials: course.materials || 0,
    tests: course.tests || 0,
    upcomingTest: course.upcomingTest || null,
  };
}

async function buildChapters(course: Course): Promise<ChapterItem[]> {
  try {
    const data = await getChaptersByCourseId(course.id);

    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any, index: number) => ({
        id: item.chapterId || item.id || index + 1,
        title: item.chapterName || item.name || item.title || `פרק ${index + 1}`,
        isCompleted: Boolean(item.isCompleted ?? item.completed ?? false),
      }));
    }
  } catch {
  }

  const chapterCount = course.chapters || 0;
  const completed = Math.min(course.completedChapters || 0, chapterCount);

  return Array.from({ length: chapterCount }, (_, index) => {
    const chapterNumber = index + 1;
    return {
      id: chapterNumber,
      title: `פרק ${chapterNumber}`,
      isCompleted: chapterNumber <= completed,
    };
  });
}

function buildMaterials(source?: any): MaterialItem[] {
  const rawMaterials =
    (Array.isArray(source) ? source : null) ||
    source?.materialsList ||
    source?.materialItems ||
    source?.materialsFiles ||
    source?.materials;

  const resolveTypeFromUrl = (rawUrl?: string | null): string => {
    if (!rawUrl) return 'קובץ';
    const cleanUrl = rawUrl.split('?')[0].split('#')[0];
    const extension = cleanUrl.includes('.') ? cleanUrl.split('.').pop() : '';
    if (!extension) return 'קובץ';
    return extension.toUpperCase();
  };

  if (Array.isArray(rawMaterials) && rawMaterials.length > 0) {
    return rawMaterials.map((item: any, index: number) => ({
      id: item.id || item.matId || index + 1,
      name: item.name || item.fileName || item.title || item.matName || `חומר ${index + 1}`,
      description: item.description || item.matDescription || item.desc || '',
      type: item.type || item.fileType || item.matType || resolveTypeFromUrl(item.matLink || item.url || item.fileUrl || item.downloadUrl || item.link),
      url: item.url || item.fileUrl || item.downloadUrl || item.link || item.matLink || null,
    }));
  }

  return [];
}

function openMaterial(materialId?: number, rawUrl?: string | null) {
  if (typeof materialId === 'number' && Number.isFinite(materialId) && materialId > 0) {
    const downloadUrl = `http://localhost:5000/api/Materials/${materialId}/download`;
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  if (rawUrl) {
    const fallbackUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? rawUrl : `http://localhost:5000/${rawUrl.replace(/^\/+/, '')}`;
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
  }
}

function getMaterialTypeColor(type: string): string {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes('pdf')) return '#ef4444';
  if (normalizedType.includes('doc') || normalizedType.includes('word')) return '#2563eb';
  if (normalizedType.includes('ppt') || normalizedType.includes('presentation')) return '#f59e0b';
  if (normalizedType.includes('xls') || normalizedType.includes('excel') || normalizedType.includes('csv')) return '#16a34a';
  if (normalizedType.includes('zip') || normalizedType.includes('rar') || normalizedType.includes('7z')) return '#7c3aed';
  return '#6b7280';
}

export default function QaitCourseDetailsPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const state = (location.state as CourseLocationState | null) || null;

  const [course, setCourse] = useState<Course | null>(state?.course ?? null);
  const [materialsSource, setMaterialsSource] = useState<any>(null);
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [loading, setLoading] = useState(!state?.course);
  const [chapterQuery, setChapterQuery] = useState('');
  const [chapterFilter, setChapterFilter] = useState<'all' | 'completed' | 'open'>('all');
  const [activeView, setActiveView] = useState<'chapters' | 'materials'>('chapters');

  useEffect(() => {
    const loadCourse = async () => {
      if (state?.course || !user || !courseId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getCoursesByIdUser(user.userId);
        if (Array.isArray(data)) {
          const foundRaw = data.find((item) => String(item.courseId || item.id) === String(courseId));
          setCourse(foundRaw ? normalizeCourse(foundRaw) : null);
        } else if (data && typeof data === 'object') {
          const normalizedSingle = normalizeCourse(data);
          setCourse(String(normalizedSingle.id) === String(courseId) ? normalizedSingle : null);
        } else {
          setCourse(null);
        }
      } catch (error) {
        console.error('Failed loading course details', error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, state?.course, user]);

  useEffect(() => {
    let isMounted = true;

    const loadChapters = async () => {
      if (!course) {
        if (isMounted) {
          setChapters([]);
        }
        return;
      }

      const chapterItems = await buildChapters(course);
      if (isMounted) {
        setChapters(chapterItems);
      }
    };

    loadChapters();

    return () => {
      isMounted = false;
    };
  }, [course]);

  useEffect(() => {
    let isMounted = true;

    const loadMaterials = async () => {
      if (!course?.id) {
        if (isMounted) {
          setMaterialsSource(null);
        }
        return;
      }

      try {
        const data = await getMaterialsByIdCourse(course.id);
        if (isMounted) {
          setMaterialsSource(data);
        }
      } catch (error) {
        console.error('Failed loading course materials', error);
        if (isMounted) {
          setMaterialsSource(null);
        }
      }
    };

    loadMaterials();

    return () => {
      isMounted = false;
    };
  }, [course?.id]);

  const materials = useMemo(() => buildMaterials(materialsSource), [materialsSource]);

  const filteredChapters = useMemo(() => {
    return chapters.filter((chapter: ChapterItem) => {
      const matchesQuery = chapter.title.toLowerCase().includes(chapterQuery.toLowerCase());
      const matchesFilter =
        chapterFilter === 'all' ||
        (chapterFilter === 'completed' && chapter.isCompleted) ||
        (chapterFilter === 'open' && !chapter.isCompleted);
      return matchesQuery && matchesFilter;
    });
  }, [chapters, chapterFilter, chapterQuery]);

  if (loading) {
    return (
      <div className="qcd-container" dir="rtl">
        <div className="qcd-content">
          <div className="qcd-empty-state">
            <h2 className="qcd-empty-title">טוען פרטי קורס...</h2>
            <p className="qcd-empty-text">אנא המתן רגע</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="qcd-container" dir="rtl">
        <div className="qcd-content">
          <div className="qcd-empty-state">
            <h2 className="qcd-empty-title">הקורס לא נמצא</h2>
            <p className="qcd-empty-text">לא הצלחנו למצוא את פרטי הקורס שביקשת.</p>
            <button className="qcd-back-button qcd-back-button--mt" onClick={() => navigate(-1)}>
              <ArrowRight size={18} />
              חזרה לקורסים
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qcd-container" dir="rtl">
      <div className="qcd-content">
        <div className="qcd-top-bar">
          <button className="qcd-back-button" onClick={() => navigate(-1)}>
            <ArrowRight size={18} />
            חזרה לקורסים
          </button>
        </div>

        <div className="qcd-header-card">
          <div className="qcd-header-top">
            <div className="qcd-title-row">
              <div className="qcd-course-icon" style={{ backgroundColor: course.color }}>{course.icon}</div>
              <div>
                <h1 className="qcd-title">{course.name}</h1>
                <p className="qcd-subtitle">מרצה: {course.teacher}</p>
              </div>
            </div>
          </div>

          <p className="qcd-description">{course.description}</p>

          <div className="qcd-stats-grid">
            <div className="qcd-stat-card">
              <div className="qcd-stat-header">
                <BookOpen size={16} /> פרקים
              </div>
              <div className="qcd-stat-value">{course.chapters || chapters.length}</div>
            </div>
            <div className="qcd-stat-card">
              <div className="qcd-stat-header">
                <ListChecks size={16} /> הושלמו
              </div>
              <div className="qcd-stat-value">{course.completedChapters}</div>
            </div>
            <div className="qcd-stat-card">
              <div className="qcd-stat-header">
                <FileText size={16} /> מבחנים
              </div>
              <div className="qcd-stat-value">{course.tests}</div>
            </div>
            <div className="qcd-stat-card">
              <div className="qcd-stat-header">
                <Trophy size={16} /> ממוצע
              </div>
              <div className="qcd-stat-value">{course.averageGrade}</div>
            </div>
            <div className="qcd-stat-card">
              <div className="qcd-stat-header">
                <FileText size={16} /> חומרים
              </div>
              <div className="qcd-stat-value">{course.materials}</div>
            </div>
          </div>
        </div>

        <div className="qcd-view-tabs-wrap">
          <button
            type="button"
            onClick={() => setActiveView('materials')}
            className={`qcd-view-tab ${activeView === 'materials' ? 'qcd-view-tab--active' : 'qcd-view-tab--inactive'}`}
          >
            <FileText size={34} />
            חומרי לימוד
          </button>
          <button
            type="button"
            onClick={() => setActiveView('chapters')}
            className={`qcd-view-tab ${activeView === 'chapters' ? 'qcd-view-tab--active' : 'qcd-view-tab--inactive'}`}
          >
            <BookOpen size={34} />
            פרקים
          </button>
        </div>

        {activeView === 'materials' && (
          <div className="qcd-section-card">
            <h2 className="qcd-section-title">
              <FileText size={24} /> חומרים שהמרצה העלה
            </h2>
            <p className="qcd-section-subtitle">כל החומרים הזמינים לקורס זה</p>

            <div className="qcd-materials-list">
              {materials.length === 0 && (
                <div className="qcd-empty-box">עדיין לא הועלו חומרים לקורס זה.</div>
              )}

              {materials.map((material) => (
                <div key={material.id} className="qcd-material-item">
                  <div className="qcd-material-main">
                    <div className="qcd-material-name-row">
                      <FileText size={18} color={getMaterialTypeColor(material.type)} className="qcd-material-type-icon" />
                      <span className="qcd-material-name">{material.name}</span>
                      {material.description && <span className="qcd-material-description">{material.description}</span>}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={material.id ? 'qcd-material-btn' : 'qcd-material-btn-disabled'}
                    disabled={!material.id}
                    onClick={() => openMaterial(material.id, material.url)}
                  >
                    <Download size={14} /> {material.id ? 'צפייה' : 'לא זמין'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'chapters' && (
          <>
            <div className="qcd-section-spacer" />

            <div className="qcd-section-card">
              <h2 className="qcd-section-title">
                <BookOpen size={24} /> כל פרקי הקורס
              </h2>
              <p className="qcd-section-subtitle">רשימת הפרקים לפי סדר הלמידה</p>
              <div className="qcd-chapter-controls">
                <div className="qcd-chapter-search-wrap">
                  <Search size={16} className="qcd-chapter-search-icon" />
                  <input
                    type="text"
                    value={chapterQuery}
                    onChange={(e) => setChapterQuery(e.target.value)}
                    placeholder="חיפוש פרק..."
                    className="qcd-chapter-search-input"
                  />
                </div>
                <select
                  value={chapterFilter}
                  onChange={(e) => setChapterFilter(e.target.value as 'all' | 'completed' | 'open')}
                  className="qcd-chapter-filter"
                >
                  <option value="all">כל הפרקים</option>
                  <option value="completed">הושלמו</option>
                  <option value="open">פתוחים</option>
                </select>
              </div>
              <div className="qcd-chapter-list">
                {filteredChapters.length === 0 && (
                  <div className="qcd-empty-box">לא נמצאו פרקים תואמים לסינון/חיפוש.</div>
                )}
                {filteredChapters.map((chapter: ChapterItem) => (
                  <div key={chapter.id} className="qcd-chapter-item">
                    <div className="qcd-chapter-main">
                      <div className="qcd-chapter-id">{chapter.id}</div>
                      <span className="qcd-chapter-title">{chapter.title}</span>
                    </div>

                    <div className="qcd-chapter-actions">
                      <span className={chapter.isCompleted ? 'qcd-chapter-status-done' : 'qcd-chapter-status-open'}>
                        {chapter.isCompleted ? 'הושלם' : 'פתוח ללמידה'}
                      </span>
                      <button
                        type="button"
                        className="qcd-chapter-start-btn"
                        onClick={() =>
                          navigate(`/${Paths.courseChapter.replace(':courseId', String(course.id)).replace(':chapterId', String(chapter.id))}`, {
                            state: { chapter, courseName: course.name },
                          })
                        }
                      >
                        התחל פרק
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}