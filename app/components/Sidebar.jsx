'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  // HIDING NON-JOB ROUTES PER USER REQUEST
  // {
  //   label: 'Dashboard',
  //   href: '/search',
  //   icon: (
  //     <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: 'All Jobs',
  //   href: '/all-jobs',
  //   icon: (
  //     <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  //     </svg>
  //   ),
  // },
  {
    label: 'Jobs',
    href: '/jobs',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  // {
  //   label: 'AI Jobs',
  //   href: '/ai-jobs',
  //   icon: (
  //     <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: 'Resources',
  //   href: '#',
  //   icon: (
  //     <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: 'My Profile',
  //   href: '/profile',
  //   icon: (
  //     <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  //     </svg>
  //   ),
  // },
];

export default function Sidebar({ user = null, onLogOut = null }) {
  const pathname = usePathname();

  return (
    <aside className="w-[185px] h-screen bg-[#f4f5fa] border-r border-zinc-200 flex flex-col shrink-0 sticky top-0 z-30 font-sans">
      {/* Brand Header */}
      <div className="px-4 py-5 border-b border-zinc-200/60">
        <div className="flex items-center gap-1.5">
          {/* Green logo icon */}
          <div className="w-6 h-6 rounded bg-[#008738] flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <div>
            <span className="text-[13px] font-black tracking-tight text-zinc-900 leading-none block">
              JobHunt<span className="text-[#008738]">10x</span><span className="text-zinc-500 font-bold">.ai</span>
            </span>
            <span className="text-[9px] text-zinc-400 font-semibold block mt-0.5 leading-none">Career Platform</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 py-5 flex flex-col gap-1">
        {navItems.map((item) => {
          // Check active state
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] font-bold transition-all relative ${
                isActive
                  ? 'text-[#008738]'
                  : 'text-[#4b5563] hover:bg-zinc-200/50 hover:text-zinc-800'
              }`}
            >
              <span className={`shrink-0 ${isActive ? 'text-[#008738]' : 'text-zinc-400'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>

              {/* Active Indicator Bar on the Right Edge */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[4px] h-5 bg-[#008738] rounded-l-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Action Buttons at the Bottom */}
      <div className="px-3 pb-3">
        <button className="w-full bg-[#008738] hover:bg-[#00702e] text-white text-[11px] font-bold py-2.5 rounded-lg transition-colors shadow-sm shadow-[#008738]/20 cursor-pointer">
          Upload Resume
        </button>
      </div>

      {/* Settings, Support, Logout */}
      <div className="px-3 pb-4 border-t border-zinc-200/60 pt-3 flex flex-col gap-0.5">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-bold text-[#4b5563] hover:bg-zinc-200/50 hover:text-zinc-800 transition-all w-full text-left cursor-pointer">
          <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </button>

        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-bold text-[#4b5563] hover:bg-zinc-200/50 hover:text-zinc-800 transition-all w-full text-left cursor-pointer">
          <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Support
        </button>

        {onLogOut && (
          <button
            onClick={onLogOut}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-bold text-[#4b5563] hover:bg-red-50 hover:text-red-600 transition-all w-full text-left cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
