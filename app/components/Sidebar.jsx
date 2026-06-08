'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ user = null, onLogOut = null }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-zinc-900 border-r border-zinc-800/60 flex flex-col shrink-0 sticky top-0 z-30 selection:bg-blue-600/30">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
          <span className="text-white font-black text-base font-serif">in</span>
        </div>
        <div>
          <span className="text-sm font-black tracking-tight text-white block">
            ai jobs
          </span>
          <span className="text-[9px] text-zinc-500 font-semibold block leading-none">
            JobSync Client Portal
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            pathname === '/'
              ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
              : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'
          }`}
        >
          {/* Sparkles / AI Icon */}
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l1.5 4.5L11 9l-4.5 1.5L5 15l-1.5-4.5L-1 9l4.5-1.5L5 3zm13 9l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zm-5-6l.75 2.25L16 10l-2.25.75L13 13l-.75-2.25L10 10l2.25-.75L13 6z" />
          </svg>
          <span>ai jobs</span>
        </Link>

        <Link
          href="/all-jobs"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            pathname === '/all-jobs'
              ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
              : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'
          }`}
        >
          {/* Layout Grid Icon */}
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>my app</span>
        </Link>
      </nav>

      {/* User Actions */}
      {user && (
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/40 space-y-3">
          <div className="px-2">
            <span className="text-[9px] text-zinc-500 font-bold font-mono uppercase block">Logged in as</span>
            <span className="text-xs text-zinc-300 font-semibold truncate block max-w-full" title={user.email}>
              {user.email}
            </span>
          </div>
          <button
            onClick={onLogOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-850 hover:border-red-900/50 hover:bg-red-950/20 hover:text-red-400 text-zinc-400 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </aside>
  );
}
