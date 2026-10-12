import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  Shield,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { storageService, subscribeToDataChanges } from './services/storage';
import { Course, EventItem } from './types';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ChatbotModal } from './components/common/ChatbotModal';
import { PopupModal } from './components/common/PopupModal';
import { CourseApplyModal } from './components/common/CourseApplyModal';
import { AuthModal } from './components/auth/AuthModal';

// Public Components
import { Hero } from './components/public/Hero';
import { SearchSection } from './components/public/SearchSection';
import { WhyChooseUs } from './components/public/WhyChooseUs';
import { LearningPathVisualizer } from './components/public/LearningPathVisualizer';
import { FeaturedCourses } from './components/public/FeaturedCourses';
import { UpcomingEvents } from './components/public/UpcomingEvents';
import { FounderMessage } from './components/public/FounderMessage';
import { TrainersSection } from './components/public/TrainersSection';
import { ELearningPreview } from './components/public/ELearningPreview';
import { InterviewPrepSection } from './components/public/InterviewPrepSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { FAQSection } from './components/public/FAQSection';
import { ContactSection } from './components/public/ContactSection';
import { CourseDetailModal } from './components/public/CourseDetailModal';

// Portals
import { StudentPortal } from './components/student/StudentPortal';
import { AdminPortal } from './components/admin/AdminPortal';

