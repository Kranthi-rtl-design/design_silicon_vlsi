import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Menu,
  X,
  User as UserIcon,
  Shield,
  GraduationCap,
  Bell,
  ChevronRight,
  LogOut,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { storageService, subscribeToDataChanges } from '../../services/storage';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, extra?: any) => void;
  onOpenAuth: (defaultTab?: 'login' | 'register') => void;
  onOpenApply: (courseId?: string) => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
  onOpenApply,
}) => {
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [badges, setBadges] = useState(storageService.getUnreadBadges());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToDataChanges(() => {
      setBadges(storageService.getUnreadBadges());
    });
    return unsubscribe;
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Courses', view: 'courses' },
    { label: 'Learning Path', view: 'learning-path' },
    { label: 'Trainers', view: 'trainers' },
    { label: 'Events & Workshops', view: 'events' },
    { label: 'Interview Prep', view: 'interview-prep' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleLinkClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-sky-500/20 shadow-lg shadow-sky-950/20 py-2.5'
          : 'bg-slate-950/70 backdrop-blur-sm border-b border-slate-800/80 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group shrink-0 focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 border border-sky-500/30 overflow-hidden shadow-lg shadow-cyan-500/20 group-hover:border-cyan-400 group-hover:shadow-cyan-500/40 transition">
              <img
                src="/images/dsv-badge-dark.jpg"
                alt="Design Silicon VLSI (DSV)"
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 font-sans">
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent font-extrabold">
                  DESIGN SILICON
                </span>
                <span className="text-amber-400 font-mono text-xs font-black tracking-wider px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/40">
                  VLSI
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-widest hidden sm:block">
                LEARN &bull; PRACTICE &bull; BUILD &bull; GROW
              </div>
            </div>
          </button>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleLinkClick(link.view)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* ROLE SHORTCUTS / PORTAL ACCESS */}
            {role === 'admin' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('admin-portal')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                    currentView === 'admin-portal'
                      ? 'bg-rose-500/20 border-rose-500/60 text-rose-300'
                      : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-rose-400/50'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Admin Portal</span>
                  {badges.totalAdminAlerts > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-bold animate-pulse">
                      {badges.totalAdminAlerts}
                    </span>
                  )}
                </button>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition flex items-center gap-1 text-xs"
                  title="Logout Admin"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Logout</span>
                </button>
              </div>
            ) : role === 'student' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('student-portal')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                    currentView === 'student-portal'
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
                      : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-cyan-400/50'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Student Portal</span>
                  <span className="sm:hidden">LMS</span>
                </button>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition flex items-center gap-1 text-xs"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Logout</span>
                </button>
              </div>
            ) : (
              /* GUEST: SINGLE LOGIN BUTTON ONLY */
              <div className="flex items-center">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-cyan-300 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/40 transition flex items-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Login</span>
                </button>
              </div>
            )}

            {/* PRIMARY CTA: APPLY NOW */}
            <button
              onClick={() => onOpenApply()}
              className="relative group overflow-hidden px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-1.5 shrink-0"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </button>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleLinkClick(link.view)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                  currentView === link.view
                    ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-800/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Account state in Mobile Menu */}
          <div className="pt-2 flex flex-col gap-2">
            {role === 'guest' ? (
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
              >
                <UserIcon className="w-4 h-4" />
                Sign In / Login
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onNavigate(role === 'admin' ? 'admin-portal' : 'student-portal');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold ${
                    role === 'admin'
                      ? 'bg-rose-950 border border-rose-800 text-rose-300'
                      : 'bg-cyan-950 border border-cyan-800 text-cyan-300'
                  }`}
                >
                  {role === 'admin' ? <Shield className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                  Go to {role === 'admin' ? 'Admin Portal' : 'Student Portal'} ({user?.name})
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
