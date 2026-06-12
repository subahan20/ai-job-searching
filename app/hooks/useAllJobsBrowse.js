'use client';

import { useEffect, useMemo, useState } from 'react';
import { BACKEND_URL } from '../config/api';
import { mapJobRow } from '../lib/mapJobRow';
import { filterRecentJobs } from '../lib/filterRecentJobs';

const JOBS_ENDPOINT = `${BACKEND_URL}/jobs`;
const FETCH_LIMIT = 1000;

const sortJobs = (jobs, sortBy) =>
  [...jobs].sort((a, b) =>
    sortBy === 'latest'
      ? new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      : new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
  );

async function fetchJobsFromApi() {
  const res = await fetch(`${JOBS_ENDPOINT}?limit=${FETCH_LIMIT}&recent_only=1`);
  if (!res.ok) {
    throw new Error('Failed to load jobs from /api/jobs');
  }

  const data = await res.json();
  return Array.isArray(data?.jobs) ? data.jobs.map(mapJobRow) : [];
}

export function useAllJobsBrowse({ sortBy = 'latest' } = {}) {
  const [jobs, setJobs] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [aiSearchCount, setAiSearchCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadAllJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const allJobs = await fetchJobsFromApi();

        const publishedJobs = allJobs.filter((job) => job.publishState !== 'Draft');
        const recentJobs = filterRecentJobs(publishedJobs);

        // Separate Admin jobs from Scraped jobs to ensure Admin jobs always appear first
        const adminJobs = recentJobs.filter(job => job.source === 'Admin Portal' || job.source === 'Admin');
        const scrapedJobs = recentJobs.filter(job => job.source !== 'Admin Portal' && job.source !== 'Admin');

        // Admin jobs first, then scraped jobs
        const sortedAndGrouped = [...adminJobs, ...scrapedJobs];

        if (!cancelled) {
          setJobs(sortedAndGrouped);
          setAdminCount(adminJobs.length);
          setAiSearchCount(scrapedJobs.length);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Failed to load jobs');
          setJobs([]);
          setAdminCount(0);
          setAiSearchCount(0);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAllJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  const finalSortedJobs = useMemo(() => {
    // We already grouped Admin first, but if they want to sort by latest/oldest, 
    // we should sort Admin and Scraped independently so Admin stays on top
    const adminJobs = jobs.filter(job => job.source === 'Admin Portal' || job.source === 'Admin');
    const scrapedJobs = jobs.filter(job => job.source !== 'Admin Portal' && job.source !== 'Admin');
    return [...sortJobs(adminJobs, sortBy), ...sortJobs(scrapedJobs, sortBy)];
  }, [jobs, sortBy]);

  return {
    jobs: finalSortedJobs,
    adminCount,
    aiSearchCount,
    loading,
    error,
  };
}
