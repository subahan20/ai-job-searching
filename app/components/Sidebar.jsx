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
            myapp
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
          {/* Home Icon */}
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>myapp</span>
        </Link>

        <Link
          href="/all-jobs"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            pathname === '/all-jobs'
              ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
              : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'
          }`}
        >
          {/* Briefcase Icon */}
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>all jobs</span>
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
