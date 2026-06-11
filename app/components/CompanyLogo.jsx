'use client';

import React, { useState } from 'react';

export default function CompanyLogo({ logoUrl, company, logoColor = 'bg-zinc-700' }) {
  const [hasError, setHasError] = useState(!logoUrl);

  if (hasError || !logoUrl) {
    return (
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${logoColor} shadow-sm`}>
        <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={company || ''}
      className="w-10 h-10 rounded-lg object-contain bg-white p-1 border border-zinc-200 shadow-sm"
      onError={() => setHasError(true)}
    />
  );
}
