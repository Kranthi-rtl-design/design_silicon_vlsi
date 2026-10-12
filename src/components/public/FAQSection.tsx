import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface FAQSectionProps {
  onOpenApply: () => void;
  onOpenChat: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenApply, onOpenChat }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do you offer online or offline classroom batches?',
      a: 'We offer both! Our state-of-the-art offline training center is located in HITEC City, Hyderabad. In addition, all lectures are streamed live online with interactive 2-way audio and high-performance remote cloud lab workstations with Synopsys/Questa toolchains.',
    },
    {
      q: 'I am a fresher from an ECE/EEE background. Can I join Advanced RTL or UVM?',
      a: 'Yes! We start with foundational digital design, timing parameters, and logic gates before advancing to pipelining, synthesizable RTL, and UVM OOP testbenches. No prior industrial VLSI experience is required, though passion for digital logic is essential.',
    },
    {
      q: 'How do lab exercises and EDA tool licenses work for students?',
      a: 'Enrolled students are provided with cloud-based Linux workstation instances with QuestaSim, Verilator, and synthesis toolchains pre-installed. You can access the labs from any Windows, Mac, or Linux computer using a standard web browser or SSH/VNC.',
    },
    {
      q: 'Can I pay the course fee in installments?',
      a: 'Yes. Course fees can be split into convenient installments (typically 50% upon admission and the remainder during the program). All payment records, invoices, and balances are transparently tracked in your student portal.',
    },
    {
      q: 'What kind of projects will I complete during the program?',
      a: 'You will design industrial-grade projects such as: (1) Parameterized Synchronous & Asynchronous Dual-Clock FIFOs, (2) 5-stage Pipelined RISC-V RV32I Processor Core with Hazard Units, (3) AXI4-to-APB Bridge with Outstanding Bursts, and (4) Complete UVM 1.2 Verification Environments with SVA Assertions and Functional Coverage.',
    },
    {
      q: 'How are technical interview preparations handled?',
      a: 'Throughout the cohort, we conduct regular technical grilling sessions where trainers evaluate your RTL coding speed, state machine glitch prevention, and setup/hold timing problem-solving on digital whiteboards—just like in tier-1 product company interviews.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-300">
            Everything you need to know about admissions, lab access, and our semiconductor programs.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm font-bold text-white leading-snug">{faq.q}</span>
                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-sky-950 to-slate-900 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-white">Have more questions about curriculum or dates?</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Chat directly with our course advisor or schedule a faculty callback.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenChat}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
            >
              Ask Advisor
            </button>
            <button
              onClick={onOpenApply}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-md shadow-cyan-500/20"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
