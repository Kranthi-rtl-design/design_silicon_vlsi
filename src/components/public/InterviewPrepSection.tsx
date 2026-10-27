import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { storageService } from '../../services/storage';

interface InterviewPrepProps {
  onOpenApply: () => void;
}

export const InterviewPrepSection: React.FC<InterviewPrepProps> = ({ onOpenApply }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const content = storageService.getSiteContent().interviewPrep;

  const questions = [
    {
      q: 'Why does lowering the clock frequency fix setup time violations but never fix hold time violations?',
      category: 'Static Timing Analysis (STA)',
      answer: `In synchronous design, the setup constraint is:
T_clk >= T_cq + T_comb(max) + T_setup - T_skew.
Because T_clk (the clock period) appears directly in this inequality, increasing T_clk (lowering the frequency) gives the combinational logic more time to stabilize before the next clock edge.

Conversely, the hold time constraint is:
T_cq(min) + T_comb(min) >= T_hold + T_skew.
Notice that T_clk is completely absent from this equation! Hold time is evaluated with respect to the SAME active clock edge. Therefore, even if you slow the clock down to 1 Hz, if the data changes too quickly before T_hold expires, the receiving register will capture invalid/metastable data.`,
    },
    {
      q: 'How do you design a divide-by-3 clock divider with a 50% duty cycle in synthesizable RTL?',
      category: 'RTL Microarchitecture',
      answer: `Dividing by an odd integer with a 50% duty cycle requires using both edges of the master clock (posedge and negedge).
1. Create a modulo-3 counter on posedge clk that generates a pulse of width 1 clock cycle.
2. Sample this pulse with a flip-flop clocked on negedge clk (or a dual-phase counter).
3. OR or XOR the two waveforms together.
Since the posedge signal is high for 1 cycle and the negedge signal is shifted by half a cycle, their combination creates an output pulse that is high for exactly 1.5 clock cycles out of 3 cycles—achieving an exact 50% duty cycle.`,
    },
    {
      q: 'Why are Gray codes mandatory for pointer comparison across asynchronous clock domains in dual-clock FIFOs?',
      category: 'Clock Domain Crossing (CDC)',
      answer: `When passing multi-bit binary counter values across asynchronous clock boundaries, standard binary counters can toggle multiple bits simultaneously (for example, transitioning from 0111 to 1000 toggles all 4 bits).
Because of slight routing skews and differing cell delays, the destination clock domain's synchronizer flip-flops might sample intermediate transient states (like 0000 or 1111) due to metastability.

In contrast, Gray codes are mathematically guaranteed to toggle exactly ONE bit per adjacent transition. If an asynchronous clock samples during a transition, it can only sample either the old pointer value or the new pointer value—it can never sample a corrupt random state.`,
    },
    {
      q: 'In AXI4, why does the Slave drive RVALID independently while the Master drives BREADY?',
      category: 'AMBA Bus Protocols',
      answer: `In the AXI4 handshake protocol, deadlocks are prevented by strict dependency rules.
For read transactions:
- The Master initiates by asserting ARVALID.
- The Slave returns data by asserting RVALID and must NOT wait for RREADY to be asserted first.
For write transactions:
- The Master transmits address (AW) and data (W).
- The Slave returns the write response (BVALID). The Master must assert BREADY to acknowledge completion.
This decouples backpressure and guarantees that neither master nor slave enters an unresolvable circular dependency.`,
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug pt-1">
                      {item.q}
                    </h3>
                  </div>

                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 shrink-0 mt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/50">
                    <div className="whitespace-pre-line font-sans">{item.answer}</div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Taught with full Verilog lab simulations in our Advanced RTL Program</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-base font-bold text-white">Want the Full 250+ Question Silicon Bank?</div>
            <div className="text-xs text-slate-300 mt-0.5">
              Includes Verilog FSM problem sets, STA timing graphs, and UVM testbench debugging cases.
            </div>
          </div>
          <button
            onClick={onOpenApply}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-md shrink-0"
          >
            Enroll for Interview Cohort
          </button>
        </div>
      </div>
    </section>
  );
};
