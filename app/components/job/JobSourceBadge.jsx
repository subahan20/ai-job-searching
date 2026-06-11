'use client';

export function CardLogo({ source = '', company = '' }) {
  if (source === 'Admin Portal') {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#0c1a2c] flex items-center justify-center shrink-0 text-blue-400 text-xs font-black">
        A
      </div>
    );
  }
  if (source === 'LinkedIn') {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#0c1c2c] flex items-center justify-center shrink-0 text-[11px] font-black text-blue-500">
        in
      </div>
    );
  }
  if (source === 'Naukri') {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#1c0c0c] flex items-center justify-center shrink-0 text-[11px] font-black text-red-400">
        N
      </div>
    );
  }
  if (source === 'Indeed') {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#1a1a2e] flex items-center justify-center shrink-0 text-[11px] font-black text-sky-400">
        in
      </div>
    );
  }
  if (company) {
    const letter = company.charAt(0).toUpperCase();
    return (
      <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-[13px] font-black text-zinc-600">
        {letter}
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </div>
  );
}

const SOURCE_BADGE_STYLES = {
  LinkedIn: 'bg-blue-50 text-blue-600 border-blue-100',
  Naukri: 'bg-red-50 text-red-600 border-red-100',
  Indeed: 'bg-sky-50 text-sky-600 border-sky-100',
  'Admin Portal': 'bg-violet-50 text-violet-600 border-violet-100',
};

export function SourceBadge({ source }) {
  if (!source) return null;
  const style = SOURCE_BADGE_STYLES[source] || 'bg-zinc-100 text-zinc-500';
  return (
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${style}`}>
      {source}
    </span>
  );
}
