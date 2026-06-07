'use client';

import React, { useState } from 'react';

// ApplyModal component managing application flow internally to isolate re-renders
export default function ApplyModal({ selectedJob, onClose }) {
  const [applyStatus, setApplyStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  if (!selectedJob) return null;

  // Destructure selectedJob with optional chaining
  const {
    title = '',
    company = '',
    source = 'LinkedIn',
    salary = 'N/A',
    minExperienceYears = 0,
    description = '',
    skillsRequired = []
  } = selectedJob || {};

  const handleApplySubmit = (e) => {
    e.preventDefault();

    setApplyStatus('submitting');
    // Simulate API request delay
    setTimeout(() => {
      setApplyStatus('success');
    }, 1500);
  };

  const handleClose = () => {
    setApplyStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-[#1d2226] border border-[#2f353e] rounded-xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
          <div>
            <h2 className="text-base font-extrabold text-white">{title}</h2>
            <p className="text-xs text-blue-400 font-semibold mt-0.5">{company}</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#12161a] border border-[#2f353e] rounded-lg p-3 text-center">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Source</span>
              <span className="text-xs font-black text-blue-400 mt-1 block">{source}</span>
            </div>
            <div className="bg-[#12161a] border border-[#2f353e] rounded-lg p-3 text-center">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Salary Offer</span>
              <span className="text-xs font-black text-emerald-400 mt-1 block truncate">{salary}</span>
            </div>
            <div className="bg-[#12161a] border border-[#2f353e] rounded-lg p-3 text-center">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Experience Req</span>
              <span className="text-xs font-black text-white mt-1 block">{minExperienceYears}+ Years</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Description</h4>
            <p className="text-xs text-zinc-300 leading-relaxed bg-[#12161a] border border-[#2f353e] p-4 rounded-xl font-medium whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Required Skills */}
          <div>
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {skillsRequired.map((skill, idx) => (
                <span key={idx} className="text-xs bg-[#12161a] text-zinc-300 border border-[#2f353e] px-2.5 py-1 rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Apply Form */}
          <div className="border-t border-zinc-800 pt-5 mt-2">
            {applyStatus === 'idle' && (
              <form onSubmit={handleApplySubmit} className="flex flex-col gap-3">
                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Internal Easy Apply</h4>
                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-xs transition-all cursor-pointer text-center"
                >
                  Submit Application
                </button>
              </form>
            )}

            {applyStatus === 'submitting' && (
              <div className="flex items-center justify-center gap-2.5 py-4">
                <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-[10px] text-zinc-500 font-mono">Transmitting parameters via platform indexing tunnel...</span>
              </div>
            )}

            {applyStatus === 'success' && (
              <div className="bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 rounded-lg p-4 text-center">
                <p className="text-xs font-bold">🎉 Application Synced & Transmitted!</p>
                <p className="text-[9px] text-zinc-500 mt-1">Your details were shared using the secure {source} tunnel.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
