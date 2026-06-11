'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col gap-[5px] text-zinc-900 font-sans selection:bg-[#22c55e]/20 selection:text-[#16a34a] scroll-smooth">
      
      {/* ─── NAVIGATION BAR ────────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-zinc-150 py-4 px-6 md:px-12 sticky top-0 z-50 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center shadow-md shadow-[#22c55e]/20">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <span className="text-lg font-black tracking-tight text-zinc-950 flex items-center">
            JobHunt<span className="text-[#22c55e]">10X</span><span className="text-[10px] ml-0.5 bg-zinc-100 text-zinc-600 px-1 py-0.5 rounded font-mono font-bold">.ai</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600">
          <a href="#features" className="hover:text-zinc-950 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-zinc-950 transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-zinc-950 transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-zinc-950 transition-colors">FAQ</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/search" className="text-sm font-bold text-zinc-650 hover:text-zinc-950 transition-colors">
            Login
          </Link>
          <Link href="/search" className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 rounded-lg shadow-lg shadow-[#22c55e]/20 transition-all hover:scale-[1.02]">
            Get Started
          </Link>
        </div>
      </nav>

      {/* ─── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50/50 to-white pt-12 md:pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* AI badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-xs font-bold text-[#16a34a] mb-6">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              AI-Powered Job Portal — Find in Min
            </div>

            {/* Main title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 tracking-tight leading-[1.08] mb-6 font-sans">
              Get Hired <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#16a34a]">10X Faster.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8 max-w-xl">
              Leverage advanced AI agents to find matches, optimize resumes, and automate applications while you sleep. The future of career growth is here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
              <Link href="/search" className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-center px-8 py-3.5 rounded-xl shadow-xl shadow-[#22c55e]/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group">
                Explore Jobs Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/search" className="bg-white border border-zinc-200 hover:border-zinc-350 text-zinc-800 text-center font-bold px-8 py-3.5 rounded-xl hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
                Watch Demo
              </Link>
            </div>

            {/* Candidates Social Proof */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2">
                {[
                  '/images/landingPage/User.png',
                  '/images/landingPage/User1.png',
                  '/images/landingPage/User2.png'
                ].map((src, i) => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-white object-cover bg-zinc-100" src={src} alt={`User Avatar ${i}`} />
                ))}
              </div>
              <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e]" />
                10,000+ candidates already joined
              </span>
            </div>
          </div>

          {/* Right Column (Dashboard Preview Image & Floating Items) */}
          <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px]">
              
              {/* Top Right Verified badge */}
              <div className="absolute -top-3 -right-3 z-20 flex items-center gap-1 bg-[#22c55e] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-lg shadow-[#22c55e]/25">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Profile Verified
              </div>

              {/* Real Dashboard Preview Image */}
              <img 
                src="/images/landingPage/Dashboard Preview.png" 
                alt="JobHunt10X Dashboard Preview" 
                className="w-full h-auto rounded-3xl shadow-2xl border border-zinc-150/40 relative z-10 transition-all hover:scale-[1.01]" 
              />

              {/* Bottom Left Floating Notification */}
              <div className="absolute -bottom-6 -left-6 z-20 max-w-[260px] bg-white border border-zinc-150 rounded-2xl shadow-2xl p-4 flex items-start gap-3 animate-bounce-slow">
                <div className="w-8 h-8 rounded-lg bg-[#22c55e]/15 flex items-center justify-center text-[#22c55e] shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[8px] font-extrabold uppercase tracking-wider text-[#22c55e] block">Notification</span>
                  <h4 className="text-xs font-black text-zinc-950 block mt-0.5 leading-tight">Job Match Found!</h4>
                  <p className="text-[9px] text-zinc-500 mt-1 font-medium">Senior Product Designer at Google</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── GREEN STATS BANNER ───────────────────────────────────────────── */}
      <section className="bg-[#22c55e] py-8 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 grid grid-cols-3 gap-6 text-center">
          <div>
            <span className="text-3xl md:text-4xl font-black block">12k+</span>
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase opacity-90 block mt-1">Active Jobs</span>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-black block">80k+</span>
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase opacity-90 block mt-1">Applications</span>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-black block">24h</span>
            <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase opacity-90 block mt-1">Avg. Response</span>
          </div>
        </div>
      </section>

      {/* ─── PARTNER LOGOS SECTION ────────────────────────────────────────── */}
      <section className="py-12 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale hover:opacity-75 transition-opacity">
          {['Google', 'Figma', 'Meta', 'Amazon', 'Microsoft'].map((company, i) => (
            <span key={i} className="text-base md:text-lg font-black tracking-tighter text-zinc-500 font-serif">
              {company}
            </span>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight">How It Works</h2>
          <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto">Three Simple Steps to Get Hired</p>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 relative">
            {/* Visual connecting line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-[2px] bg-zinc-100 z-0" />
 
            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-[#22c55e]/25">
                1
              </div>
              <h3 className="text-lg font-bold text-zinc-900">Upload Profile</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2 max-w-xs">
                Sync your LinkedIn/Naukri profiles or upload your resume in seconds.
              </p>
            </div>
 
            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-[#22c55e]/25">
                2
              </div>
              <h3 className="text-lg font-bold text-zinc-900">AI Matching</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2 max-w-xs">
                Our agents scan millions of live jobs to find high-match positions.
              </p>
            </div>
 
            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-xl font-bold mb-6 shadow-lg shadow-[#22c55e]/25">
                3
              </div>
              <h3 className="text-lg font-bold text-zinc-900">Auto-Apply</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mt-2 max-w-xs">
                The system optimizes your resume and automatically drafts applications.
              </p>
            </div>
 
          </div>
        </div>
      </section>

      {/* ─── POWERFUL AI TOOLS (FEATURES) ─────────────────────────────────── */}
      <section id="features" className="py-20 bg-zinc-50/50 border-t border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-black text-zinc-950 tracking-tight">Powerful Tools</h2>
              <p className="text-sm text-zinc-500 mt-1">Everything you need to automate your job search.</p>
            </div>
            <Link href="/search" className="text-sm font-bold text-[#22c55e] hover:text-[#16a34a] flex items-center gap-1 hover:translate-x-0.5 transition-all">
              View all features
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-150 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-zinc-950">AI Search Engine</h4>
              <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">
                Scans LinkedIn, Naukri, and other major platforms in real-time.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-150 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-zinc-950">Resume Optimizer</h4>
              <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">
                Tailors your CV to match the target job description perfectly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-150 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-zinc-950">Auto-Apply</h4>
              <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">
                Submits your applications directly to employer portals.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-150 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-zinc-950">Performance Tracker</h4>
              <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">
                Monitor your match rates, application status, and responses.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS (SUCCESS STORIES) ───────────────────────────────── */}
      <section id="testimonials" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight">Success Stories</h2>
            <p className="text-sm text-zinc-500 mt-2">Hear from candidates who accelerated their careers with us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Success Card 1 */}
            <div className="bg-[#fcd34d]/90 text-zinc-950 p-6 rounded-2xl shadow-lg relative flex flex-col justify-between h-[280px] hover:scale-[1.01] transition-transform">
              <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border border-white/20 tracking-wider">
                EASY APPLY
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center font-bold text-sm mb-6">
                  JS
                </div>
                <p className="text-sm font-semibold leading-relaxed tracking-tight">
                  "The AI resume optimizer was a game-changer. I landed 3 interviews in my first week after being stuck for months."
                </p>
              </div>
              <div>
                <h4 className="text-xs font-black">James Smith</h4>
                <span className="text-[10px] opacity-80 block font-medium">Software Engineer at Figma</span>
              </div>
            </div>

            {/* Success Card 2 */}
            <div className="bg-[#fcd34d]/90 text-zinc-950 p-6 rounded-2xl shadow-lg relative flex flex-col justify-between h-[280px] hover:scale-[1.01] transition-transform">
              <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border border-white/20 tracking-wider">
                EASY APPLY
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center font-bold text-sm mb-6">
                  MK
                </div>
                <p className="text-sm font-semibold leading-relaxed tracking-tight">
                  "I love how easy it is to track everything. The automation felt like having a personal career assistant."
                </p>
              </div>
              <div>
                <h4 className="text-xs font-black">Mila Kapoor</h4>
                <span className="text-[10px] opacity-80 block font-medium">Product Manager at Uber</span>
              </div>
            </div>

            {/* Success Card 3 */}
            <div className="bg-[#fcd34d]/90 text-zinc-950 p-6 rounded-2xl shadow-lg relative flex flex-col justify-between h-[280px] hover:scale-[1.01] transition-transform">
              <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border border-white/20 tracking-wider">
                EASY APPLY
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center font-bold text-sm mb-6">
                  DW
                </div>
                <p className="text-sm font-semibold leading-relaxed tracking-tight">
                  "The quality of matches is significantly higher than other platforms. No more weeding through spam."
                </p>
              </div>
              <div>
                <h4 className="text-xs font-black">David Wu</h4>
                <span className="text-[10px] opacity-80 block font-medium">Data Scientist at Airbnb</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── MEASURE SUCCESS BEYOND RESUME (DARK SECTION) ────────────────── */}
      <section className="bg-[#0b0f19] text-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Tilted Mockup & Floating Badge) */}
          <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px]">
              
              {/* Dashboard Preview Image */}
              <img 
                src="/images/landingPage/Dashboard Preview.png" 
                alt="Measure Success Mockup" 
                className="w-full h-auto rounded-3xl shadow-2xl border border-zinc-800/60 relative z-10 transition-all hover:scale-[1.01]" 
              />

              {/* Floating Reduction Time Badge */}
              <div className="absolute -bottom-4 right-4 z-25 bg-[#22c55e] text-white px-4 py-2 rounded-xl shadow-lg border border-[#22c55e]/20 text-center font-mono">
                <span className="text-sm font-black block leading-none">85%</span>
                <span className="text-[8px] font-extrabold uppercase tracking-wider block mt-0.5 opacity-90">Reduction in Apply Time</span>
              </div>
            </div>
          </div>

          {/* Right Column (Texts & List) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-8">
              Measure Success Beyond the <br className="hidden sm:inline" /> Resume.
            </h2>

            <div className="space-y-6 max-w-xl">
              
              {/* Item 1 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e] shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Velocity Tracking</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Monitor how fast you're moving through interview stages with real-time feedback loops.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e] shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A3.318 3.318 0 0114.17 21M5 19.128a9.38 9.38 0 01-2.625.372 9.337 9.337 0 01-4.121-.952 4.125 4.125 0 017.533-2.493M5 19.128v-.003a9.323 9.323 0 01.786-3.07M5 19.128v.109A3.318 3.318 0 005.83 21m1.995-1.858L5 19.128m1.995-1.858a9.324 9.324 0 011.878-3.03M7 19.128a9.3 9.3 0 01-2-1.284M7.825 21H9m-.175-1.858A9.324 9.324 0 0010.7 16.11M9 21a3.3 3.3 0 002.225-1.155M10.7 16.112c.501-.91.786-1.957.786-3.07v-.109a3.318 3.318 0 01.83-2.033" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Network Expansion</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Connect with recruiters specifically looking for your unique skill combination.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e] shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Market Sentiment</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Understand salary trends and demand for your role across global tech hubs.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─── PRICING SECTION ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight">
            Free to Explore. Credits for Premium Drives.
          </h2>
          <p className="text-sm text-zinc-500 mt-3 max-w-2xl mx-auto leading-relaxed">
            Start looking for jobs for free. Upgrade to Premium with free credits to unlock auto-application and AI optimization power.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-16 items-stretch">
            
            {/* Free Card */}
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between items-start text-left hover:scale-[1.01] transition-transform">
              <div className="w-full">
                <span className="text-base font-black text-zinc-950">Free Explorer</span>
                <span className="text-[10px] text-zinc-500 font-bold block mt-1">For the occasional job seeker.</span>
                <div className="my-6">
                  <span className="text-4xl font-black text-zinc-950">$0</span>
                  <span className="text-xs text-zinc-500 font-bold"> /mo</span>
                </div>
                
                <ul className="space-y-3.5 mb-8">
                  {[
                    'Unlimited Job Searches',
                    '3 AI Resume Optimizations',
                    'Standard Job Alerts'
                  ].map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-650 font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#22c55e]/15 flex items-center justify-center text-[#22c55e] shrink-0">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/search" className="w-full text-center border border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e]/5 font-bold text-xs py-3 rounded-lg transition-colors mt-auto">
                Start Free
              </Link>
            </div>

            {/* Premium Card */}
            <div className="bg-[#22c55e] text-white p-8 rounded-2xl shadow-xl shadow-[#22c55e]/15 flex flex-col justify-between items-start text-left relative overflow-hidden hover:scale-[1.01] transition-transform">
              <div className="absolute top-4 right-4 bg-white/20 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border border-white/20 tracking-wider">
                BEST VALUE
              </div>
              <div className="w-full">
                <span className="text-base font-black text-white">Elite Hunter</span>
                <span className="text-[10px] text-white/80 font-bold block mt-1">For candidates who mean business.</span>
                <div className="my-6">
                  <span className="text-4xl font-black text-white">$29</span>
                  <span className="text-xs text-white/80 font-bold"> /mo</span>
                </div>
                
                <ul className="space-y-3.5 mb-8">
                  {[
                    '500 Auto-Apply Credits',
                    'Unlimited Resume Tuning',
                    'Priority Support & Hidden Jobs'
                  ].map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-white font-medium">
                      <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/search" className="w-full text-center bg-[#0b0f19] hover:bg-[#060912] text-white font-bold text-xs py-3 rounded-lg transition-colors mt-auto">
                Get Unlimited Access
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-28 bg-[#f5f3ff]/40 border-t border-b border-zinc-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-zinc-950 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-sm text-zinc-500 mt-1">Get instant answers to common questions about JobHunt10X.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does the AI Job Matching work?",
                a: "Our AI model cross-checks your profile parameters against scraped and admin-added listings, rating matches instantly on skills, experience, and role alignment."
              },
              {
                q: "Is my personal data safe?",
                a: "Absolutely. All resume parsing and matching calculations are secured and processed using advanced encryption, strictly under your user profile workspace."
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes. You can manage your subscription easily inside the user settings portal, and cancel at any time with no lock-in contract."
              },
              {
                q: "What are \"Auto-Apply\" credits?",
                a: "Auto-Apply credits allow our backend AI agents to draft and submit tailored applications directly to matching openings automatically."
              },
              {
                q: "Does it support remote international jobs?",
                a: "Yes. The search filters let you select remote locations and discover international postings across major developer centers."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white border border-zinc-200/80 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full py-4 px-5 flex justify-between items-center text-left text-sm font-bold text-zinc-900 hover:bg-zinc-50/80 transition-colors"
                >
                  <span>{faq.q}</span>
                  <svg 
                    className={`w-4 h-4 text-zinc-500 transform transition-transform duration-200 ${
                      activeFaq === i ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-500 leading-relaxed border-t border-zinc-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION SECTION ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#22c55e] rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-[#22c55e]/25">
            {/* Background blur effects */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#16a34a]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-6">
                Your Next Job Is Waiting. Start Today.
              </h2>
              <Link href="/search" className="bg-[#fcd34d] hover:bg-[#f59e0b] text-zinc-950 font-bold px-8 py-4 rounded-xl shadow-xl transition-all hover:scale-[1.02] flex items-center gap-2 mt-2">
                Create Free Account
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <span className="text-[10px] text-white/80 font-bold block mt-6">
                Join over 10,000 candidates finding their dream careers.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MULTI-COLUMN FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-white border-t border-zinc-100 pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 pb-12 border-b border-zinc-100">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <span className="text-lg font-black tracking-tight text-zinc-950">
                JobHunt<span className="text-[#22c55e]">10X</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mt-1">
              Empowering candidates with dynamic matching and auto-apply AI tools.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              <a href="#" className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-[#22c55e] hover:border-[#22c55e] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-[#22c55e] hover:border-[#22c55e] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h5 className="text-xs font-black text-zinc-950 uppercase tracking-widest">Product</h5>
            <ul className="space-y-3 mt-4 text-xs font-semibold text-zinc-500">
              <li><Link href="/search" className="hover:text-[#22c55e] transition-colors">Job Search</Link></li>
              <li><Link href="/search" className="hover:text-[#22c55e] transition-colors">Resume Score</Link></li>
              <li><Link href="/search" className="hover:text-[#22c55e] transition-colors">AI Agent</Link></li>
              <li><Link href="/search" className="hover:text-[#22c55e] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h5 className="text-xs font-black text-zinc-950 uppercase tracking-widest">Company</h5>
            <ul className="space-y-3 mt-4 text-xs font-semibold text-zinc-500">
              <li><a href="#features" className="hover:text-[#22c55e] transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-[#22c55e] transition-colors">Careers</a></li>
              <li><a href="#features" className="hover:text-[#22c55e] transition-colors">Contact</a></li>
              <li><a href="#testimonials" className="hover:text-[#22c55e] transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h5 className="text-xs font-black text-zinc-950 uppercase tracking-widest">Resources</h5>
            <ul className="space-y-3 mt-4 text-xs font-semibold text-zinc-500">
              <li><a href="#faq" className="hover:text-[#22c55e] transition-colors">Blog</a></li>
              <li><a href="#faq" className="hover:text-[#22c55e] transition-colors">Help Center</a></li>
              <li><a href="#faq" className="hover:text-[#22c55e] transition-colors">Privacy Policy</a></li>
              <li><a href="#faq" className="hover:text-[#22c55e] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-6xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-mono">
          <span>
            &copy; {new Date().getFullYear()} JobHunt10X.ai. Focus on automation, match rate & fast selection.
          </span>
          <span className="opacity-80">
            Powered by Groq Llama 3.3 & Tavily Search
          </span>
        </div>
      </footer>
    </div>
  );
}
