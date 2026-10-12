import React, { useState, useEffect } from 'react';
import { assetPath } from '../../utils/assetPath';
import {
  GraduationCap,
  BookOpen,
  Play,
  FileText,
  FileCode,
  Calendar,
  CreditCard,
  Bell,
  User,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Upload,
  AlertCircle,
  Download,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { storageService, subscribeToDataChanges } from '../../services/storage';
import {
  Course,
  CourseModule,
  Enrollment,
  ClassSchedule,
  StudentPaymentRecord,
  Assignment,
  Lesson
} from '../../types';
import { PopupModal } from '../common/PopupModal';

export const StudentPortal: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'my-courses' | 'learning' | 'assignments' | 'schedule' | 'payments' | 'notifications' | 'profile'
  >('dashboard');

  // Selected course for the Learning page
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('les-102');

  // Real-time state
  const [student, setStudent] = useState(user ? storageService.getStudentById(user.id) : undefined);
  const [courses, setCourses] = useState(storageService.getCourses());
  const [enrollments, setEnrollments] = useState(storageService.getEnrollments());
  const [schedules, setSchedules] = useState(storageService.getSchedules());
  const [paymentRecords, setPaymentRecords] = useState(storageService.getPaymentRecords());
  const [assignments, setAssignments] = useState(storageService.getAssignments());
  const [notifications, setNotifications] = useState(storageService.getNotifications());

  useEffect(() => {
    const unsub = subscribeToDataChanges(() => {
      if (user) {
        setStudent(storageService.getStudentById(user.id));
      }
      setCourses(storageService.getCourses());
      setEnrollments(storageService.getEnrollments());
      setSchedules(storageService.getSchedules());
      setPaymentRecords(storageService.getPaymentRecords());
      setAssignments(storageService.getAssignments());
      setNotifications(storageService.getNotifications());
    });
    return unsub;
  }, [user]);

  // Student specific data
  const studentEnrollments = enrollments.filter(
    (e) => e.studentId === student?.id || (student && e.studentId === 'std-1')
  );

  const activeEnrollment = studentEnrollments.find((e) => e.courseId === selectedCourseId) || studentEnrollments[0];
  const activeCourse = courses.find((c) => c.id === (activeEnrollment?.courseId || selectedCourseId)) || courses[0];

  const modules = storageService.getModulesForCourse(activeCourse.id);
  const allLessons = modules.flatMap((m) => m.lessons);
  const currentLesson: Lesson = allLessons.find((l) => l.id === selectedLessonId) || allLessons[0] || {
    id: 'les-default',
    moduleId: 'mod-1',
    title: 'Welcome to Advanced RTL Design',
    type: 'text',
    durationMinutes: 15,
    isPublicPreview: true,
    sortOrder: 1,
    textContent: 'Welcome to Design Silicon VLSI Classroom.'
  };

  const studentPayment = paymentRecords.find(
    (p) => p.studentId === student?.id || (student && p.studentId === 'std-1')
  );

  const studentNotifs = notifications.filter(
    (n) => n.recipientRole === 'student' || n.recipientRole === 'all'
  );

  // Lesson Completion Action
  const handleMarkComplete = () => {
    if (!student || !currentLesson) return;
    storageService.markLessonComplete(student.id, activeCourse.id, currentLesson.id);
    showToast(`Marked "${currentLesson.title}" as completed!`, 'success');
  };

  // Lesson Navigation
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      setSelectedLessonId(allLessons[currentIndex + 1].id);
    }
  };
  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      setSelectedLessonId(allLessons[currentIndex - 1].id);
    }
  };

  // Assignment file submission simulation
  const handleAssignmentUpload = (asgId: string) => {
    const filename = `student_${student?.name?.toLowerCase().replace(/\s+/g, '_')}_solution.v`;
    storageService.submitAssignment(asgId, student?.id || 'std-1', student?.name || 'Rahul Verma', filename);
    showToast(`Uploaded ${filename} successfully!`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col pb-16 lg:pb-0">
      {/* Top Learner Navigation Bar */}
      <div className="bg-slate-900 border-b border-sky-500/20 px-4 sm:px-6 lg:px-8 py-3.5 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 rounded-xl bg-slate-950 border border-sky-500/40 overflow-hidden shrink-0">
                <img
                  src={assetPath('/images/dsv-badge-dark.jpg')}
                  alt="DSV Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>DESIGN SILICON</span>
                  <span className="text-cyan-400 font-mono text-xs">VLSI</span>
                </span>
                <span className="text-[10px] text-cyan-300 font-mono block">
                  STUDENT LEARNING WORKSPACE
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation Pill Bar (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
              { id: 'my-courses', label: 'My Courses', icon: BookOpen },
              { id: 'learning', label: 'E-Learning', icon: Play },
              { id: 'assignments', label: 'Assignments', icon: FileText },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'profile', label: 'Profile', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Status / Back & Logout */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{student?.name || user?.name || 'Rahul Verma'}</div>
              <div className="text-[10px] text-cyan-400 font-mono">
                {student?.batchId || 'Batch #28 (RTL)'}
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-rose-400/50 text-slate-300 hover:text-rose-300 text-xs font-semibold transition shadow-sm"
              title="Sign Out of Student Portal"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Student Workspace Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* ======================= 1. DASHBOARD TAB ======================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Welcome Banner */}
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-sky-950 via-slate-900 to-cyan-950/80 border border-sky-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ENROLLED COHORT: BATCH #28</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome Back, {student?.name || 'Rahul Verma'}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  You are making strong progress in{' '}
                  <strong className="text-cyan-300">{activeCourse.title}</strong>. Your next live
                  lab on Gray-coded asynchronous FIFOs is scheduled for this Saturday.
                </p>
              </div>

              <div className="flex items-center gap-3 relative z-10 shrink-0">
                <button
                  onClick={() => setActiveTab('learning')}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Continue Learning</span>
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Active Courses</div>
                <div className="text-2xl font-black text-cyan-400 mt-1">
                  {studentEnrollments.length || 1}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Enrolled Programs</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Course Progress</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {activeEnrollment?.progressPercent || 42}%
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Modules Completed</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Assignments</div>
                <div className="text-2xl font-black text-amber-400 mt-1">1/2</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Scored 94/100</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Upcoming Classes</div>
                <div className="text-2xl font-black text-purple-400 mt-1">{schedules.length}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Live Sessions Booked</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 col-span-2 md:col-span-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Fee Status</div>
                <div className="text-xl font-black text-white mt-1">
                  {studentPayment?.status === 'Paid' ? (
                    <span className="text-emerald-400">Paid in Full</span>
                  ) : (
                    <span className="text-amber-400">₹{studentPayment?.pendingAmount.toLocaleString('en-IN') || '20,000'} Due</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Next Due: Nov 05</div>
              </div>
            </div>

            {/* Quick Sections: Continue Learning + Upcoming Class */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Continue Learning Card */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-cyan-400 bg-sky-950 px-2.5 py-0.5 rounded border border-sky-800">
                      RESUME LESSON
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Module 1 &bull; Lesson 2
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{currentLesson.title}</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Review synthesizable non-blocking assignments, propagation delays, and timing closure
                    foundations.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Course Completion</span>
                    <span className="text-cyan-400 font-bold">{activeEnrollment?.progressPercent || 42}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-cyan-400 h-full transition-all duration-500"
                      style={{ width: `${activeEnrollment?.progressPercent || 42}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('learning')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-300 font-semibold text-xs border border-cyan-500/30 transition flex items-center justify-center gap-2"
                >
                  <span>Open LMS Classroom</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Next Scheduled Class Card */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                      NEXT LIVE CLASS
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Saturday 10:00 AM</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {schedules[0]?.topic || 'Dual-Clock Asynchronous FIFO Design & Gray Code Math'}
                  </h3>
                  <div className="text-xs text-slate-400 mt-2 space-y-1">
                    <div>Trainer: <span className="text-slate-200">{schedules[0]?.trainer || 'Bhavani Bhaskar'}</span></div>
                    <div>Batch: <span className="text-slate-200">{schedules[0]?.batch || 'Batch #28 (Weekend)'}</span></div>
                  </div>
                </div>

                <a
                  href={schedules[0]?.meetingLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Join Live Google Meet</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ======================= 2. MY COURSES TAB ======================= */}
        {activeTab === 'my-courses' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Enrolled Specializations</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Access your course curriculums, lesson archives, and certifications.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentEnrollments.map((enr) => {
                const crs = courses.find((c) => c.id === enr.courseId) || courses[0];
                return (
                  <div
                    key={enr.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-950 text-cyan-300 border border-sky-800">
                          {crs.category} &bull; {crs.mode}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {enr.progressPercent}% Completed
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-snug">{crs.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {crs.shortDescription}
                      </p>

                      <div className="space-y-1.5 pt-2">
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="bg-cyan-400 h-full transition-all"
                            style={{ width: `${enr.progressPercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] font-mono text-slate-400">
                          <span>{enr.completedLessonIds.length} of {crs.lessonsCount} Lessons Completed</span>
                          <span>Trainer: {crs.trainer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedCourseId(crs.id);
                          setActiveTab('learning');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Continue E-Learning</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('assignments')}
                        className="text-xs text-slate-400 hover:text-white underline font-medium"
                      >
                        Assignments
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================= 3. LEARNING (LMS CLASSROOM) ======================= */}
        {activeTab === 'learning' && (
          <div className="space-y-4 animate-fade-in">
            {/* Top Bar for Learning Workspace */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-cyan-300 border border-sky-800">
                  {activeCourse.title}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                  {currentLesson.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkComplete}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-xs border border-emerald-500/40 transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Complete</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentIndex <= 0}
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg disabled:opacity-30"
                    title="Previous Lesson"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextLesson}
                    disabled={currentIndex >= allLessons.length - 1}
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg disabled:opacity-30"
                    title="Next Lesson"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Split Classroom: Left Module Tree + Main Lesson Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Sidebar: Modules & Lessons */}
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider pb-2 border-b border-slate-800">
                  Course Modules &bull; {modules.length} Sections
                </div>

                {modules.map((mod) => (
                  <div key={mod.id} className="space-y-2">
                    <div className="text-xs font-bold text-slate-200">
                      {mod.title}
                    </div>

                    <div className="space-y-1 pl-2">
                      {mod.lessons.map((les) => {
                        const isCurrent = les.id === currentLesson.id;
                        const isCompleted = activeEnrollment?.completedLessonIds.includes(les.id);
                        return (
                          <button
                            key={les.id}
                            onClick={() => setSelectedLessonId(les.id)}
                            className={`w-full text-left p-2 rounded-lg text-xs transition flex items-center justify-between ${
                              isCurrent
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {les.type === 'video' && <Play className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                              {les.type === 'code' && <FileCode className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                              {les.type === 'text' && <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                              {les.type === 'pdf' && <FileText className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                              <span className="truncate">{les.title}</span>
                            </div>

                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                            ) : (
                              <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-1">
                                {les.durationMinutes}m
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                {/* Video Lesson Type */}
                {currentLesson.type === 'video' && (
                  <div className="space-y-4">
                    <div className="aspect-video w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative group flex items-center justify-center">
                      <video
                        controls
                        src={currentLesson.contentUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs text-slate-400">
                      Duration: {currentLesson.durationMinutes} Minutes &bull; 1080p Stream &bull; Subtitles Available
                    </div>
                  </div>
                )}

                {/* Lesson Notes / Markdown Content */}
                {currentLesson.textContent && (
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
                    {currentLesson.textContent}
                  </div>
                )}

                {/* Code Snippet Viewer */}
                {currentLesson.codeSnippet && (
                  <div className="space-y-2 font-mono">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="text-amber-300 font-bold">Synthesizable Hardware Model</span>
                      <span>Verilog-2001 / SystemVerilog</span>
                    </div>
                    <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                      {currentLesson.codeSnippet}
                    </pre>
                  </div>
                )}

                {/* Bottom Lesson Footer */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentIndex <= 0}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 disabled:opacity-30"
                  >
                    &larr; Previous Lesson
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={currentIndex >= allLessons.length - 1}
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs disabled:opacity-30"
                  >
                    Next Lesson &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= 4. ASSIGNMENTS TAB ======================= */}
        {activeTab === 'assignments' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white">Course Assignments &amp; Projects</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload your Verilog RTL models and testbench scripts for faculty code review.
              </p>
            </div>

            <div className="space-y-4">
              {assignments.map((asg) => {
                const mySubmission = asg.submissions.find(
                  (s) => s.studentId === student?.id || s.studentId === 'std-1'
                );

                return (
                  <div
                    key={asg.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-cyan-300 border border-sky-800">
                          MAX MARKS: {asg.maxMarks}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Deadline: {asg.deadline}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">{asg.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{asg.description}</p>

                      {mySubmission && (
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">
                              Uploaded File: <strong className="text-cyan-300">{mySubmission.fileName}</strong>
                            </span>
                            <span
                              className={`font-bold px-2 py-0.5 rounded text-[10px] font-mono ${
                                mySubmission.status === 'Graded'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}
                            >
                              {mySubmission.status} {mySubmission.marksObtained && `(${mySubmission.marksObtained}/100)`}
                            </span>
                          </div>
                          {mySubmission.feedback && (
                            <div className="text-slate-300 italic pt-1 border-t border-slate-900">
                              Faculty Remarks: "{mySubmission.feedback}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => handleAssignmentUpload(asg.id)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition flex items-center justify-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{mySubmission ? 'Re-upload Solution' : 'Submit Assignment (.v)'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================= 5. SCHEDULE TAB ======================= */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white">Live Batch Timetable</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time class links updated automatically by institute faculty.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schedules.map((sch) => (
                <div
                  key={sch.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {sch.status}
                      </span>
                      <span className="text-xs font-mono text-cyan-400">{sch.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">{sch.topic}</h3>

                    <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800">
                      <div>Trainer: <span className="text-slate-200">{sch.trainer}</span></div>
                      <div>Batch: <span className="text-slate-200">{sch.batch}</span></div>
                      <div>Time: <span className="text-slate-200">{sch.startTime} - {sch.endTime}</span></div>
                    </div>
                  </div>

                  <a
                    href={sch.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-300 font-semibold text-xs border border-cyan-500/30 transition flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Class Meeting</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= 6. PAYMENTS TAB ======================= */}
        {activeTab === 'payments' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white">Tuition &amp; Fee Receipts</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Transparent accounting of total fee, payments made, and next due date.
              </p>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="text-xs font-mono text-slate-400 uppercase">Total Program Fee</div>
                <div className="text-2xl font-black text-white mt-1">
                  ₹{studentPayment?.totalFee.toLocaleString('en-IN') || '45,000'}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{activeCourse.title}</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="text-xs font-mono text-slate-400 uppercase">Total Amount Paid</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  ₹{studentPayment?.totalPaid.toLocaleString('en-IN') || '25,000'}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Verified via UPI / Bank</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="text-xs font-mono text-slate-400 uppercase">Pending Balance</div>
                <div className="text-2xl font-black text-amber-400 mt-1">
                  ₹{studentPayment?.pendingAmount.toLocaleString('en-IN') || '20,000'}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Due by: {studentPayment?.nextDueDate || '2026-11-05'}
                </div>
              </div>
            </div>

            {/* Transaction History Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Payment Receipts &amp; History</h3>
                <span className="text-xs font-mono text-slate-400">
                  {studentPayment?.transactions.length || 1} Transactions
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Receipt #</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Method</th>
                      <th className="p-3.5">Reference ID</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {(studentPayment?.transactions || []).map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-850">
                        <td className="p-3.5 font-mono text-cyan-400 font-semibold">{tx.receiptNumber}</td>
                        <td className="p-3.5 text-slate-300">{tx.paymentDate}</td>
                        <td className="p-3.5 text-slate-300">{tx.paymentMethod}</td>
                        <td className="p-3.5 font-mono text-slate-400">{tx.referenceId}</td>
                        <td className="p-3.5 font-bold text-emerald-400">
                          ₹{tx.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => showToast(`Receipt ${tx.receiptNumber} downloaded`, 'info')}
                            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium"
                          >
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= 7. NOTIFICATIONS TAB ======================= */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 animate-fade-in max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Institute Notices &amp; Alerts</h2>
                <p className="text-xs text-slate-400 mt-0.5">Announcements from faculty and admissions.</p>
              </div>
              <button
                onClick={() => {
                  storageService.markAllNotificationsRead('student');
                  showToast('All notifications marked as read', 'info');
                }}
                className="text-xs text-cyan-400 hover:underline"
              >
                Mark All Read
              </button>
            </div>

            <div className="space-y-3">
              {studentNotifs.map((n) => (
                <div
                  key={n.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3.5"
                >
                  <div className="p-2 rounded-lg bg-sky-950 text-cyan-400 border border-sky-800 shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{n.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{n.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= 8. PROFILE TAB ======================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <div>
              <h2 className="text-2xl font-bold text-white">Student Profile</h2>
              <p className="text-xs text-slate-400 mt-0.5">Your official registration details.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Full Name:</span>
                  <span className="text-sm font-bold text-white">{student?.name || 'Rahul Verma'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email Address:</span>
                  <span className="text-sm font-bold text-white">{student?.email || 'rahul.verma@student.com'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone:</span>
                  <span className="text-sm font-bold text-white font-mono">{student?.phone || '+91 98765 11223'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Education:</span>
                  <span className="text-sm font-bold text-white">{student?.education || 'B.Tech ECE (2025)'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Passout Year:</span>
                  <span className="text-sm font-bold text-white">{student?.yearOfPassout || '2025'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">City:</span>
                  <span className="text-sm font-bold text-white">{student?.city || 'Hyderabad'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-emerald-400 font-mono">Admission Status: Verified Active</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/60 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Phase 3.8) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 backdrop-blur-md px-2 py-2 flex items-center justify-around text-[10px] font-semibold text-slate-400">
        {[
          { id: 'dashboard', label: 'Home', icon: GraduationCap },
          { id: 'my-courses', label: 'Courses', icon: BookOpen },
          { id: 'learning', label: 'Classroom', icon: Play },
          { id: 'schedule', label: 'Schedule', icon: Calendar },
          { id: 'profile', label: 'Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition ${
                isActive ? 'text-cyan-400' : 'hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 5-MINUTE INACTIVITY POPUP MODAL */}
      {/* When student is active, this will NOT disturb them. If inactive for 5 minutes, it gently surfaces upcoming courses & workshops */}
      <PopupModal
        idleTimeoutMinutes={5}
        onOpenApply={() => {
          showToast('Opening course application for enrolled learner', 'info');
        }}
        onOpenEvent={() => {
          setActiveTab('schedule');
          showToast('Workshops & live events timetable', 'info');
        }}
      />
    </div>
  );
};
