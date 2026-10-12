import React, { useState } from 'react';
import { assetPath } from '../../utils/assetPath';
import {
  Cpu,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
  Terminal,
  Activity,
  CheckCircle2,
  Box,
  Compass
} from 'lucide-react';

interface LearningPathProps {
  onSelectCourse: (courseId: string) => void;
  onOpenApply: () => void;
}

export const LearningPathVisualizer: React.FC<LearningPathProps> = ({
  onSelectCourse,
  onOpenApply,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Digital Design Fundamentals',
      domain: 'Foundation',
      description: 'CMOS logic, setup/hold slack, propagation delays, flip-flops, and clock skew principles.',
      skills: ['Boolean Algebra', 'Setup/Hold Equations', 'Clock Skew & Jitter', 'Metastability Basics'],
      courseId: 'course-1',
    },
    {
      num: '02',
      title: 'Synthesizable Verilog HDL',
      domain: 'RTL Coding',
      description: 'Microarchitecture modeling with Verilog-2001, blocking vs non-blocking, pipeline registers, and complex FSMs.',
      skills: ['Synthesizable Subsets', '3-Block FSM Architecture', 'Pipelining & Latency', 'Sync Reset vs Async Reset'],
      courseId: 'course-1',
    },
    {
      num: '03',
      title: 'SystemVerilog & UVM 1.2',
      domain: 'Design Verification',
      description: 'Constrained random verification, OOP architecture, assertions (SVA), coverage models, and UVM scoreboards.',
      skills: ['SV OOP Classes', 'Randomization & Constraints', 'SVA Assertions', 'UVM Scoreboards & Agents'],
      courseId: 'course-2',
    },
    {
      num: '04',
      title: 'Bus Protocols (AMBA AXI4 / APB)',
      domain: 'Interconnects',
      description: 'Master/Slave handshake, 5-channel AXI4, out-of-order transfers, burst types, and bridge design.',
      skills: ['AXI4 5 Channels', 'READY/VALID Protocol', 'Burst Wrapping', 'APB4 Bridge Design'],
      courseId: 'course-3',
    },
    {
      num: '05',
      title: 'Linting & CDC Structural Signoff',
      domain: 'RTL Cleanliness',
      description: 'SpyGlass lint rules, structural CDC crossing analysis, 2-FF synchronizers, and FIFO gray-code math.',
      skills: ['SpyGlass Linter Rules', 'Clock Domain Crossing', 'MTBF Analysis', 'Gray Code Pointer Math'],
      courseId: 'course-4',
    },
    {
      num: '06',
      title: 'Synthesis & Static Timing (STA)',
      domain: 'Implementation',
      description: 'Synopsys Design Compiler, PrimeTime concepts, SDC timing constraints, setup/hold slack closure, and false paths.',
      skills: ['SDC create_clock', 'Input/Output Delays', 'Multicycle Paths', 'Setup/Hold Slack Closure'],
      courseId: 'course-4',
    },
    {
      num: '07',
      title: 'SoC Integration & RISC-V',
      domain: 'Microarchitecture',
      description: 'Designing a 5-stage pipelined RV32I RISC-V processor core with forwarding and hazard detection units.',
      skills: ['RV32I ISA Specs', '5-Stage Datapath', 'Hazard Unit & Forwarding', 'C-Code Hardware Execution'],
      courseId: 'course-5',
    },
    {
      num: '08',
      title: 'Physical Design & Tapeout Flow',
      domain: 'Silicon Signoff',
      description: 'Floorplanning, Power planning, Placement, Clock Tree Synthesis (CTS), Routing, and GDSII generation.',
      skills: ['Floorplan & Power Straps', 'CTS Clock Skew', 'Routing & Congestion', 'DRC/LVS & GDSII'],
      courseId: 'course-6',
    },
    {
      num: '09',
      title: 'Interview Preparation & Cracking',
      domain: 'Career Readiness',
      description: 'Mock technical grilling on FSM glitches, clock dividers, async FIFO depths, and setup/hold timing problems.',
      skills: ['Real Company Question Bank', 'EDA Coding Challenges', 'Waveform Debug Drills', '1-on-1 Faculty Mock'],
      courseId: 'course-1',
    },
  ];

  const current = steps[activeStep];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>STRUCTURED SILICON LEARNING PATH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            From Digital Logic to Tapeout Signoff
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Follow our proven 9-stage engineering roadmap. Each phase builds upon the previous,
            ensuring you think in hardware rather than abstract software code.
          </p>
        </div>

        {/* Featured Visual Infographic from User's uploaded asset */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-sky-500/30 shadow-2xl bg-slate-950">
          <img
            src={assetPath('/images/dsv-soc-arc.jpg')}
            alt="Design Silicon VLSI - Complete RTL to Real ASIC Progression"
            className="w-full h-auto object-cover"
          />
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Official DSV ASIC Roadmap Flow</span>
            <span className="text-cyan-400">RTL Design &rarr; DV &rarr; Synthesis &rarr; STA &rarr; PnR &rarr; DFT &rarr; GDSII &rarr; Real Silicon</span>
          </div>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps Timeline Navigation (Left) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 mb-2">
              Select Phase to Inspect Curriculum:
            </div>
            {steps.map((s, idx) => {
              const isSelected = idx === activeStep;
              return (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-950/40 translate-x-1'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {s.num}
                    </span>
                    <div>
                      <div
                        className={`text-xs sm:text-sm font-bold ${
                          isSelected ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {s.title}
                      </div>
                      <div className="text-[11px] text-cyan-400/90 font-mono">{s.domain}</div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition ${
                      isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Step Detail Card (Right) */}
          <div className="lg:col-span-7 bg-slate-900/95 border border-sky-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-950 text-cyan-300 border border-sky-800">
                  PHASE {current.num} OF 09 &bull; {current.domain.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {current.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {current.description}
            </p>

            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Core Competencies Acquired:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => onSelectCourse(current.courseId)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <span>View Associated Program</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                <span>Apply for this Phase</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
