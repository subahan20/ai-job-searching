'use client';

import Link from 'next/link';

export default function ProfileSearchBanner({
  criteria = {},
  isSearching = false,
  onRefresh,
  isProfileReady = false,
}) {
  const { role = '', skills = '', experience = 0, location = '' } = criteria;

  if (!isProfileReady) {
    return (
      <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-[13px] font-black text-amber-800">Profile incomplete for AI search</h3>
          <p className="text-[11px] text-amber-700/80 mt-1 font-semibold">
            Add your preferred role, core skills, and work experience on your profile to start matching jobs.
          </p>
        </div>
        <Link
          href="/profile"
          className="shrink-0 px-4 py-2 rounded-lg bg-amber-600 text-white text-[12px] font-bold hover:bg-amber-700 transition-colors text-center"
        >
          Complete Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-5 rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider mb-2">
            Searching from your profile
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-100">
              Role: {role}
            </span>
            {experience > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-50 text-zinc-700 text-[11px] font-bold border border-zinc-200">
                {experience} yr experience
              </span>
            )}
            {location && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-[11px] font-bold border border-violet-100">
                {location}
              </span>
            )}
            {skills && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100 max-w-full truncate">
                Skills: {skills}
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 font-semibold">
            AI scans LinkedIn, Naukri & Indeed for jobs posted in the past week matching your role, location, skills, and experience.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isSearching}
          className="shrink-0 px-4 py-2 rounded-lg bg-[#008738] text-white text-[12px] font-bold hover:bg-[#00702e] transition-colors disabled:opacity-50"
        >
          {isSearching ? 'Searching...' : 'Refresh Search'}
        </button>
      </div>
    </div>
  );
}
