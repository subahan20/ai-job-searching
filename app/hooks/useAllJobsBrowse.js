'use client';

import { useEffect, useMemo, useState } from 'react';
import { BACKEND_URL } from '../config/api';
import { getAuthHeaders } from '../lib/authHeaders';
import { mapAiSearchResponse } from '../lib/mapAiSearchJob';
import { mapJobRow } from '../lib/mapJobRow';
import { mergeJobLists } from '../lib/mergeJobLists';
import { filterRecentJobs } from '../lib/filterRecentJobs';

const JOBS_ENDPOINT = `${BACKEND_URL}/jobs`;
const AI_SEARCH_ENDPOINT = `${BACKEND_URL}/ai-search`;
const FETCH_LIMIT = 500;

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

async function fetchAiSearchFromApi() {
  const headers = await getAuthHeaders();
  const res = await fetch(AI_SEARCH_ENDPOINT, { headers });
  const data = await res.json();

  if (!res.ok || !data?.success) {
    return [];
  }

  return mapAiSearchResponse(data).jobs.map((job) => ({
    ...job,
    publishState: 'Published',
  }));
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
        const [adminJobs, aiJobs] = await Promise.all([
          fetchJobsFromApi(),
          fetchAiSearchFromApi(),
        ]);

        const publishedAdminJobs = adminJobs.filter((job) => job.publishState !== 'Draft');
        const merged = filterRecentJobs(mergeJobLists(publishedAdminJobs, aiJobs));

        if (!cancelled) {
          setJobs(merged);
          setAdminCount(publishedAdminJobs.length);
          setAiSearchCount(aiJobs.length);
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

  const sortedJobs = useMemo(() => sortJobs(jobs, sortBy), [jobs, sortBy]);

  return {
    jobs: sortedJobs,
    adminCount,
    aiSearchCount,
    loading,
    error,
  };
}
