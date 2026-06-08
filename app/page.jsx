'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchJobs, loadCachedJobs } from './store/jobsSlice';

// Import subcomponents
import DashboardLayout from './components/DashboardLayout';
import SearchForm from './components/SearchForm';
import SearchingState from './components/SearchingState';
import JobCard from './components/JobCard';
import ApplyModal from './components/ApplyModal';
import EmptyState from './components/EmptyState';

// Main Page Component
export default function Home() {
  const dispatch = useDispatch();

  // Redux state selectors to track search progress and results
  const jobs = useSelector((state) => state.jobs.jobs);
  const searchCriteria = useSelector((state) => state.jobs.searchCriteria);
  const isSearching = useSelector((state) => state.jobs.isSearching);
  const searchLogs = useSelector((state) => state.jobs.searchLogs);
  const searchProgress = useSelector((state) => state.jobs.searchProgress);
  const hasSearched = useSelector((state) => state.jobs.hasSearched);
  const error = useSelector((state) => state.jobs.error);

  // Local state variables for job detail selection
  const [selectedJob, setSelectedJob] = useState(null);

  // Load cached jobs from database on mount
  useEffect(() => {
    dispatch(loadCachedJobs());
  }, [dispatch]);

  // Compute matching and filtering of skills using useMemo to avoid recalculations on every render
  const matchResults = useMemo(() => {
    const userSkills = (searchCriteria?.skills || '')
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    const results = jobs.map(job => ({
      job,
      score: job?.score !== undefined ? job.score : 0,
      matchedSkills: job?.matchedSkills || [],
      missingSkills: job?.missingSkills || [],
      experienceMatch: job?.experienceMatch !== undefined ? job.experienceMatch : true,
      roleMatch: job?.roleMatch !== undefined ? job.roleMatch : true,
      matchExplanation: job?.matchExplanation || ''
    }));

    // Sort results by match score descending so best matches appear first
    return [...results].sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [jobs, searchCriteria]);

  // Handle new search initiation
  const handleSearchSubmit = ({ role, experience, skills }) => {
    dispatch(searchJobs({ role, experience, skills }));
  };

  return (
    <DashboardLayout>
      {/* Top Status Header */}
      <header className="border-b border-zinc-900 bg-zinc-900/40 backdrop-blur-md py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-500">ai jobs</span>
          <span className="text-xs text-zinc-700">/</span>
          <span className="text-xs text-zinc-200 font-semibold">Search Feed</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/20 border border-emerald-900/30 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Direct Scraper Active
        </span>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 items-start relative z-10">
        
        {/* Left Column: Form Settings */}
        <div className="w-full lg:w-[360px] shrink-0">
          <SearchForm onSubmitSearch={handleSearchSubmit} />
        </div>

        {/* Right Column: Search Results Feed */}
        <div className="flex-1 w-full min-h-[400px]">
          
          {error ? (
            <EmptyState type="error" message={error} />
          ) : isSearching ? (
            <SearchingState 
              searchProgress={searchProgress} 
              searchLogs={searchLogs} 
            />
          ) : (
            <div className="flex flex-col gap-4">
              {hasSearched ? (
                <>
                  {/* Results Header */}
                  <div className="flex justify-between items-center px-2">
                    <h2 className="text-sm font-bold text-zinc-400 tracking-tight uppercase">
                      Real-Time Jobs Match Feed
                    </h2>
                    <span className="text-[10px] text-zinc-400 font-bold font-mono bg-[#1d2226] border border-[#2f353e] px-3 py-1 rounded-full">
                      {matchResults.length} Matched Positions
                    </span>
                  </div>

                  {/* Render Job List or Empty Feed Indicator */}
                  {matchResults.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {matchResults.map((result) => (
                        <JobCard 
                          key={result.job?.id} 
                          result={result} 
                          onApplyClick={setSelectedJob} 
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState type="no-matches" />
                  )}
                </>
              ) : (
                <EmptyState type="ready" />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <footer className="py-8 border-t border-zinc-900 text-center text-[10px] text-zinc-600 font-mono mt-12 bg-zinc-950">
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
