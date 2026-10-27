import React, { useState } from 'react';
import {
  Play,
  FileCode,
  FileText,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Laptop,
  GraduationCap
} from 'lucide-react';
import { storageService } from '../../services/storage';

interface ELearningPreviewProps {
  onOpenAuth: () => void;
  onExploreCourses: () => void;
}

export const ELearningPreview: React.FC<ELearningPreviewProps> = ({
  onOpenAuth,
  onExploreCourses,
}) => {
  const [selectedDemoTab, setSelectedDemoTab] = useState<'video' | 'verilog' | 'assignment'>('verilog');
  const content = storageService.getSiteContent().eLearning;

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono">
            <Laptop className="w-3.5 h-3.5" />
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* LMS Interface Mockup */}
        <div className="rounded-2xl border border-sky-500/30 bg-slate-950 shadow-2xl overflow-hidden font-mono">
          {/* Mock Browser Header */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 ml-2 font-mono hidden sm:inline">
                https://portal.designsiliconvlsi.com/classroom/module-01
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE COHORT
              </span>
              <button
                onClick={onOpenAuth}
                className="px-3 py-1 text-xs font-semibold rounded bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
              >
                Sign In to LMS
              </button>
            </div>
          </div>

          {/* Classroom Layout Simulation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            {/* Left Module Sidebar Simulation */}
            <div className="lg:col-span-4 bg-slate-900/70 border-r border-slate-800 p-4 space-y-3 font-sans">
              <div className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                Module 1: RTL Microarchitecture
              </div>

              <div className="space-y-1.5 text-xs">
                <div
                  onClick={() => setSelectedDemoTab('video')}
                  className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                    selectedDemoTab === 'video'
                      ? 'bg-slate-800 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-cyan-400" />
                    <span>1.1 CMOS Delays &amp; Clocks</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Watched</span>
                </div>

                <div
                  onClick={() => setSelectedDemoTab('verilog')}
                  className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                    selectedDemoTab === 'verilog'
                      ? 'bg-slate-800 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>1.2 Synthesizable RTL Lab</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300">Active</span>
                </div>

                <div
                  onClick={() => setSelectedDemoTab('assignment')}
                  className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                    selectedDemoTab === 'assignment'
                      ? 'bg-slate-800 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>1.3 Sync FIFO Assignment</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300">Due in 4d</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                Overall Course Progress: <strong className="text-white">42%</strong>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[42%]" />
                </div>
              </div>
            </div>

            {/* Main Classroom Content Viewer */}
            <div className="lg:col-span-8 p-6 bg-slate-950 flex flex-col justify-between font-mono">
              {selectedDemoTab === 'verilog' && (
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-300 font-bold">
                      fifo_sync_parameterized.sv &bull; Verilog-2001 Synthesizable
                    </span>
                    <span className="text-[11px] text-cyan-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                      SYNTHESIS APPROVED
                    </span>
                  </div>

                  <pre className="text-xs text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{`// Parameterized Synchronous FIFO Microarchitecture
module sync_fifo #(
    parameter DATA_WIDTH = 32,
    parameter FIFO_DEPTH = 16
)(
    input  wire                  clk,
    input  wire                  rst_n,
    input  wire                  wr_en,
    input  wire [DATA_WIDTH-1:0] wr_data,
    input  wire                  rd_en,
    output wire [DATA_WIDTH-1:0] rd_data,
    output wire                  full,
    output wire                  empty
);
    // Write and Read Pointer Registers with Wrap Bit
    reg [$clog2(FIFO_DEPTH):0] wr_ptr, rd_ptr;
    // Internal dual-port memory array...`}
                  </pre>
                </div>
              )}

              {selectedDemoTab === 'video' && (
                <div className="space-y-4">
                  <div className="aspect-video w-full bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center mb-3">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                    <div className="text-sm font-bold text-white font-sans">
                      Session 1.1: CMOS Gate Delays &amp; Setup/Hold Equation Proofs
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-1">
                      Instructor: DSV Training Team &bull; 4K Digital Master &bull; 25 mins
                    </div>
                  </div>
                </div>
              )}

              {selectedDemoTab === 'assignment' && (
                <div className="space-y-3 font-sans">
                  <div className="text-sm font-bold text-white">
                    Assignment #1: Parameterized Synchronous FIFO Implementation
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Write clean synthesizable RTL for a synchronous FIFO supporting almost_full and
                    almost_empty thresholds. Upload your <code className="text-cyan-300">.v</code> and{' '}
                    <code className="text-cyan-300">_tb.v</code> files.
                  </p>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                    <div>&bull; Max Marks: 100</div>
                    <div>&bull; Grading Rubric: Zero Latches, Registered Outputs, 100% Coverage</div>
                  </div>
                </div>
              )}

              {/* Classroom Control Bar */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-sans">
                <span className="text-slate-400 text-[11px]">
                  Enrolled student workspace preview
                </span>
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold hover:brightness-110 transition flex items-center gap-1.5"
                >
                  <span>Access Learner Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
