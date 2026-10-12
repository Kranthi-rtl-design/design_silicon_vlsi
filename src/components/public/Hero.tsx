import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  Activity,
  Play
} from 'lucide-react';
import { WaveformVisual } from '../common/WaveformVisual';

interface HeroProps {
  onExploreCourses: () => void;
  onOpenApply: () => void;
  onOpenChat: () => void;
  onOpenPreview: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCourses,
  onOpenApply,
  onOpenChat,
  onOpenPreview,
}) => {
  const [activeTab, setActiveTab] = useState<'board' | 'waveform'>('board');

  return (
    <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background Silicon Circuit Grids & Ambient Glows */}
      <div className="absolute inset-0 silicon-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-sky-600/10 via-cyan-500/15 to-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>FROM RTL TO REAL ASIC &bull; ADMISSIONS OPEN</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Design Silicon VLSI —{' '}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                From RTL to Real Silicon.
              </span>
            </h1>

            {/* Tagline Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 text-xs font-mono text-slate-400">
              {[
                'Shaping Engineers',
                'Powering Silicon Innovation',
                'Learn the Flow',
                'Practise the Skills',
                'Build the Future'
              ].map((tag, i) => (
                <span key={tag} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-cyan-700 select-none">·</span>}
                  <span className="text-slate-300">{tag}</span>
                </span>
              ))}
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Design Silicon VLSI provides deep, industry-grounded training in synthesizable RTL
              microarchitecture, SystemVerilog &amp; UVM verification, AMBA bus interconnects, and Static
              Timing Analysis (STA). Learn how real chips are specified, coded, simulated, and taped out.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 hover:border-cyan-500/50 transition flex items-center justify-center gap-2"
              >
                <span>Explore Courses</span>
              </button>

              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto px-4 py-3.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition"
              >
                Ask Course Advisor
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-800/80 text-left">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-lg font-bold text-cyan-400 font-mono">100%</div>
                <div className="text-[11px] text-slate-400">Synthesizable RTL</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-lg font-bold text-amber-400 font-mono">UVM 1.2</div>
                <div className="text-[11px] text-slate-400">Industry Testbenches</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-lg font-bold text-emerald-400 font-mono">0 Setup</div>
                <div className="text-[11px] text-slate-400">Slack Signoff Focus</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Switcher (Official DSV Board vs Live Waveform Analyzer) */}
          <div className="lg:col-span-6 space-y-3">
            {/* Visual View Mode Tabs */}
            <div className="flex items-center justify-between bg-slate-950/90 border border-slate-800 rounded-xl p-1.5 text-xs">
              <span className="text-[11px] font-mono text-slate-400 pl-2">
                SILICON WORKBENCH PREVIEW:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('board')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                    activeTab === 'board'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>SoC Silicon Architecture</span>
                </button>
                <button
                  onClick={() => setActiveTab('waveform')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
                    activeTab === 'waveform'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Logic Waveform Simulator</span>
                </button>
              </div>
            </div>

            {/* Visual Container */}
            {activeTab === 'board' ? (
              <div className="relative rounded-2xl border border-sky-500/30 overflow-hidden shadow-2xl bg-slate-950 group">
                <img
                  src="/images/dsv-hero-board.jpg"
                  alt="Design Silicon VLSI - From Code to Real Chip"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                {/* Floating Interactive Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-sky-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <div className="font-bold text-white">Full RTL-to-GDSII Methodology</div>
                      <div className="text-[10px] text-slate-400">Verilog RTL &bull; UVM DV &bull; Synthesis &bull; STA &bull; PnR</div>
                    </div>
                  </div>
                  <button
                    onClick={onOpenPreview}
                    className="px-3 py-1 rounded-lg bg-sky-500 text-slate-950 font-bold text-[11px] hover:bg-sky-400 transition"
                  >
                    View Flow
                  </button>
                </div>
              </div>
            ) : (
              <WaveformVisual />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
