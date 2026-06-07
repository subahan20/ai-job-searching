'use client';

import React, { useState, useEffect } from 'react';

// SearchForm component holding local input states for optimal performance
export default function SearchForm({ onSubmitSearch }) {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role.trim()) return;

    // Trigger parent search handler
    onSubmitSearch({
      role: role.trim(),
      experience: Number(experience) || 0,
      skills: skills.trim()
    });
  };

  return (
    <div className="bg-[#1d2226] border border-[#2f353e] rounded-xl shadow-xl flex flex-col overflow-hidden">
      {/* Visual top banner */}
      <div className="h-16 bg-gradient-to-r from-blue-700 to-indigo-800 relative">
        <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-xl bg-zinc-900 border border-[#2f353e] flex items-center justify-center font-bold text-white text-2xl shadow-lg">
          🚀
        </div>
      </div>
      
      <div className="p-6 pt-10 flex flex-col gap-5">
        <div>
          <h1 className="text-md font-bold text-white tracking-tight">Profile Search Setup</h1>
          <p className="text-[11px] text-zinc-400 mt-0.5">Customize your search parameters to find actual matches.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-t border-zinc-800 pt-4">

          {/* Preferred Job Title */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="role" className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Preferred Job Title</label>
            <input
              id="role"
              type="text"
              required
              value={role}
              autoComplete="off"
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. React Developer, Node Engineer"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-medium"
            />
          </div>

          {/* Experience Level */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="experience" className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Experience (Years)</label>
            <input
              id="experience"
              type="number"
              min="0"
              max="30"
              required
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 2, 5"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-medium"
            />
          </div>

          {/* Core Skills */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="skills" className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Core Skills (Comma separated)</label>
            <textarea
              id="skills"
              rows={3}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, TypeScript, Next.js"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-medium resize-none"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-lg shadow-blue-900/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Live Jobs
          </button>
        </form>
      </div>
    </div>
  );
}
