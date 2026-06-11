'use client';

import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import EmptyState from '../components/EmptyState';
import JobCard from '../components/JobCard';
import ApplyModal from '../components/ApplyModal';
import ProfileSearchBanner from '../components/ProfileSearchBanner';
import SearchingState from '../components/SearchingState';
import { useProfileJobSearch } from '../hooks/useProfileJobSearch';

export default function SearchPage() {
  const [selectedJob, setSelectedJob] = useState(null);

  const {
    criteria,
    isProfileReady,
    profileLoading,
    isSearching,
    searchLogs,
    searchProgress,
    hasSearched,
    error,
    matchResults,
    platformCounts,
    runSearch,
  } = useProfileJobSearch({ autoSearch: true });

  const renderResults = () => {
    if (profileLoading) {
      return <EmptyState type="profile-loading" />;
    }

    if (!isProfileReady) {
      return <EmptyState type="profile-incomplete" />;
    }

    if (error) {
      return <EmptyState type="error" message={error} />;
    }

    if (isSearching) {
      return <SearchingState searchProgress={searchProgress} searchLogs={searchLogs} />;
    }

    if (!hasSearched) {
      return <EmptyState type="ready" />;
    }

    if (matchResults.length === 0) {
      return <EmptyState type="no-matches" />;
    }

    return (
      <>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-1 mb-2">
          <h3 className="text-[11px] font-black text-zinc-400 tracking-wider uppercase">
            Jobs found for your profile
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] text-[#008738] font-bold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              {matchResults.length} total jobs
            </span>
            {platformCounts.map(({ platform, count }) => (
              <span
                key={platform}
                className="text-[10px] text-zinc-600 font-bold bg-white border border-zinc-200 px-3 py-1 rounded-full"
              >
                {platform}: {count}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchResults.map((result) => (
            <JobCard
              key={result.job?.id}
              result={result}
              onApplyClick={setSelectedJob}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#f8f9fc]">
        <main className="flex-grow px-8 py-6 flex flex-col">
          <div className="mb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-[20px] font-black text-zinc-900 tracking-tight leading-tight flex items-center gap-2">
                <span>AI Job Sync Engine</span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Profile-Driven Search
                </span>
              </h2>
              <p className="text-[12px] text-zinc-500 mt-1 font-semibold">
                AI uses your profile to discover jobs posted within the last 7 days on LinkedIn, Naukri, and Indeed.
              </p>
            </div>
          </div>

          <ProfileSearchBanner
            criteria={criteria}
            isSearching={isSearching}
            onRefresh={runSearch}
            isProfileReady={isProfileReady}
          />

          <div className="mb-4 flex-grow">{renderResults()}</div>
        </main>
      </div>

      <ApplyModal selectedJob={selectedJob} onClose={() => setSelectedJob(null)} />
    </DashboardLayout>
  );
}
