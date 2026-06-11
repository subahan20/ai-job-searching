'use client';

import React from 'react';
import JobCard from '../JobCard';

export default function JobGridCard({ job, onApply }) {
  if (!job) return null;
  
  // Format the job to match the structure expected by JobCard
  const result = {
    job,
    score: job.skillsMatchPercent || 0,
    matchedSkills: [], // If empty, JobCard will gracefully fallback to displaying job.skillsRequired
    missingSkills: []
  };

  return (
    <div className="h-full">
      <JobCard 
        result={result} 
        onApplyClick={onApply} 
      />
    </div>
  );
}
