'use client';

import React from 'react';
import CompanyLogo from './CompanyLogo';

// JobCard component to display a single matching job listing
export default function JobCard({ result, onApplyClick }) {
  // Destructure with default values and optional chaining
  const { job = {}, score = 0, matchedSkills = [], missingSkills = [] } = result || {};
  const {
    id = '',
    title = 'Job Title',
    company = 'Company Name',
    location = 'Location',
    postedTime = 'Just posted',
    source = 'LinkedIn',
    description = '',
    minExperienceYears = 0,
    experienceLevel = 'Entry Level',
    url = '#',
    logoUrl = '',
    logoColor = 'bg-blue-600'
  } = job;

  return (
    <div className="bg-[#1d2226] border border-[#2f353e] hover:border-blue-500/50 rounded-xl p-5 flex flex-col md:flex-row gap-4 transition-all duration-300 shadow-md group relative overflow-hidden">
      
      {/* Left: Company Logo */}
      <div className="shrink-0">
        <CompanyLogo 
          logoUrl={logoUrl}
          company={company}
          logoColor={logoColor}
        />
      </div>

      {/* Right: Content details */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-blue-400 font-semibold mt-0.5 hover:underline cursor-pointer">
              {company}
            </p>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <span>{location}</span>
              <span className="text-zinc-600">•</span>
              <span>{postedTime}</span>
            </p>
          </div>

          {/* Platform Badge & Match Score */}
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${
              source === 'LinkedIn' 
                ? 'bg-blue-900/20 text-blue-400 border-blue-800/30' 
                : 'bg-red-950/20 text-red-400 border-red-900/30'
            }`}>
              {source}
            </span>
            <div className={`text-[10px] font-black font-mono px-2 py-0.5 rounded border ${
              score >= 80 
                ? 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20'
                : score >= 50
                ? 'text-amber-400 border-amber-500/20 bg-amber-950/20'
                : 'text-zinc-400 border-zinc-700/20 bg-zinc-900/20'
            }`}>
              {score}% Match
            </div>
          </div>
        </div>

        {/* Job Description snippet */}
        <p className="text-xs text-zinc-300 leading-relaxed font-normal">
          {description}
        </p>

        {/* Skill matching tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-800/50 mt-1">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mr-1">Skills:</span>
          {matchedSkills.map((skill, idx) => (
            <span key={idx} className="text-[10px] font-medium bg-emerald-950/30 text-emerald-400 border border-emerald-900/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              {skill}
            </span>
          ))}
          {missingSkills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="text-[10px] font-medium bg-zinc-950 text-zinc-500 border border-zinc-800 px-2.5 py-0.5 rounded-full line-through decoration-zinc-700/50">
              {skill}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-zinc-800/50">
          <span className="text-[10px] text-zinc-500 font-bold font-mono">
            Req Exp: {minExperienceYears}+ yrs ({experienceLevel})
          </span>
          <div className="flex gap-2">
            {url && url !== '#' && source !== 'Admin Portal' && (
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#2f353e] hover:border-zinc-400 transition-all text-zinc-300"
              >
                View on {source}
              </a>
            )}
            <button 
              onClick={() => onApplyClick(job)}
              className="text-[11px] font-bold px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer"
            >
              Easy Apply
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
