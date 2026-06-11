'use client';

import React from 'react';
import CompanyLogo from './CompanyLogo';

export default function JobCard({ result, onApplyClick }) {
  const { job = {}, score = 0, matchedSkills = [], missingSkills = [] } = result || {};
  const {
    title,
    company,
    location,
    postedTime,
    source,
    description,
    logoUrl,
    logoColor,
    skillsRequired = [],
    url,
  } = job;

  const displaySkills =
    matchedSkills.length > 0 || missingSkills.length > 0
      ? { matched: matchedSkills, missing: missingSkills }
      : { matched: skillsRequired, missing: [] };

  const hasSkills = displaySkills.matched.length > 0 || displaySkills.missing.length > 0;

  return (
    <div className="bg-white border border-zinc-200/80 hover:shadow-md rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 relative font-sans">
      <div className="flex items-start justify-between">
        <div className="shrink-0">
          <CompanyLogo logoUrl={logoUrl} company={company} logoColor={logoColor} />
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {source && (
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border tracking-wide uppercase ${
                source === 'LinkedIn'
                  ? 'bg-blue-50 text-blue-700 border-blue-100'
                  : source === 'Naukri'
                  ? 'bg-red-50 text-red-700 border-red-100'
                  : source === 'Indeed'
                  ? 'bg-sky-50 text-sky-700 border-sky-100'
                  : 'bg-zinc-50 text-zinc-600 border-zinc-200'
              }`}
            >
              {source}
            </span>
          )}
          {score > 0 && (
            <div className="text-[9px] font-extrabold font-mono px-2 py-0.5 rounded border border-emerald-150 bg-emerald-50/50 text-[#008738]">
              {score}% Match
            </div>
          )}
        </div>
      </div>

      <div>
        {title && <h3 className="text-[15px] font-black text-zinc-900 leading-tight">{title}</h3>}
        {company && <p className="text-[11px] text-[#008738] font-bold mt-0.5">{company}</p>}
        {(location || postedTime) && (
          <p className="text-[11px] text-zinc-400 font-semibold mt-1 flex items-center gap-1.5">
            {location && <span>{location}</span>}
            {location && postedTime && <span className="text-zinc-300">•</span>}
            {postedTime && <span>{postedTime}</span>}
          </p>
        )}
      </div>

      {description && (
        <div
          className="text-[11px] text-zinc-500 leading-relaxed font-semibold line-clamp-3 [&_p]:mb-1 [&_br]:block [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-0.5"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {hasSkills && (
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-zinc-100">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mr-1">Skills:</span>
          {displaySkills.matched.map((skill, idx) => (
            <span
              key={`m-${idx}`}
              className="text-[10px] font-bold bg-emerald-50 text-[#008738] border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1"
            >
              <span className="w-1 h-1 rounded-full bg-[#008738]" />
              {skill}
            </span>
          ))}
          {displaySkills.missing.slice(0, 3).map((skill, idx) => (
            <span
              key={`x-${idx}`}
              className="text-[10px] font-bold bg-zinc-50 text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded-full line-through decoration-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="w-full h-[1px] bg-zinc-100 mt-1" />

      <div className="flex items-center justify-between pt-1">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-extrabold text-[#008738] hover:text-[#00702e] transition-colors"
          >
            View Details
          </a>
        ) : (
          <span className="text-[12px] text-zinc-400 font-semibold">No link available</span>
        )}
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-bold text-white bg-[#008738] hover:bg-[#00702e] rounded-lg px-6 py-2 transition-colors shadow-sm shadow-[#008738]/20 inline-block text-center"
          >
            Apply
          </a>
        ) : (
          <button
            disabled
            className="text-[12px] font-bold text-white bg-[#008738] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg px-6 py-2 shadow-sm shadow-[#008738]/20"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}
