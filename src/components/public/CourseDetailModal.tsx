import React from 'react';
import {
  X,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Cpu,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { Course } from '../../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onApply: (courseId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onApply,
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-sky-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Subtle Silicon Grid Background */}
        <div className="absolute inset-0 silicon-grid opacity-20 pointer-events-none" />

        {/* Modal Top Header */}
        <div className="bg-slate-950/90 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-950/80 border border-sky-500/40 text-cyan-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase">
                {course.category} &bull; {course.level}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {course.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 relative z-10 space-y-6">
          {/* Main Grid: Left Flyer/Poster + Right Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Official Poster Flyer with Auto-Fit & Auto-Resize */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden border border-sky-500/30 bg-slate-950 shadow-xl group flex items-center justify-center p-1.5">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-auto max-h-[55vh] md:max-h-[62vh] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* Right Column: Course Specifications */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h4 className="text-xl font-extrabold text-white leading-snug">
                  {course.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {/* Key Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-sans">
                <div>
                  <span className="text-slate-500 text-[11px] block font-mono">Trainer:</span>
                  <strong className="text-white">{course.trainer}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block font-mono">Duration:</span>
                  <strong className="text-cyan-400">{course.duration}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block font-mono">Delivery Mode:</span>
                  <strong className="text-white">{course.mode}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block font-mono">Tuition Fee:</span>
                  <strong className="text-emerald-400 text-sm">₹{course.fee.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Batch & Next Start */}
              <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{course.batch}</span>
                </span>
                <span className="text-emerald-400 font-bold">Admissions Active</span>
              </div>
            </div>
          </div>

          {/* Syllabus Breakdown */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Complete Curriculum Modules Overview:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.syllabusOverview.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & EDA Platforms */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              EDA Tools &amp; Simulators Practiced:
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-sky-500/30"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-slate-950/95 p-4 border-t border-slate-800 flex items-center justify-between gap-4 relative z-10">
          <div className="text-xs text-slate-400 hidden sm:block">
            Tuition Fee: <strong className="text-emerald-400 font-mono text-sm">₹{course.fee.toLocaleString('en-IN')}</strong> &bull; Split installment payment available
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(course.id);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg shadow-cyan-500/25 flex items-center gap-1.5"
            >
              <span>Apply for this Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
