'use client';

import React from 'react';

// EmptyState component to render uniform error, initial landing, or empty result sets
export default function EmptyState({ type = 'ready', message = '' }) {
  if (type === 'error') {
    return (
      <div className="bg-red-950/20 border border-red-800/40 rounded-xl p-6 mb-6 flex items-start gap-4 shadow-lg backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="shrink-0 w-10 h-10 rounded-full bg-red-950/60 border border-red-800/50 flex items-center justify-center text-red-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-red-300 mb-1">AI Scoring Engine Offline</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {message || 'Groq connection failed or key has expired. Please verify environment keys.'}
          </p>
          <div className="mt-3 flex gap-2">
            <span className="text-[10px] bg-red-950/50 text-red-400 border border-red-900/30 px-2 py-0.5 rounded font-mono font-semibold">
              STATUS: ERROR
            </span>
            <span className="text-[10px] bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded font-mono">
              Groq Llama 3 Required
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'no-matches') {
    return (
      <div className="bg-[#1d2226] border border-[#2f353e] rounded-xl p-12 text-center text-zinc-500 flex flex-col items-center justify-center min-h-[350px]">
        <svg className="w-10 h-10 text-zinc-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h4 className="text-sm font-bold text-zinc-300">No profile matches found</h4>
        <p className="text-xs text-zinc-500 mt-1 max-w-sm leading-normal">
          No live job openings match the entered preferred roles and skills filter criteria.
        </p>
      </div>
    );
  }

  // Default: 'ready' / initial state
  return (
    <div className="bg-[#1d2226] border border-dashed border-[#2f353e] rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[450px]">
      <div className="w-14 h-14 rounded-full bg-[#12161a] flex items-center justify-center text-zinc-400 mb-4 border border-[#2f353e]">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-sm font-bold text-zinc-300">Ready to Fetch</h3>
      <p className="text-xs text-zinc-500 mt-1.5 max-w-xs leading-relaxed">
        Enter your target role, experience, and key skills, then click search to crawl matching openings from LinkedIn & Naukri.
      </p>
    </div>
  );
}
