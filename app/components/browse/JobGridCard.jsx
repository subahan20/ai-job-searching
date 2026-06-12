'use client';

import React from 'react';
import JobCard from '../JobCard';

export default function JobGridCard({ job, onApply }) {
  if (!job) return null;
  
  const result = React.useMemo(() => {
    const userSkills = (job.skillsSearched || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    const jobSkills = job.skillsRequired || [];
    
    const matchedSkills = [];
    const missingSkills = [];

    if (userSkills.length > 0) {
      jobSkills.forEach(skill => {
        const isMatch = userSkills.some(userSkill => {
          const safeSkill = userSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b${safeSkill}\\b`, 'i');
          return regex.test(skill) || skill.toLowerCase() === userSkill;
        });
        if (isMatch) {
          matchedSkills.push(skill);
        } else {
          missingSkills.push(skill);
        }
      });
    }

    return {
      job,
      score: job.skillsMatchPercent || 0,
      matchedSkills,
      missingSkills
    };
  }, [job]);

  return (
    <div className="h-full">
      <JobCard 
        result={result} 
        onApplyClick={onApply} 
      />
    </div>
  );
}
