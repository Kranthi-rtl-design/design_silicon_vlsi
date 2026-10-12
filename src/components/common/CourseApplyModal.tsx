import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Cpu, Sparkles, BookOpen } from 'lucide-react';
import { CourseMode } from '../../types';
import { storageService } from '../../services/storage';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

interface CourseApplyModalProps {
  isOpen: boolean;
  initialCourseId?: string;
  onClose: () => void;
}

export const CourseApplyModal: React.FC<CourseApplyModalProps> = ({
  isOpen,
  initialCourseId,
  onClose,
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const courses = storageService.getCourses();

  const [courseId, setCourseId] = useState<string>(initialCourseId || (courses[0]?.id || ''));
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [yearOfPassout, setYearOfPassout] = useState('2025');
  const [education, setEducation] = useState('B.Tech / B.E. (ECE)');
  const [experienceLevel, setExperienceLevel] = useState('Fresher');
  const [preferredMode, setPreferredMode] = useState<CourseMode>('Hybrid');
  const [preferredBatch, setPreferredBatch] = useState('Next Immediate Batch');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialCourseId) {
      setCourseId(initialCourseId);
    }
  }, [initialCourseId]);

  useEffect(() => {
    if (user) {
      if (user.name) setFullName(user.name);
      if (user.email) setEmail(user.email);
      if (user.phone) setPhone(user.phone);
    }
  }, [user]);

  if (!isOpen) return null;

  const selectedCourse = courses.find((c) => c.id === courseId) || courses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      showToast('Please fill in all mandatory contact fields.', 'error');
      return;
    }

    storageService.submitApplication({
      fullName,
      email,
      phone,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      yearOfPassout,
      education,
      experienceLevel,
      preferredMode,
      preferredBatch,
      message
    });

    setIsSubmitted(true);
    showToast('Application submitted successfully! Admin notified.', 'success');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-slate-900 border border-sky-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Subtle Silicon Grid Background */}
        <div className="absolute inset-0 silicon-grid opacity-20 pointer-events-none" />

        {/* Modal Header */}
        <div className="bg-slate-950/90 p-5 border-b border-slate-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-500/40 text-cyan-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Course Admission Application
              </h3>
              <p className="text-xs text-slate-400">
                Design Silicon VLSI Academy &bull; Rigorous Industry Curriculum
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 relative z-10 max-h-[78vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Application Received!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-cyan-300">{fullName}</strong>. Your application for{' '}
                <strong className="text-white">{selectedCourse.title}</strong> has been logged in our
                Registration Requests Inbox.
              </p>
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 text-left space-y-1">
                <div>&bull; Our technical advisor will review your profile.</div>
                <div>&bull; You will receive syllabus documents and demo session links at <span className="text-slate-200">{email}</span>.</div>
                <div>&bull; Instant admin status can be verified in the Institute Dashboard.</div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:brightness-110 transition shadow-lg shadow-cyan-500/20"
              >
                Close & Explore More
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Target Course Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Select Program / Specialization *
                </label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.duration} - {c.mode})
                    </option>
                  ))}
                </select>
                {selectedCourse && (
                  <div className="mt-1 text-[11px] text-cyan-400 font-mono">
                    Led by: {selectedCourse.trainer} &bull; {selectedCourse.batch} &bull; Fee: ₹{selectedCourse.fee.toLocaleString('en-IN')}
                  </div>
                )}
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Rahul Verma"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone & Passout Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Graduation / Passout Year *
                  </label>
                  <select
                    value={yearOfPassout}
                    onChange={(e) => setYearOfPassout(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="2027">2027 (Current Student)</option>
                    <option value="2026">2026 (Final Year)</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="Earlier">2022 or Earlier</option>
                  </select>
                </div>
              </div>

              {/* Education & Experience Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Highest Education *
                  </label>
                  <input
                    type="text"
                    required
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="B.Tech ECE / M.Tech VLSI / etc."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Experience Level *
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="Fresher">Fresher (Looking for 1st Job)</option>
                    <option value="1-2 Years">1-2 Years Working in Tech</option>
                    <option value="3+ Years">3+ Years (Domain Transition)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Mode & Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Mode *
                  </label>
                  <div className="flex gap-2">
                    {(['Hybrid', 'Online', 'Offline'] as CourseMode[]).map((mode) => (
                      <button
                        type="button"
                        key={mode}
                        onClick={() => setPreferredMode(mode)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition ${
                          preferredMode === mode
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Batch Slot
                  </label>
                  <input
                    type="text"
                    value={preferredBatch}
                    onChange={(e) => setPreferredBatch(e.target.value)}
                    placeholder="E.g. Weekend Batch #28"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Specific Learning Goals or Background (Optional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you hope to achieve (e.g., target RTL Design roles, AXI protocols, etc.)"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application to Admissions Desk</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
