'use client';

import React from 'react';

// EmptyState component to render uniform error, initial landing, or empty result sets
export default function EmptyState({ type = 'ready', message = '', title = '' }) {
  if (type === 'error') {
    const displayTitle = title || (message.includes('No jobs found') ? 'No Jobs Found' : 'Search Pipeline Error');
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6 flex items-start gap-4 shadow-sm relative overflow-hidden font-sans">
        <div className="shrink-0 w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-[13px] font-black text-red-700 mb-0.5">{displayTitle}</h3>
          <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">
            {message || 'An unexpected error occurred during the search. Please verify backend configurations.'}
          </p>
          <div className="mt-2.5 flex gap-2">
            <span className="text-[9px] bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded font-mono font-bold">
              STATUS: FAILED
            </span>
            <span className="text-[9px] bg-zinc-100 text-zinc-500 border border-zinc-200 px-2 py-0.5 rounded font-mono font-bold">
              Search Engine
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'no-matches') {
    return (
      <div className="bg-white border border-dashed border-zinc-350 rounded-2xl p-12 text-center text-zinc-500 flex flex-col items-center justify-center min-h-[350px] font-sans">
        <svg className="w-10 h-10 text-zinc-350 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h4 className="text-[13px] font-black text-zinc-800">No profile matches found</h4>
        <p className="text-[11px] text-zinc-400 mt-1 max-w-sm font-semibold leading-normal">
          No live job openings match the entered preferred roles and skills filter criteria.
        </p>
      </div>
    );
  }

  if (type === 'profile-loading') {
    return (
      <div className="bg-white border border-dashed border-zinc-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[420px] font-sans">
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4 border border-emerald-100 animate-pulse">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-[13px] font-black text-zinc-800">Loading your profile...</h3>
        <p className="text-[11px] text-zinc-400 mt-1 max-w-xs font-semibold leading-relaxed">
          Fetching preferred role, skills, and experience to start AI job matching.
        </p>
      </div>
    );
  }

  if (type === 'profile-incomplete') {
    return (
      <div className="bg-white border border-dashed border-amber-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[420px] font-sans">
        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-4 border border-amber-200">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-[13px] font-black text-zinc-800">Complete your profile first</h3>
        <p className="text-[11px] text-zinc-400 mt-1 max-w-sm font-semibold leading-relaxed">
          Add your preferred role, core skills, and work experience on the profile page. AI will use that data to search LinkedIn and Naukri.
        </p>
      </div>
    );
  }

  // Default: 'ready' / initial state
  return (
    <div className="bg-white border border-dashed border-zinc-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[420px] font-sans">
      <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 mb-4 border border-zinc-200">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-[13px] font-black text-zinc-800">Starting AI search...</h3>
      <p className="text-[11px] text-zinc-400 mt-1 max-w-xs font-semibold leading-relaxed">
        Jobs will be fetched from LinkedIn and Naukri based on your saved profile.
      </p>
    </div>
  );
}
