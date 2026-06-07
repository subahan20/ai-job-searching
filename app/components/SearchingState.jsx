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
    <div className="bg-[#1d2226] border border-[#2f353e] rounded-xl p-8 text-center flex flex-col items-center gap-6 shadow-xl py-12">
      {/* Animated spinner */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        <span className="text-[10px] font-mono font-bold text-zinc-400">{searchProgress}%</span>
      </div>

      <div className="flex flex-col gap-1 max-w-md">
        <h2 className="text-sm font-bold text-white tracking-tight">Synchronizing Active Job Openings</h2>
        <p className="text-[11px] text-zinc-400 leading-normal">
          Crawling real-time indexes and assessing qualifications using Groq Llama 3 AI models. This may take up to 20 seconds.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-900">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-violet-600 transition-all duration-300 rounded-full"
          style={{ width: `${searchProgress}%` }}
        />
      </div>

      {/* Log Feed Console */}
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 rounded-lg p-4 text-left font-mono">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-2">
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Scraper Event Console</span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
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
                className={`text-[10px] leading-relaxed font-semibold transition-all duration-300 flex items-start gap-1.5 ${isError ? 'text-red-400' : 'text-zinc-400'}`}
              >
                <span className={isError ? 'text-red-500' : 'text-blue-500'}>&gt;</span>
                <span>{log}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
