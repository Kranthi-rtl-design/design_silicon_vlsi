import React from 'react';
import { Award, UserCheck, Cpu, ShieldCheck } from 'lucide-react';

interface TrainersSectionProps {
  onSelectCourse: (courseId: string) => void;
  onOpenApply: () => void;
}

export const TrainersSection: React.FC<TrainersSectionProps> = ({ onSelectCourse, onOpenApply }) => {
  const trainers = [
    {
      name: 'Bhavani Bhaskar',
      initials: 'BB',
      role: 'Principal RTL Architect & Founder',
      experience: '16+ Years in Semiconductor Silicon',
      bio: 'Pioneered complex SoC interconnects, RISC-V cores, and multi-clock FIFO microarchitectures. Veteran in RTL linting, SpyGlass CDC, and microarchitecture modeling.',
      expertise: ['Synthesizable RTL', 'Async FIFOs', 'SpyGlass CDC', 'RISC-V Microarchitecture', 'Static Timing (STA)'],
      gradient: 'from-sky-500 via-cyan-400 to-blue-600',
      badgeColor: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/60',
      courseLead: 'Advanced RTL Design & Microarchitecture',
      courseId: 'course-1',
    },
    {
      name: 'Komali',
      initials: 'K',
      role: 'Senior Design Verification (DV) Specialist',
      experience: '12+ Years in DV & Functional Verification',
      bio: 'Specialist in Constrained-Random Verification, SystemVerilog OOP, UVM 1.2 Testbench Architecture, and Assertion-Based Verification (SVA) for high-speed networking and memory controllers.',
      expertise: ['SystemVerilog OOP', 'UVM 1.2 Architecture', 'SVA Assertions', 'Functional Coverage', 'RAL Models'],
      gradient: 'from-amber-400 via-orange-400 to-rose-500',
      badgeColor: 'text-amber-300 border-amber-500/40 bg-amber-950/60',
      courseLead: 'SystemVerilog & UVM Verification Mastery',
      courseId: 'course-2',
    },
    {
      name: 'Afroz Khan',
      initials: 'AK',
      role: 'Physical Design & STA Signoff Lead',
      experience: '14+ Years in Backend & Protocol Architecture',
      bio: 'Hands-on lead in AMBA protocols (AXI4/APB/AHB), ASIC Floorplanning, Clock Tree Synthesis (CTS), and tapeout signoff down to TSMC 7nm / 5nm nodes.',
      expertise: ['AMBA AXI4 Protocols', 'Floorplanning & PDN', 'Clock Tree Synthesis (CTS)', 'Primetime STA Signoff', 'GDSII Signoff'],
      gradient: 'from-emerald-400 via-teal-400 to-cyan-500',
      badgeColor: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/60',
      courseLead: 'SoC Interconnects & Protocols / Physical Design',
      courseId: 'course-3',
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>EXPERT FACULTY &amp; MENTORS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Learn Directly from Practicing Chip Architects
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            No teaching assistants or theorists. Every session is led by senior architects who have
            taped out live silicon for tier-1 semiconductor companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Silicon IC Trainer Avatar */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${t.gradient} p-0.5 shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20 silicon-grid pointer-events-none" />
                      <span className={`text-xl font-black font-mono tracking-wider bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>
                        {t.initials}
                      </span>
                      <div className="w-4 h-0.5 bg-cyan-500/60 rounded-full mt-0.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition flex items-center gap-2">
                      <span>{t.name}</span>
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono leading-tight">{t.role}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t.experience}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {t.bio}
                </p>

                {/* Expertise Badges */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">
                    Core Specializations:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Lead Link */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-mono">Programs Mentored:</div>
                  <div className="text-xs font-semibold text-white truncate max-w-[190px]">
                    {t.courseLead}
                  </div>
                </div>

                <button
                  onClick={() => onSelectCourse(t.courseId)}
                  className="px-3 py-1.5 rounded-lg bg-sky-950/70 border border-sky-800 hover:border-cyan-400 text-cyan-300 text-xs font-semibold transition"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
