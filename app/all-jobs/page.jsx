'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import DashboardLayout from '../components/DashboardLayout';
import JobCard from '../components/JobCard';
import ApplyModal from '../components/ApplyModal';

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mapped = (data || []).map(row => ({
        id: row.id,
        title: row.title,
        company: row.company,
        logoUrl: row.logo_url || undefined,
        logoColor: row.logo_color || 'bg-blue-600 text-white',
        source: row.source || 'Admin Portal',
        experienceLevel: row.experience_level || 'Mid',
        minExperienceYears: row.min_experience_years || 0,
        skillsRequired: row.skills_required || [],
        salary: row.salary || 'Not Disclosed',
        location: row.location || 'Remote',
        description: row.description || '',
        postedTime: row.posted_time || 'Active',
        url: row.url || ''
      }));

      setJobs(mapped);
    } catch (err) {
      console.error('Failed to load all jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  // Filter jobs based on client-side search query
  const filteredJobs = jobs.filter(job => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.skillsRequired.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <DashboardLayout>
      {/* Top Status Header */}
      <header className="border-b border-zinc-900 bg-zinc-900/40 backdrop-blur-md py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-500">myapp</span>
          <span className="text-xs text-zinc-700">/</span>
          <span className="text-xs text-zinc-200 font-semibold">all jobs</span>
        </div>
        <button 
          onClick={fetchAllJobs}
          disabled={loading}
          className="text-zinc-400 hover:text-white p-1.5 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          title="Refresh listings"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" />
          </svg>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-10 flex flex-col gap-6 relative z-10">
        
        {/* Page title and description */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-4 border-b border-zinc-800/60">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">All Database Listings</h1>
            <p className="text-xs text-zinc-500 mt-1">Displays manual jobs from the Admin Portal and synced scraper listings.</p>
          </div>
          <span className="text-[10px] text-zinc-400 font-bold font-mono bg-[#1d2226] border border-[#2f353e] px-3 py-1 rounded-full self-start">
            Total {filteredJobs.length} active listings
          </span>
        </div>

        {/* Client-side search and filtering */}
        <div className="relative">
          <svg className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text"
            placeholder="Filter all listings by title, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 hover:border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Jobs Feed list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-zinc-500">
            <svg className="animate-spin h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs font-bold tracking-widest uppercase font-mono">Loading listings...</span>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredJobs.map((job) => {
              // Format result container to reuse JobCard properly
              const resultObj = {
                job,
                score: 100, // Show 100% since no filter constraints are active
                matchedSkills: job.skillsRequired,
                missingSkills: []
              };
              return (
                <JobCard 
                  key={job.id}
                  result={resultObj}
                  onApplyClick={setSelectedJob}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
            <svg className="w-8 h-8 text-zinc-700 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-bold text-zinc-400">No Listings Found</span>
            <p className="text-[11px] text-zinc-600 mt-1 max-w-xs">
              No matching listings match your search criteria. Try modifying your filter key terms.
            </p>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="py-8 border-t border-zinc-900 text-center text-[10px] text-zinc-600 font-mono bg-zinc-950">
        &copy; {new Date().getFullYear()} AI Job Sync Engine. All rights reserved.
      </footer>

      {/* Easy Apply Overlay modal */}
      <ApplyModal 
        selectedJob={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </DashboardLayout>
  );
}
