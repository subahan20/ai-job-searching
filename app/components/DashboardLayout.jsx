'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../store/profileActions';
import { resetProfile } from '../store/profileSlice';
import Sidebar from './Sidebar';
import Auth from './Auth';
import ProfileViewModal from './ProfileViewModal';
import { supabase } from '../lib/supabase';

export default function DashboardLayout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile?.data);
  const profileLoading = useSelector((state) => state.profile?.isLoading);
  const userIdRef = useRef(null);

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const syncAuthSession = (session) => {
    const userId = session?.user?.id;

    if (userId) {
      setCurrentUser(session.user);
      if (userIdRef.current !== userId) {
        userIdRef.current = userId;
        dispatch(fetchProfile({ force: true }));
      } else {
        dispatch(fetchProfile());
      }
      return;
    }

    userIdRef.current = null;
    setCurrentUser(null);
    dispatch(resetProfile());
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      syncAuthSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      syncAuthSession(session);
      setAuthLoading(false);
    });

    return () => { subscription.unsubscribe(); };
  }, [dispatch]);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
  };

  // Loading spinner
  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#f0eef8] overflow-hidden">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-[#008738]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-xs text-zinc-400 font-bold tracking-widest uppercase">Loading...</span>
        </div>
      </div>
    );
  }

  // Not logged in — show auth
  if (!currentUser) {
    return <Auth onAuthSuccess={(user) => setCurrentUser(user)} />;
  }

  // Dynamic Display Name & Initials
  const firstName = profileData?.first_name || '';
  const lastName = profileData?.last_name || '';
  let displayName = 'Guest';
  let initials = 'G';
  
  if (firstName || lastName) {
    displayName = `${firstName} ${lastName}`.trim();
    initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  } else if (currentUser?.user_metadata?.full_name) {
    displayName = currentUser.user_metadata.full_name;
    const parts = displayName.split(' ');
    initials = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : displayName.substring(0, 2).toUpperCase();
  } else if (currentUser?.email) {
    displayName = currentUser.email.split('@')[0];
    initials = displayName.substring(0, 2).toUpperCase();
  }

  // Fallback to "AR" if calculation yields empty (unlikely)
  if (!initials) initials = 'AR';

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex font-sans antialiased text-zinc-800">
      {/* Sidebar with the solid blue line */}
      <Sidebar user={currentUser} onLogOut={handleLogOut} />

      {/* Right side: top navbar + content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 bg-white border-b border-zinc-200/60 flex items-center px-6 gap-4 shrink-0 z-20">
          {/* Page Title in Green */}
          <h1 className="text-[17px] font-extrabold text-[#008738] mr-2">Dashboard</h1>

          {/* Search Bar (Hidden per user request) */}
          {/* <div className="flex-1 max-w-[320px]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for jobs, skills, or companies..."
                className="w-full pl-8.5 pr-4 py-1.5 text-[11px] bg-[#f3f4f9] border border-zinc-200/80 rounded-full text-zinc-700 placeholder-zinc-400 focus:outline-none focus:border-[#008738] focus:ring-1 focus:ring-[#008738]/20 transition-all font-semibold"
              />
            </div>
          </div> */}

          {/* Right section icons and user profile */}
          <div className="flex items-center gap-3.5 ml-auto">
            {/* Bell */}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-150 transition-colors text-zinc-650">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Chat/Message bubble */}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-150 transition-colors text-zinc-650">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            {/* Divider line */}
            <div className="w-[1px] h-6 bg-zinc-200" />

            {/* User Profile — opens full profile modal */}
            <button
              type="button"
              onClick={handleOpenProfileModal}
              className="flex items-center gap-2 cursor-pointer select-none rounded-lg px-1 py-1 hover:bg-zinc-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#fabd2f] flex items-center justify-center text-zinc-900 font-extrabold text-[12px] shadow-sm shrink-0 uppercase tracking-tighter">
                {initials}
              </div>
              <span className="text-[12px] font-bold text-zinc-800 leading-none mr-2">{displayName}</span>
            </button>

            <button
              type="button"
              onClick={handleLogOut}
              className="text-[11px] font-bold text-zinc-500 hover:text-red-600 transition-colors px-2"
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Main page content container */}
        <div className="flex-grow overflow-y-auto bg-[#f8f9fc]">
          {children}
        </div>
      </div>

      <ProfileViewModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profileData}
        isLoading={profileLoading}
        displayName={displayName}
        initials={initials}
      />
    </div>
  );
}
