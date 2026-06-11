'use client';

import React, { useRef, useEffect } from 'react';

// SearchingState component to visualize real-time web crawling and AI scoring logs
export default function SearchingState({ searchProgress = 0, searchLogs = [] }) {
  const logContainerRef = useRef(null);

  // Auto-scroll log feed to the bottom as new logs are added
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [searchLogs]);

  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 text-center flex flex-col items-center gap-5 shadow-sm py-10 font-sans">
      {/* Animated green spinner */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-zinc-100" />
        <div className="absolute inset-0 rounded-full border-4 border-[#008738] border-t-transparent animate-spin" />
        <span className="text-[10px] font-mono font-bold text-zinc-500">{searchProgress}%</span>
      </div>

      <div className="flex flex-col gap-1 max-w-md">
        <h2 className="text-[14px] font-black text-zinc-900 tracking-tight">Synchronizing Active Job Openings</h2>
        <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">
          Crawling real-time indexes and assessing qualifications using Groq Llama 3 AI models. This may take up to 20 seconds.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-zinc-100 h-1.5 rounded-full overflow-hidden border border-zinc-200/50">
        <div 
          className="h-full bg-gradient-to-r from-[#008738] to-[#00aa4e] transition-all duration-300 rounded-full"
          style={{ width: `${searchProgress}%` }}
        />
      </div>

      {/* Log Feed Console (Light) */}
      <div className="w-full max-w-md bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-left font-mono">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-2">
          <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Scraper Event Console</span>
          <span className="w-2 h-2 rounded-full bg-[#008738] animate-pulse" />
        </div>
        <div 
          ref={logContainerRef}
          className="h-28 overflow-y-auto flex flex-col gap-1.5 scroll-smooth pr-1"
          style={{ scrollbarWidth: 'thin' }}
        >
          {searchLogs.map((log, index) => {
            const isError = log.includes('[ERROR]');
            return (
              <div 
                key={index} 
                className={`text-[9px] leading-relaxed font-semibold transition-all duration-300 flex items-start gap-1.5 ${isError ? 'text-red-600' : 'text-zinc-600'}`}
              >
                <span className={isError ? 'text-red-500 font-bold' : 'text-[#008738] font-bold'}>&gt;</span>
                <span>{log}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
