import React from 'react';
import { Star, ShieldCheck, Quote, Building2, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Vikas Chennupati',
      role: 'RTL Design Engineer at Tier-1 Semiconductor MNC',
      batch: 'Advanced RTL Batch #22',
      quote:
        'Before DSV, I thought Verilog was just if-else and case statements. Bhavani Bhaskar sir completely rebuilt how I visualize hardware: clock tree delays, registered outputs, and async FIFO Gray code synchronization. In my interview, the entire technical round was on my DSV dual-clock FIFO project!',
      verified: true
    },
    {
      name: 'Sravani Manepalli',
      role: 'Design Verification Engineer',
      batch: 'UVM Mastery Cohort #16',
      quote:
        'Komali ma’am’s UVM sessions are pure gold. Building a complete UVM testbench with agents, scoreboards, and TLM analysis fifos from scratch gave me the confidence to debug real IP testbenches on day one of joining my company.',
      verified: true
    },
    {
      name: 'Aditya Deshmukh',
      role: 'ASIC Synthesis & STA Engineer',
      batch: 'STA Signoff Batch #10',
      quote:
        'STA is notoriously tricky because formulas in textbooks don’t explain why false paths or multi-cycle paths arise in real designs. The practical labs on SDC timing constraints and SpyGlass CDC analysis made all the difference.',
      verified: true
    }
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GENUINE STUDENT OUTCOMES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Alumni Feedback &amp; Silicon Outcomes
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Real feedback from engineers who transitioned into core semiconductor product roles.
            We honor our pledge never to advertise unverified claims.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl relative group hover:border-cyan-500/40 transition"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                    <p className="text-[11px] text-cyan-400 font-mono">{rev.role}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{rev.batch}</p>
                  </div>
                  <span title="Verified Graduate">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
