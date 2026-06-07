'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Auth from './Auth';
import { supabase } from '../lib/supabase';

export default function DashboardLayout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const syncProfile = async (user) => {
      if (!user) return;
      try {
        await supabase
          .from('profile')
          .upsert({
            id: user.id,
            email: user.email,
            last_sign_in: user.last_sign_in_at || new Date().toISOString(),
            provider: user.app_metadata?.provider || 'email',
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
      } catch (err) {
        console.error('[Supabase Profile Sync] Error:', err);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
        syncProfile(session.user);
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        syncProfile(session.user);
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-xs text-zinc-500 font-bold tracking-widest uppercase font-mono">Authenticating...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200 antialiased relative">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

        <main className="flex-grow w-full flex items-center justify-center relative z-10 p-4">
          <div className="w-full max-w-md">
            <Auth onAuthSuccess={(user) => setCurrentUser(user)} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans selection:bg-blue-600/30 selection:text-blue-200 antialiased relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar on the left */}
      <Sidebar user={currentUser} onLogOut={handleLogOut} />

      {/* Main Content Area on the right */}
      <div className="flex-grow h-screen overflow-y-auto flex flex-col relative z-10">
        {children}
      </div>
    </div>
  );
}
