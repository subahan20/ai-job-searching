'use client';

import React, { useState } from 'react';

export default function ApplyModal({ selectedJob, onClose }) {
  const [applyStatus, setApplyStatus] = useState('idle');

  if (!selectedJob) return null;

  const {
    title,
    company,
    source,
    salary,
    minExperienceYears,
    description,
    skillsRequired = [],
    url,
  } = selectedJob;

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplyStatus('submitting');
    setTimeout(() => {
      setApplyStatus('success');
    }, 1500);
  };

  const handleClose = () => {
    setApplyStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans">
      <div
        className="bg-white border border-zinc-200/80 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-zinc-100 flex justify-between items-start">
          <div>
            {title && <h2 className="text-[15px] font-black text-zinc-900">{title}</h2>}
            {company && <p className="text-[12px] text-[#008738] font-bold mt-0.5">{company}</p>}
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {(source || salary || minExperienceYears) && (
            <div className="grid grid-cols-3 gap-3">
              {source && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-center">
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block">Source</span>
                  <span className="text-[11px] font-black text-blue-600 mt-1 block">{source}</span>
                </div>
              )}
              {salary && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-center">
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block">Salary</span>
                  <span className="text-[11px] font-black text-[#008738] mt-1 block truncate">{salary}</span>
                </div>
              )}
              {minExperienceYears !== undefined && minExperienceYears !== null && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-center">
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block">Experience</span>
                  <span className="text-[11px] font-black text-zinc-800 mt-1 block">{minExperienceYears}+ yrs</span>
                </div>
              )}
            </div>
          )}

          {description && (
            <div>
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Description</h4>
              <div className="text-[11px] text-zinc-600 leading-relaxed bg-zinc-50 border border-zinc-200 p-4 rounded-xl font-semibold whitespace-pre-line">
                {description}
              </div>
            </div>
          )}

          {skillsRequired.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {skillsRequired.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold bg-zinc-50 text-zinc-600 border border-zinc-200 px-2.5 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-zinc-100 pt-4 mt-1">
            {applyStatus === 'idle' && (
              <form onSubmit={handleApplySubmit} className="flex flex-col gap-3">
                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Quick Apply</h4>
                {url ? (
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#008738] hover:bg-[#00702e] text-white rounded-lg font-bold text-[12px] transition-all cursor-pointer shadow-sm shadow-[#008738]/20"
                  >
                    Submit Application
                  </button>
                ) : (
                  <p className="text-[11px] text-zinc-500 font-semibold text-center">
                    No application URL available for this listing.
                  </p>
                )}
              </form>
            )}

            {applyStatus === 'submitting' && (
              <div className="flex items-center justify-center gap-2.5 py-4">
                <svg className="animate-spin h-4 w-4 text-[#008738]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-[10px] text-zinc-500 font-semibold">Submitting your application...</span>
              </div>
            )}

            {applyStatus === 'success' && (
              <div className="bg-emerald-50 border border-emerald-200 text-[#008738] rounded-xl p-4 text-center">
                <p className="text-[13px] font-black">Application Submitted!</p>
                {source && (
                  <p className="text-[10px] text-zinc-400 font-semibold mt-1">
                    Your details were shared via the {source} platform.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
