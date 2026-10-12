import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { storageService } from '../../services/storage';
import { useToast } from '../../context/ToastContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Course Admission & Curriculum Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !message) {
      showToast('Please fill in all mandatory fields.', 'error');
      return;
    }

    storageService.submitContactMessage({
      fullName,
      email,
      phone,
      subject,
      message
    });

    setSubmitted(true);
    showToast('Your message has been sent to our admissions team!', 'success');
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage('');
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Campus Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>VISIT US OR GET IN TOUCH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Connect with Design Silicon VLSI
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Whether you want to inspect our physical hardware labs in Hyderabad, discuss corporate
                training for your engineering team, or ask about batch schedules, we are here to help.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-sky-950 text-cyan-400 border border-sky-800 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Hyderabad Training Center</div>
                  <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Level 3, Silicon Tech Towers, Near Cyber Gateway, HITEC City, Hyderabad, Telangana 500081
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Direct Admissions Lines</div>
                  <div className="text-xs text-slate-300 font-mono mt-0.5">
                    +91 98480 12345 / +91 98765 11223
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Mon - Sat: 9:00 AM - 7:30 PM IST</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Email Communications</div>
                  <div className="text-xs text-slate-300 font-mono mt-0.5">
                    admissions@dsv.com
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Response guaranteed within 6 business hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-slate-950 border border-sky-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-cyan-300">{fullName}</strong>. Your inquiry has
                  been recorded in our Institute Admin Messages inbox. A senior advisor will follow up with you.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Send Us a Direct Message</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fill in your query and our team will get back to you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
                    >
                      <option value="Course Admission & Curriculum Inquiry">Course Admission &amp; Curriculum Inquiry</option>
                      <option value="Offline Weekend Lab Batches">Offline Weekend Lab Batches</option>
                      <option value="EDA Tool & Cloud Server Setup">EDA Tool &amp; Cloud Server Setup</option>
                      <option value="Corporate / Team Training">Corporate / Team Training</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your background, career goals, or any specific questions..."
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Institute Office</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
