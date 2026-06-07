'use client';

import React from 'react';

// Header component featuring branding and auth details
export default function Header({ user = null, onLogOut = null }) {
  return (
    <header className="border-b border-zinc-900 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-40 py-4">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        {/* Branding Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
            <span className="text-white font-black text-lg font-serif">in</span>
          </div>
          <div>
            <span className="text-sm font-black tracking-tight text-white block">
              JobSync <span className="text-blue-500 font-extrabold">Profiles</span>
            </span>
            <span className="text-[9px] text-zinc-500 font-semibold block leading-none">Scraped Live from LinkedIn & Naukri</span>
          </div>
        </div>

        {/* Status indicator & Auth actions */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/20 border border-emerald-900/30 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Direct Scraper Active
          </span>

          {user && (
            <div className="flex items-center gap-3.5 pl-3.5 border-l border-zinc-805">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-zinc-500 font-bold font-mono">SIGNED IN AS</span>
                <span className="text-[11px] text-white font-semibold">{user.email}</span>
              </div>
              <button
                onClick={onLogOut}
                className="text-[10px] bg-zinc-900 border border-[#2f353e] hover:border-red-900/50 hover:bg-red-955/25 hover:text-red-400 text-zinc-400 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
