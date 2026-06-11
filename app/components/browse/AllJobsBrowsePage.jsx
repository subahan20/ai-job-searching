'use client';

import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import ApplyModal from '../ApplyModal';
import JobGridCard from './JobGridCard';
import { useAllJobsBrowse } from '../../hooks/useAllJobsBrowse';

const JOBS_PER_PAGE = 25;

function Pagination({ currentPage, totalPages, onPage }) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-2">
      <button type="button" onClick={() => onPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="w-7 h-7 rounded border border-zinc-200 disabled:opacity-40">‹</button>
      <span className="text-[11px] font-bold text-zinc-600 px-2">{currentPage} / {totalPages}</span>
      <button type="button" onClick={() => onPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="w-7 h-7 rounded border border-zinc-200 disabled:opacity-40">›</button>
    </div>
  );
}

export default function AllJobsBrowsePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortBy, setSortBy] = useState('latest');
  const { jobs, adminCount, aiSearchCount, loading, error } = useAllJobsBrowse({ sortBy });

  const totalPages = Math.max(1, Math.ceil(jobs.length / JOBS_PER_PAGE));
  const paginatedJobs = jobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#f8f9fc]">
        <main className="flex-1 px-8 py-6 flex flex-col">
          <div className="mb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-[20px] font-black text-zinc-900 tracking-tight">Browse All Jobs</h2>
              <p className="text-[12px] text-zinc-500 mt-1 font-semibold">
                {loading
                  ? 'Loading jobs...'
                  : `Showing ${jobs.length} jobs posted in the last 7 days — ${adminCount} admin + ${aiSearchCount} AI-scraped.`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setSortBy((prev) => (prev === 'latest' ? 'oldest' : 'latest')); setCurrentPage(1); }}
              className="border border-zinc-200 bg-white text-zinc-700 text-[11px] font-bold px-3 py-1.5 rounded hover:bg-zinc-50"
            >
              {sortBy === 'latest' ? 'Latest' : 'Oldest'}
            </button>
          </div>

          <div className="mb-5 flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64 text-zinc-400 text-sm font-semibold">Loading jobs...</div>
            ) : error ? (
              <div className="flex items-center justify-center h-64 text-red-500 text-sm font-semibold">{error}</div>
            ) : paginatedJobs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedJobs.map((job) => (
                  <JobGridCard key={job.id} job={job} onApply={setSelectedJob} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-zinc-400 text-sm font-semibold">No jobs found</div>
            )}
          </div>

          {!loading && jobs.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPage={setCurrentPage} />
          )}
        </main>
      </div>
      <ApplyModal selectedJob={selectedJob} onClose={() => setSelectedJob(null)} />
    </DashboardLayout>
  );
}
