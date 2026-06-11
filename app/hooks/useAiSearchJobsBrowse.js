'use client';

import { useEffect, useMemo, useState } from 'react';
import { BACKEND_URL } from '../config/api';
import { getAuthHeaders } from '../lib/authHeaders';
import { mapAiSearchResponse } from '../lib/mapAiSearchJob';
import { filterRecentJobs } from '../lib/filterRecentJobs';

const AI_SEARCH_ENDPOINT = `${BACKEND_URL}/ai-search`;

const sortJobs = (jobs, sortBy) =>
  [...jobs].sort((a, b) =>
    sortBy === 'latest'
      ? new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      : new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
  );

export function useAiSearchJobsBrowse({ sortBy = 'latest' } = {}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadAiSearchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const headers = await getAuthHeaders();
        const res = await fetch(AI_SEARCH_ENDPOINT, { headers });
        const data = await res.json();

        if (!res.ok || !data?.success) {
          throw new Error(data?.message || 'Failed to load AI search jobs');
        }

        if (!cancelled) {
          setJobs(filterRecentJobs(mapAiSearchResponse(data).jobs));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Failed to load AI search jobs');
          setJobs([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAiSearchJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  const sortedJobs = useMemo(() => sortJobs(jobs, sortBy), [jobs, sortBy]);

  return { jobs: sortedJobs, loading, error };
}
