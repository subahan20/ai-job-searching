'use client';

import React, { useState } from 'react';

// Reusable component to render company logos with fallbacks
export default function CompanyLogo({ logoUrl, company = 'Company', logoColor = 'bg-blue-600' }) {
  const [hasError, setHasError] = useState(!logoUrl);

  // Fallback icon when URL is missing or broken
  if (hasError || !logoUrl) {
    return (
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${logoColor} border border-[#2f353e] shadow-inner`}>
        <svg className="w-7 h-7 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
    );
  }

  // Live image rendering
  return (
    <img 
      src={logoUrl} 
      alt={company} 
      className="w-14 h-14 rounded-xl object-contain bg-white p-1.5 border border-[#2f353e] shadow-md"
      onError={() => setHasError(true)}
    />
  );
}
