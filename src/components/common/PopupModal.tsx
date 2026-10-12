import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChevronLeft, ChevronRight, ArrowRight, Calendar, Layers } from 'lucide-react';
import { Course, EventItem } from '../../types';
import { storageService } from '../../services/storage';

interface PopupModalProps {
  onOpenApply: (courseId?: string) => void;
  onOpenEvent: (eventId: string) => void;
  idleTimeoutMinutes?: number; // default 5 minutes
}

interface PopupItem {
  id: string;
  type: 'course' | 'event';
  title: string;
  description: string;
  thumbnail: string;
  badge: string;
  actionLabel: string;
  priority: number;
}

export const PopupModal: React.FC<PopupModalProps> = ({
  onOpenApply,
  onOpenEvent,
  idleTimeoutMinutes = 5
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<PopupItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load published courses and events marked for popup
  useEffect(() => {
    const courses = storageService.getCourses();
    const events = storageService.getEvents();

    const popupItems: PopupItem[] = [];

    // Filter courses with popupEnabled === true
    courses
      .filter((c) => c.popupEnabled && c.published)
      .forEach((c) => {
        popupItems.push({
          id: c.id,
          type: 'course',
          title: c.title,
          description: c.shortDescription,
          thumbnail: c.thumbnail,
          badge: `Next Cohort: ${c.batch}`,
          actionLabel: 'Apply for Admission',
          priority: c.popupPriority || 99,
        });
      });

    // Filter events with popupEnabled === true
    events
      .filter((e) => e.popupEnabled && e.published)
      .forEach((e) => {
        popupItems.push({
          id: e.id,
          type: 'event',
          title: e.title,
          description: e.description,
          thumbnail: e.coverImage,
          badge: `Live Workshop &bull; ${e.date}`,
          actionLabel: 'Reserve Free Seat',
          priority: e.popupPriority || 99,
        });
      });

    popupItems.sort((a, b) => a.priority - b.priority);
    setItems(popupItems);
  }, []);

  // 5-minute inactivity (idle) detection:
  // When user is active (moving mouse, scrolling, typing, clicking, tapping), reset timer.
  // ONLY if user is inactive for 5 minutes (no user activity), show the popup.
  useEffect(() => {
    if (items.length === 0) return;

    const IDLE_TIME_MS = idleTimeoutMinutes * 60 * 1000; // 5 minutes = 300,000 ms
    let timer: any = null;

    const triggerPopupIfIdle = () => {
      // Show popup only if not already open
      setIsOpen(true);
    };

    const resetIdleTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(triggerPopupIfIdle, IDLE_TIME_MS);
    };

    // User activity listeners
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'wheel'];
    activityEvents.forEach((evt) => {
      window.addEventListener(evt, resetIdleTimer, { passive: true });
    });

    // Start initial timer
    resetIdleTimer();

    return () => {
      if (timer) clearTimeout(timer);
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, resetIdleTimer);
      });
    };
  }, [items, idleTimeoutMinutes]);

  if (!isOpen || items.length === 0) return null;

  const current = items[currentIndex];

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('ds_vlsi_popup_dismissed', 'true');
  };

  const handleAction = () => {
    handleDismiss();
    if (current.type === 'course') {
      onOpenApply(current.id);
    } else {
      onOpenEvent(current.id);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Silicon grid pattern */}
        <div className="absolute inset-0 silicon-grid opacity-30 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 z-20 p-2 text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-950 rounded-full border border-slate-700/80 backdrop-blur-sm transition"
          aria-label="Close Announcement"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cover Image Container with Auto-Fit and Auto-Resize */}
        <div className="relative max-h-[42vh] sm:max-h-[48vh] w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-800">
          <img
            src={current.thumbnail}
            alt={current.title}
            className="w-full h-auto max-h-[42vh] sm:max-h-[48vh] object-contain transition-transform duration-500 hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none opacity-80" />

          {/* Badge */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
                current.type === 'course'
                  ? 'bg-sky-500/20 text-sky-200 border-sky-400/30'
                  : 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span dangerouslySetInnerHTML={{ __html: current.badge }} />
            </span>
          </div>

          {/* Carousel indicators if multiple */}
          {items.length > 1 && (
            <div className="absolute top-3 left-4 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 border border-slate-800">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>
                {currentIndex + 1} of {items.length}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 relative z-10 space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {current.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {current.description}
          </p>

          {/* CTA & Carousel Controls */}
          <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-800">
            {items.length > 1 ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition"
                  aria-label="Previous Announcement"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition"
                  aria-label="Next Announcement"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleDismiss}
                className="text-xs text-slate-400 hover:text-white underline transition"
              >
                Dismiss
              </button>
            )}

            <button
              onClick={handleAction}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition ml-auto"
            >
              <span>{current.actionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
