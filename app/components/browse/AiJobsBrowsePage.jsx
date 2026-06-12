'use client';

import React, { useState, useMemo } from 'react';
import DashboardLayout from '../DashboardLayout';
import ApplyModal from '../ApplyModal';
import JobGridCard from './JobGridCard';
import { useAiSearchJobsBrowse } from '../../hooks/useAiSearchJobsBrowse';

export default function AiJobsBrowsePage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortBy, setSortBy] = useState('latest');
  const { jobs, loading, error, userRole } = useAiSearchJobsBrowse({ sortBy });

  const categories = useMemo(() => {
    if (!jobs || jobs.length === 0) return [];
    
    const grouped = {};
    
    jobs.forEach(job => {
      // 1. Extract the skills the Admin searched for
      const searchedSkillsStr = job.skillsSearched || '';
      const searchedSkills = searchedSkillsStr.split(',').map(s => s.trim()).filter(Boolean);
      
      let addedToSkillCategory = false;

      // 2. Check if the job matches any of those specific skills
      if (searchedSkills.length > 0) {
        // Look through title, required skills, and description to find the skill
        const jobText = `${job.title} ${job.skillsRequired?.join(' ')} ${job.description}`.toLowerCase();
        
        searchedSkills.forEach(skill => {
          // Escape special characters in skill for Regex
          const safeSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b${safeSkill}\\b`, 'i');
          if (regex.test(jobText)) {
            const catName = `${skill.charAt(0).toUpperCase() + skill.slice(1)} Matches`;
            if (!grouped[catName]) grouped[catName] = [];
            grouped[catName].push(job);
            addedToSkillCategory = true;
          }
        });
      }

      // 3. Fallback: If no specific skills matched, categorize by the Role searched
      if (!addedToSkillCategory) {
        let roleName = job.roleSearched ? job.roleSearched.trim() : 'General';
        roleName = roleName.charAt(0).toUpperCase() + roleName.slice(1);
        if (!grouped[roleName]) grouped[roleName] = [];
        grouped[roleName].push(job);
      }
    });

    // 4. Sort to find the Top 5 Categories (most jobs), and limit to 15 jobs per category
    const sortedCategories = Object.entries(grouped)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 5)
      .map(([name, categoryJobs]) => {
        // Remove duplicates within the category just in case
        const uniqueJobs = Array.from(new Map(categoryJobs.map(j => [j.id, j])).values());
        return {
          name,
          jobs: uniqueJobs.slice(0, 15) // Exactly 15 jobs maximum
        };
      });
      
    return sortedCategories;
  }, [jobs]);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#f8f9fc]">
        <main className="flex-1 px-8 py-6 flex flex-col">
          <div className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-[20px] font-black text-zinc-900 tracking-tight">AI Scraped Jobs</h2>
              <p className="text-[12px] text-zinc-500 mt-1 font-semibold">
                {loading
                  ? 'Loading top categories...'
                  : `Showing top ${categories.length} categories from AI searches.`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSortBy((prev) => (prev === 'latest' ? 'oldest' : 'latest'))}
              className="border border-zinc-200 bg-white text-zinc-700 text-[11px] font-bold px-3 py-1.5 rounded hover:bg-zinc-50"
            >
              {sortBy === 'latest' ? 'Latest First' : 'Oldest First'}
            </button>
          </div>

          <div className="mb-5 flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64 text-zinc-400 text-sm font-semibold">Loading jobs...</div>
            ) : error ? (
              <div className="flex items-center justify-center h-64 text-red-500 text-sm font-semibold">{error}</div>
            ) : categories.length > 0 ? (
              <div className="flex flex-col gap-12">
                {categories.map(category => (
                  <div key={category.name}>
                    <div className="mb-5 border-b border-zinc-200 pb-3 flex items-center justify-between">
                      <h3 className="text-[18px] font-black text-zinc-800 tracking-tight flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#008738]"></div>
                        {category.name}
                      </h3>
                      <span className="text-[10px] font-bold text-[#008738] bg-[#008738]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Top {category.jobs.length} Matches
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {category.jobs.map((job) => (
                        <JobGridCard key={job.id} job={job} onApply={setSelectedJob} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-zinc-400 text-sm font-semibold">
                {userRole
                  ? `No ${userRole} jobs are currently available.`
                  : `No AI-searched jobs yet. Run a search from the Admin Dashboard to discover jobs.`}
              </div>
            )}
          </div>
        </main>
      </div>
      <ApplyModal selectedJob={selectedJob} onClose={() => setSelectedJob(null)} />
    </DashboardLayout>
  );
}
