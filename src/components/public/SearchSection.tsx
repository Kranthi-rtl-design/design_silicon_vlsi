import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { storageService } from '../../services/storage';

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

const POPULAR_KEYWORDS = [
  'RTL Design',
  'Verilog HDL',
  'SystemVerilog',
  'UVM 1.2',
  'AXI4 Protocol',
  'CDC Signoff',
  'Static Timing (STA)',
  'RISC-V Core',
  'Physical Design'
];

export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const content = storageService.getSiteContent().search;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handlePillClick = (kw: string) => {
    setSearchTerm(kw);
    onSearch(kw);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 -mt-6 sm:-mt-8 mb-16">
      <div className="bg-slate-900/95 border border-sky-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={content.title}
              className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 hover:brightness-110 transition flex items-center justify-center gap-2 shrink-0"
          >
            <span>{content.description}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px] shrink-0">{content.eyebrow}</span>
          {POPULAR_KEYWORDS.map((kw) => (
            <button
              key={kw}
              onClick={() => handlePillClick(kw)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-sky-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition text-[11px]"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
