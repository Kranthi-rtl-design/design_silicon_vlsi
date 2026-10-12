import React from 'react';
import { assetPath } from '../../utils/assetPath';
import {
  Cpu,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenApply: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenApply, onOpenChat }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 font-sans relative overflow-hidden">
      {/* Background Silicon Grid */}
      <div className="absolute inset-0 silicon-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner / Callout with DSV Crest */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-lg shadow-amber-500/10 shrink-0 hidden sm:block">
                <img
                  src={assetPath('/images/dsv-crest-gold.jpg')}
                  alt="DSV Golden Seal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                  <span>Start Your Silicon Engineering Journey</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    ADMISSIONS OPEN
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Direct hands-on RTL microarchitecture, UVM testbenches, and EDA cloud workstations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenChat}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                Talk to Course Advisor
              </button>
              <button
                onClick={onOpenApply}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:brightness-110 transition flex items-center gap-1.5"
              >
                <span>Apply for Next Batch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-sky-500/30 shrink-0">
                <img
                  src={assetPath('/images/dsv-badge-dark.jpg')}
                  alt="Design Silicon VLSI"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-lg font-extrabold text-white tracking-tight">
                  DESIGN SILICON <span className="text-cyan-400">VLSI</span>
                </div>
                <div className="text-[10px] text-amber-400 font-mono tracking-wider">
                  LEARN &bull; PRACTICE &bull; BUILD &bull; GROW
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Design Silicon VLSI is an industry-oriented semiconductor training institute.
              We bridge academic electrical engineering theory with industrial chip design practices:
              from synthesizable RTL microarchitecture, through SystemVerilog & UVM verification,
              to Static Timing Analysis (STA) and GDSII signoff.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Fake Statistics</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1 text-cyan-400">
                <Award className="w-4 h-4" />
                <span>Silicon-Ready Standards</span>
              </div>
            </div>
          </div>

          {/* Core Programs */}
          <div>
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200 mb-3.5">
              Specializations
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-cyan-400 transition"
                >
                  Advanced RTL Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-cyan-400 transition"
                >
                  SystemVerilog & UVM DV
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-cyan-400 transition"
                >
                  AMBA AXI4 / APB Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-cyan-400 transition"
                >
                  Static Timing Analysis (STA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-cyan-400 transition"
                >
                  RISC-V Microarchitecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-cyan-400 transition"
                >
                  RTL-to-GDSII Physical Flow
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200 mb-3.5">
              Institute
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition">
                  About Our Vision
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learning-path')} className="hover:text-cyan-400 transition">
                  Silicon Learning Path
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trainers')} className="hover:text-cyan-400 transition">
                  Faculty & Mentors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-cyan-400 transition">
                  Workshops & Webinars
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('interview-prep')} className="hover:text-cyan-400 transition">
                  Interview Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition">
                  Campus & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200 mb-3.5">
              Hyderabad Campus
            </h5>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Design Silicon VLSI, HITEC City, Madhapur, Hyderabad, Telangana 500081
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="tel:+919848012345"
                  className="font-mono hover:text-white transition"
                >
                  +91 98480 12345 / 98765 11223
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href="mailto:admissions@dsv.com"
                  className="font-mono hover:text-white transition"
                >
                  admissions@dsv.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Design Silicon VLSI Academy. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>&bull;</span>
            <span>Terms of Training</span>
            <span>&bull;</span>
            <span>Academic Code of Ethics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
