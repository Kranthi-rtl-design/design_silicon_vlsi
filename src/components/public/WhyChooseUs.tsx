import React from 'react';
import {
  Layers,
  Cpu,
  Terminal,
  Share2,
  Sliders,
  UserCheck,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const values = [
    {
      icon: Layers,
      title: 'Strong Fundamentals',
      subtitle: 'From Silicon Physics to Digital Abstraction',
      description:
        'We do not rush straight to syntax. We ground you deeply in flip-flop setup/hold timing limits, gate-level propagation delays, and CMOS transistor behavior.',
      color: 'from-sky-500/20 to-cyan-500/10',
      border: 'border-sky-500/30',
      iconColor: 'text-sky-400'
    },
    {
      icon: Cpu,
      title: 'Real RTL Thinking',
      subtitle: 'Synthesizable Hardware Modeling',
      description:
        'Software engineers write sequential code; hardware engineers design concurrent hardware structures. Master non-blocking rules, pipeline stalls, and clean FSMs without inferred latches.',
      color: 'from-cyan-500/20 to-teal-500/10',
      border: 'border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
    {
      icon: Terminal,
      title: 'Hands-on Practice',
      subtitle: 'No Toy Code, Real Projects',
      description:
        'Write 1000s of lines of production-grade Verilog and SystemVerilog. Build dual-clock asynchronous FIFOs, Gray code synchronizers, and pipelined RISC-V cores from scratch.',
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      icon: Share2,
      title: 'Industry Protocols',
      subtitle: 'AMBA AXI4, APB, AHB & PCIe',
      description:
        'Modern SoCs are interconnected by bus standards. Learn AXI4 5-channel handshakes, burst wrapping, outstanding transactions, and write self-checking protocol checkers.',
      color: 'from-amber-500/20 to-yellow-500/10',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    {
      icon: Sliders,
      title: 'EDA Tool Awareness',
      subtitle: 'QuestaSim, VCS, SpyGlass & PrimeTime',
      description:
        'Understand how industrial tools parse RTL, report linting errors, analyze Clock Domain Crossing (CDC) metastability, and perform Static Timing Analysis (STA) signoff.',
      color: 'from-purple-500/20 to-indigo-500/10',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400'
    },
    {
      icon: UserCheck,
      title: 'Dedicated Mentorship',
      subtitle: 'Direct Feedback from Chip Veterans',
      description:
        'Direct 1-on-1 code reviews with Principal RTL Architects and Senior Verification Specialists like Bhavani Bhaskar and Komali. We debug your testbenches with you.',
      color: 'from-rose-500/20 to-orange-500/10',
      border: 'border-rose-500/30',
      iconColor: 'text-rose-400'
    }
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono">
            <span>THE DESIGN SILICON PHILOSOPHY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Why Design Silicon VLSI?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            We don't teach rote textbook syntax or use unverified placement claims.
            We train engineers the way Tier-1 semiconductor design centers demand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className={`group relative rounded-2xl p-6 bg-slate-900/80 border ${v.border} hover:border-cyan-400/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-5 border border-slate-800 group-hover:scale-110 transition`}
                  >
                    <Icon className={`w-6 h-6 ${v.iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition">
                    {v.title}
                  </h3>
                  <div className="text-xs text-cyan-400 font-mono mb-3">{v.subtitle}</div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {v.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Verified Standard</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
