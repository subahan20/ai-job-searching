'use client';

import { useEffect, useMemo, useState } from 'react';
import { BACKEND_URL } from '../config/api';
import { filterRecentJobs } from '../lib/filterRecentJobs';
import { mapJobRow } from '../lib/mapJobRow';

const JOBS_ENDPOINT = `${BACKEND_URL}/jobs`;
const FETCH_LIMIT = 500;

const sortJobs = (jobs, sortBy) =>
  [...jobs].sort((a, b) =>
    sortBy === 'latest'
      ? new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      : new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
  );

async function fetchJobsFromApi(source) {
  const params = new URLSearchParams({ limit: String(FETCH_LIMIT), recent_only: '1' });
  if (source) params.set('source', source);
  const res = await fetch(`${JOBS_ENDPOINT}?${params}`);

  if (!res.ok) {
    throw new Error('Failed to load jobs from backend');
  }

  const data = await res.json();
  return Array.isArray(data?.jobs) ? data.jobs.map(mapJobRow) : [];
}

export function useBrowseJobs({ source, filterFn, sortBy = 'latest' }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const rows = await fetchJobsFromApi(source);

        if (!cancelled) {
          setJobs(rows);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Failed to load jobs');
          setJobs([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      cancelled = true;
    };
  }, [source]);

  const filteredJobs = useMemo(() => {
    const recent = filterRecentJobs(jobs);
    const list = filterFn ? recent.filter(filterFn) : recent;
    return sortJobs(list, sortBy);
  }, [jobs, filterFn, sortBy]);

  return { jobs: filteredJobs, loading, error };
}
