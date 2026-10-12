import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Share2
} from 'lucide-react';
import { EventItem } from '../../types';
import { storageService } from '../../services/storage';
import { useToast } from '../../context/ToastContext';

interface UpcomingEventsProps {
  onOpenApply: () => void;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = () => {
  const { showToast } = useToast();
  const events = storageService.getEvents().filter((e) => e.published);

  const [registerModalEvent, setRegisterModalEvent] = useState<EventItem | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeOrCompany, setCollegeOrCompany] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerModalEvent || !name || !email || !phone) {
      showToast('Please fill in all mandatory fields.', 'error');
      return;
    }

    storageService.registerForEvent({
      eventId: registerModalEvent.id,
      eventTitle: registerModalEvent.title,
      name,
      email,
      phone,
      collegeOrCompany: collegeOrCompany || 'Self-employed / Independent'
    });

    setIsSuccess(true);
    showToast('Seat reserved successfully! Check email for joining link.', 'success');
  };

  const closeModal = () => {
    setRegisterModalEvent(null);
    setIsSuccess(false);
    setName('');
    setEmail('');
    setPhone('');
    setCollegeOrCompany('');
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>LIVE WORKSHOPS &amp; TECH WEBINARS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Upcoming VLSI Events
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Attend live interactive masterclasses on Clock Domain Crossing (CDC), AXI4 protocol packet
            traces, and technical interview problem solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={ev.coverImage}
                  alt={ev.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                    {ev.mode}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-300 bg-emerald-950/90 border border-emerald-500/30">
                    {ev.registeredCount} Registered
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 text-xs font-mono text-cyan-300 flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ev.date}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-2 leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>{ev.speaker}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate">{ev.locationOrUrl}</span>
                  </div>
                </div>

                <button
                  onClick={() => setRegisterModalEvent(ev)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5"
                >
                  <span>Register for Workshop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      {registerModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden p-6">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-white">Registration Confirmed!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  You are registered for <strong>{registerModalEvent.title}</strong> on{' '}
                  <span className="text-cyan-300">{registerModalEvent.date}</span>. An invitation link has been
                  sent to <span className="font-mono text-cyan-300">{email}</span>.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    EVENT REGISTRATION
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {registerModalEvent.title}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Speaker: {registerModalEvent.speaker} &bull; Date: {registerModalEvent.date} ({registerModalEvent.time})
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Suresh Reddy"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="suresh@gmail.com"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">College or Company</label>
                  <input
                    type="text"
                    value={collegeOrCompany}
                    onChange={(e) => setCollegeOrCompany(e.target.value)}
                    placeholder="College name or employer"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg shadow-cyan-500/20"
                >
                  Confirm Free Event Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
