import React, { useState } from 'react';
import { Quote, Sparkles, CheckCircle2, ChevronRight, X, Award } from 'lucide-react';
import { assetPath } from '../../utils/assetPath';

export const FounderMessage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-900/60 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Official Crest & Founder Portrait Card */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/10 group mb-4">
              <img
                src={assetPath('/images/dsv-crest-gold.jpg')}
                alt="Design Silicon VLSI Crest"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">Hari Krishna</h3>
              <p className="text-xs text-amber-400 font-mono">
                Founder &amp; Director
              </p>
              <p className="text-[11px] text-slate-400">
                16+ Years Experience &bull; Ex-Tier-1 Semiconductor Lead
              </p>
            </div>
          </div>

          {/* Right Column: Founder's Message */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-800 text-amber-300 text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>A NOTE FROM THE FOUNDER</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              "We Don't Teach Synthesizable Verilog from Textbooks. We Teach It from Silicon Failures."
            </h2>

            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                In the semiconductor industry, a single race condition or missed CDC synchronizer can
                brick a multimillion-dollar mask tapeout. Yet, most college graduates are taught
                Verilog as if it were a sequential scripting language like C or Python.
              </p>
              <p>
                I founded <strong>Design Silicon VLSI</strong> to break that disconnect. Here, you
                don't memorize code—you visualize propagation delays, setup/hold slack equations,
                and multiplexer trees behind every construct you type.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-300 font-semibold text-xs border border-cyan-500/30 transition flex items-center gap-2"
              >
                <span>Read Full Message</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-slate-400 font-mono hidden sm:block">
                &mdash; Hyderabad &bull; Silicon-Ready Curriculum
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Message Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[85vh]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/40 shrink-0">
                <img
                  src={assetPath('/images/dsv-crest-gold.jpg')}
                  alt="DSV Seal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Founder's Vision</h3>
                <p className="text-xs text-amber-400 font-mono">Hari Krishna &bull; Founder &amp; Director</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                When hiring fresh engineers into semiconductor teams, what distinguishes candidates is
                not how many syntax manuals they have read, but whether they understand what happens at
                the physical transistor level when a clock toggles.
              </p>
              <p>
                Can you explain why a hold time violation cannot be fixed by lowering clock frequency?
                Can you draw a 3-always-block FSM with registered outputs from memory without generating
                combinational glitches on the control signals? Can you design a dual-clock asynchronous
                FIFO with Gray code pointers and write the SDC false-path constraints yourself?
              </p>
              <p>
                At Design Silicon VLSI, every assignment is verified against industrial linting and
                timing standards. When you graduate, you don't just hold a certificate—you hold verified
                silicon-grade code repositories and the confidence to crack the toughest technical
                interviews in the industry.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
              >
                Close Message
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
