'use client';

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Auth({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        // Supabase might have email confirmations enabled by default
        if (data?.user && !data.session) {
          setSuccessMsg('Account created successfully! Please check your email for the confirmation link.');
        } else if (data?.user && data.session) {
          setSuccessMsg('Registration successful! Welcome aboard.');
          if (onAuthSuccess) onAuthSuccess(data.user);
        } else {
          setSuccessMsg('Sign up complete! You can now log in.');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        if (data?.user) {
          setSuccessMsg('Welcome back!');
          if (onAuthSuccess) onAuthSuccess(data.user);
        }
      }
    } catch (err) {
      console.error('[Auth Error]', err);
      setErrorMsg(err.message || 'An authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (err) {
      console.error('[Google Auth Error]', err);
      setErrorMsg(err.message || 'An error occurred during Google sign in.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#1d2226] border border-[#2f353e] rounded-2xl shadow-2xl overflow-hidden relative z-10 mx-auto my-0">
      {/* Top Banner Gradient */}
      <div className="h-20 bg-gradient-to-r from-blue-700 via-indigo-800 to-violet-900 flex items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-serif font-black text-blue-700 text-base">
            in
          </div>
          <span className="text-xs font-black tracking-tight text-white uppercase font-sans">
            JobSync <span className="text-blue-300 font-extrabold">Portal</span>
          </span>
        </div>
        <span className="text-[10px] bg-white/10 text-white border border-white/20 px-2.5 py-0.5 rounded-full font-bold">
          Secure Access
        </span>
      </div>

      <div className="p-8 flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-lg font-bold text-white tracking-tight">
            {isSignUp ? 'Create a New Account' : 'Sign In to Your Account'}
          </h2>
          <p className="text-[11px] text-zinc-400 mt-1 leading-normal">
            {isSignUp
              ? 'Join JobSync to scrape, track, and match premium jobs using AI evaluation.'
              : 'Enter your credentials to manage active scrapes and match profiles.'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-950/45 border border-red-900/40 text-red-400 rounded-lg p-3 text-[11px] font-semibold leading-relaxed flex items-start gap-2 animate-shake">
            <span className="mt-0.5 select-none shrink-0">⚠️</span>
            <div>{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-950/45 border border-emerald-900/40 text-emerald-400 rounded-lg p-3 text-[11px] font-semibold leading-relaxed flex items-start gap-2">
            <span className="mt-0.5 select-none shrink-0">✅</span>
            <div>{successMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-email" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-password" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-lg shadow-blue-900/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : isSignUp ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
            <span className="bg-[#1d2226] px-3 text-zinc-500">Or Continue With</span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="w-full bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-950 disabled:opacity-50 text-white text-xs font-bold py-2.5 px-4 rounded-lg border border-zinc-800 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <div className="border-t border-zinc-850 pt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className="text-[11px] text-zinc-400 hover:text-blue-400 font-semibold transition-colors cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
