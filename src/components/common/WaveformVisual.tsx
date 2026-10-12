import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Zap, Play, Pause } from 'lucide-react';

export const WaveformVisual: React.FC = () => {
  const [clockCycle, setClockCycle] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setClockCycle((prev) => (prev + 1) % 16);
    }, 850);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Simulated digital signals over 16 clock cycles
  const signals = [
    {
      name: 'CLK_100M',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500',
      type: 'clock',
      values: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    },
    {
      name: 'RST_N',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500',
      type: 'binary',
      values: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      name: 'AXI_TVALID',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500',
      type: 'binary',
      values: [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    },
    {
      name: 'AXI_TREADY',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500',
      type: 'binary',
      values: [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    },
    {
      name: 'TDATA[31:0]',
      color: 'text-sky-300',
      bgColor: 'bg-sky-500',
      type: 'bus',
      values: ['Z', 'Z', 'Z', '0xCAFE', '0xCAFE', '0xBEEF', 'Z', 'Z', '0x4001', '0x4002', '0x4003', '0x4004', 'Z', 'Z', '0xDEAD', '0xBEEF'],
    },
    {
      name: 'FIFO_EMPTY',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500',
      type: 'binary',
      values: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  return (
    <div className="relative rounded-2xl border border-sky-500/20 bg-slate-950/90 p-5 shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs selection:bg-cyan-500 selection:text-black">
      {/* Circuit background traces */}
      <div className="absolute inset-0 silicon-grid-dense opacity-30 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-sky-950/80 border border-sky-500/30 text-sky-400">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-100 flex items-center gap-2 font-sans">
              RTL Logic Analyzer & Timing Simulator
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                LIVE CDC / STA
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Design: <span className="text-cyan-400">axi_fifo_sync_v2.sv</span> | Time: {clockCycle * 10}ns
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-white transition text-[11px]"
          >
            {isRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>Cycle {clockCycle + 1}/16</span>
          </div>
        </div>
      </div>

      {/* Waveform View Area */}
      <div className="space-y-3 relative z-10 overflow-x-auto pb-1">
        {signals.map((sig) => {
          const currentValue = sig.values[clockCycle];
          return (
            <div key={sig.name} className="flex items-center gap-3 group">
              {/* Signal Name Label */}
              <div className="w-28 shrink-0 flex items-center justify-between text-[11px]">
                <span className={`font-semibold ${sig.color}`}>{sig.name}</span>
                <span className="text-[10px] text-slate-400 px-1 py-0.5 rounded bg-slate-900/60 border border-slate-800">
                  {currentValue}
                </span>
              </div>

              {/* Graphical Waveform Track */}
              <div className="flex-1 flex items-center h-8 bg-slate-900/50 rounded border border-slate-800/80 px-1 relative">
                {/* Active Clock Marker vertical line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-cyan-400/80 z-20 transition-all duration-300 shadow-[0_0_8px_#38bdf8]"
                  style={{ left: `${((clockCycle + 0.5) / 16) * 100}%` }}
                />

                {/* Signal segments */}
                <div className="grid grid-cols-16 w-full h-full items-center">
                  {sig.values.map((val, idx) => {
                    const isCurrent = idx === clockCycle;
                    if (sig.type === 'clock') {
                      return (
                        <div key={idx} className="h-full flex items-center justify-center relative">
                          <div
                            className={`w-full h-5 border-t-2 border-r-2 ${
                              val === 1
                                ? 'border-cyan-400 bg-cyan-500/10'
                                : 'border-cyan-400/40 bg-transparent translate-y-2'
                            } ${isCurrent ? 'ring-1 ring-cyan-300' : ''}`}
                          />
                        </div>
                      );
                    }

                    if (sig.type === 'binary') {
                      return (
                        <div key={idx} className="h-full flex items-center justify-center relative">
                          <div
                            className={`w-full transition-all ${
                              val === 1
                                ? `h-4 rounded-sm ${sig.bgColor}/30 border-t-2 border-b-2 border-emerald-400`
                                : 'h-0.5 bg-slate-700 translate-y-1.5'
                            } ${isCurrent ? 'brightness-125' : ''}`}
                          />
                        </div>
                      );
                    }

                    // Bus type
                    return (
                      <div key={idx} className="h-full flex items-center justify-center relative px-0.5">
                        <div
                          className={`w-full h-5 rounded flex items-center justify-center text-[8px] font-mono border ${
                            val === 'Z'
                              ? 'border-dashed border-slate-700 text-slate-600 bg-slate-950/40'
                              : 'border-sky-400/60 bg-sky-950/50 text-sky-200'
                          } ${isCurrent ? 'ring-1 ring-sky-300 font-bold' : ''}`}
                        >
                          {val === 'Z' ? 'Hi-Z' : String(val).slice(2, 6)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RTL Pipeline Footer Status */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Synthesis Ready: <span className="text-emerald-400">0 Setup / 0 Hold Slack Violations</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">
            Frequency Target: <span className="text-cyan-300">650 MHz @ TSMC N7</span>
          </span>
        </div>
        <div className="text-[10px] text-slate-500 font-sans">
          Pure Synthesizable Verilog &bull; No Inferred Latches
        </div>
      </div>
    </div>
  );
};