function MainApp() {
  const { role, user } = useAuth();

  // Navigation View State
  const [currentView, setCurrentView] = useState<
    | 'home'
    | 'courses'
    | 'learning-path'
    | 'trainers'
    | 'events'
    | 'interview-prep'
    | 'about'
    | 'contact'
    | 'student-portal'
    | 'admin-portal'
  >('home');

  // Search Filter state for courses
  const [courseSearchFilter, setCourseSearchFilter] = useState('');

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'register'>('login');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyCourseId, setApplyCourseId] = useState<string | undefined>(undefined);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [detailModalCourse, setDetailModalCourse] = useState<Course | null>(null);

  // Unread badge tracking
  const [badges, setBadges] = useState(storageService.getUnreadBadges());

  useEffect(() => {
    const unsub = subscribeToDataChanges(() => {
      setBadges(storageService.getUnreadBadges());
    });
    return unsub;
  }, []);

  // When role changes, automatically redirect authenticated users to their portal
  useEffect(() => {
    if (role === 'admin' && currentView !== 'admin-portal') {
      setCurrentView('admin-portal');
    } else if (role === 'student' && currentView !== 'student-portal') {
      setCurrentView('student-portal');
    } else if (role === 'guest' && (currentView === 'student-portal' || currentView === 'admin-portal')) {
      setCurrentView('home');
    }
  }, [role]);

  // Helper open functions
  const handleOpenAuth = (defaultTab: 'login' | 'register' = 'login') => {
    setAuthDefaultTab(defaultTab);
    setAuthModalOpen(true);
  };

  const handleOpenApply = (courseId?: string) => {
    setApplyCourseId(courseId);
    setApplyModalOpen(true);
  };

  const handleSelectCourse = (courseId: string) => {
    if (!courseId) {
      setCurrentView('courses');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const c = storageService.getCourseById(courseId);
    if (c) {
      setDetailModalCourse(c);
    }
  };

  // If authenticated as student, lock inside student portal until logout
  if (role === 'student' || currentView === 'student-portal') {
    if (role !== 'student') {
      // Must authenticate first
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
          <AuthModal
            isOpen={true}
            defaultTab="login"
            onClose={() => setCurrentView('home')}
            onSuccess={(targetView) => {
              setCurrentView(targetView as any);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      );
    }
    return (
      <StudentPortal
        onBackToHome={() => {
          // Once logged in, student stays in student portal until they logout
        }}
      />
    );
  }

  // If authenticated as admin, lock inside admin portal until logout
  if (role === 'admin' || currentView === 'admin-portal') {
    if (role !== 'admin') {
      // Must authenticate first
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
          <AuthModal
            isOpen={true}
            defaultTab="login"
            onClose={() => setCurrentView('home')}
            onSuccess={(targetView) => {
              setCurrentView(targetView as any);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      );
    }
    return (
      <AdminPortal
        onBackToHome={() => {
          // Once logged in, admin stays in admin portal until they logout
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      {/* 1. Global Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'student-portal' && (role as string) !== 'student') {
            handleOpenAuth('login');
            return;
          }
          if (view === 'admin-portal' && (role as string) !== 'admin') {
            handleOpenAuth('login');
            return;
          }
          setCurrentView(view as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        onOpenApply={handleOpenApply}
        onOpenChat={() => setChatbotOpen(true)}
      />

      {/* 2. Main View Router */}
      <main className="flex-1">
        {/* ================= HOME VIEW ================= */}
        {currentView === 'home' && (
          <>
            <Hero
              onExploreCourses={() => {
                setCurrentView('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenApply={() => handleOpenApply()}
              onOpenChat={() => setChatbotOpen(true)}
              onOpenPreview={() => {
                setCurrentView('learning-path');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <SearchSection
              onSearch={(query) => {
                setCourseSearchFilter(query);
                setCurrentView('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <WhyChooseUs />

            <LearningPathVisualizer
              onSelectCourse={handleSelectCourse}
              onOpenApply={() => handleOpenApply()}
            />

            <FeaturedCourses
              onSelectCourse={handleSelectCourse}
              onOpenApply={handleOpenApply}
            />

            <UpcomingEvents onOpenApply={() => handleOpenApply()} />

            <FounderMessage />

            <TrainersSection
              onSelectCourse={handleSelectCourse}
              onOpenApply={() => handleOpenApply()}
            />

            <ELearningPreview
              onOpenAuth={() => handleOpenAuth('login')}
              onExploreCourses={() => {
                setCurrentView('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <InterviewPrepSection onOpenApply={() => handleOpenApply()} />

            <TestimonialsSection />

            <FAQSection
              onOpenApply={() => handleOpenApply()}
              onOpenChat={() => setChatbotOpen(true)}
            />

            <ContactSection />
          </>
        )}

        {/* ================= COURSES CATALOG VIEW ================= */}
        {currentView === 'courses' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-mono text-cyan-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
                OFFICIAL INDUSTRY CURRICULUM
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                VLSI Design &amp; Verification Programs
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore our full catalog of hands-on semiconductor training tracks with real EDA tool access.
              </p>
            </div>

            <SearchSection
              onSearch={(query) => setCourseSearchFilter(query)}
            />

            <FeaturedCourses
              onSelectCourse={handleSelectCourse}
              onOpenApply={handleOpenApply}
              filterQuery={courseSearchFilter}
            />
          </div>
        )}

        {/* ================= LEARNING PATH VIEW ================= */}
        {currentView === 'learning-path' && (
          <div className="py-10 animate-fade-in">
            <LearningPathVisualizer
              onSelectCourse={handleSelectCourse}
              onOpenApply={() => handleOpenApply()}
            />
          </div>
        )}

        {/* ================= TRAINERS VIEW ================= */}
        {currentView === 'trainers' && (
          <div className="py-10 animate-fade-in">
            <TrainersSection
              onSelectCourse={handleSelectCourse}
              onOpenApply={() => handleOpenApply()}
            />
            <FounderMessage />
          </div>
        )}

        {/* ================= EVENTS VIEW ================= */}
        {currentView === 'events' && (
          <div className="py-10 animate-fade-in">
            <UpcomingEvents onOpenApply={() => handleOpenApply()} />
          </div>
        )}

        {/* ================= INTERVIEW PREP VIEW ================= */}
        {currentView === 'interview-prep' && (
          <div className="py-10 animate-fade-in">
            <InterviewPrepSection onOpenApply={() => handleOpenApply()} />
          </div>
        )}

        {/* ================= ABOUT VIEW ================= */}
        {currentView === 'about' && (
          <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono text-cyan-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
                OUR MISSION &amp; HERITAGE
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                About Design Silicon VLSI Institute
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Founded by senior silicon architects, Design Silicon VLSI operates with one unwavering
                mandate: to transform passionate engineers into silicon-ready RTL and verification
                professionals without shortcuts or fake claims.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-sky-500/30 shadow-2xl bg-slate-950">
              <img
                src="/images/dsv-banner-light.png"
                alt="Design Silicon VLSI Banner"
                className="w-full h-auto object-cover"
              />
            </div>

            <WhyChooseUs />
            <FounderMessage />
          </div>
        )}

        {/* ================= CONTACT VIEW ================= */}
        {currentView === 'contact' && (
          <div className="py-10 animate-fade-in">
            <ContactSection />
            <FAQSection
              onOpenApply={() => handleOpenApply()}
              onOpenChat={() => setChatbotOpen(true)}
            />
          </div>
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenApply={() => handleOpenApply()}
        onOpenChat={() => setChatbotOpen(true)}
      />

      {/* 4. FLOATING ACTION BUTTONS */}
      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919848012345?text=Hello%20Design%20Silicon%20VLSI,%20I%20am%20interested%20in%20your%20RTL/Verification%20courses."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition flex items-center justify-center group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <Phone className="w-5 h-5 fill-slate-950" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 group-hover:ml-2 text-xs font-bold text-slate-950">
          WhatsApp Us
        </span>
      </a>

      {/* Floating Multi-Step Lead Chatbot Pill */}
      <button
        onClick={() => setChatbotOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs shadow-2xl shadow-cyan-500/40 hover:scale-105 active:scale-95 transition flex items-center gap-2 group"
        aria-label="Open Course Advisor Chat"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 fill-slate-950" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span>Ask Course Advisor</span>
      </button>

      {/* 5. MODALS & POPUPS */}
      {/* Inactivity Popup Carousel (5-minute idle trigger) */}
      <PopupModal
        idleTimeoutMinutes={5}
        onOpenApply={handleOpenApply}
        onOpenEvent={(eventId) => {
          setCurrentView('events');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Multi-Step Lead Capture Chatbot (Phase 1.2) */}
      <ChatbotModal
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
      />

      {/* Course Application Form (Phase 1.3) */}
      <CourseApplyModal
        isOpen={applyModalOpen}
        initialCourseId={applyCourseId}
        onClose={() => setApplyModalOpen(false)}
      />

      {/* Course Poster & Curriculum Detail Modal */}
      <CourseDetailModal
        course={detailModalCourse}
        onClose={() => setDetailModalCourse(null)}
        onApply={(courseId) => handleOpenApply(courseId)}
      />

      {/* Auth Modal (Phase 2 - Student Login / Admin Login / Registration) */}
      <AuthModal
        isOpen={authModalOpen}
        defaultTab={authDefaultTab}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(targetView) => {
          setCurrentView(targetView as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
