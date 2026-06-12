'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buildSearchCriteriaKey } from '../lib/profileSearchUtils';
import { filterRecentJobs } from '../lib/filterRecentJobs';
import { fetchAiSearchJobs, runAiSearch } from '../store/aiSearchActions';
import {
  selectIsProfileSearchReady,
  selectProfileSearchCriteria,
  selectProfileState,
} from '../store/profileSelectors';

export function useProfileJobSearch({ autoSearch = true } = {}) {
  const dispatch = useDispatch();
  const lastSearchKeyRef = useRef('');

  const { isLoading: profileLoading } = useSelector(selectProfileState);
  const criteria = useSelector(selectProfileSearchCriteria);
  const isProfileReady = useSelector(selectIsProfileSearchReady);

  const {
    jobs = [],
    byPlatform = {},
    isSearching = false,
    isLoadingCache = false,
    searchLogs = [],
    searchProgress = 0,
    hasSearched = false,
    error = null,
  } = useSelector((state) => state.aiSearch ?? {});

  const criteriaKey = useMemo(() => buildSearchCriteriaKey(criteria), [criteria]);

  const matchResults = useMemo(
    () =>
      filterRecentJobs(jobs).map((job) => ({
        job,
        score: job?.matchScore || job?.skillsMatchPercent || 0,
        matchedSkills: job?.skillsRequired || [],
      })),
    [jobs]
  );

  const platformCounts = useMemo(
    () =>
      Object.entries(byPlatform).map(([platform, platformJobs]) => ({
        platform,
        count: platformJobs?.length || 0,
      })),
    [byPlatform]
  );

  const runSearch = useCallback(() => {
    if (!criteria?.role?.trim()) return;
    dispatch(runAiSearch(criteria));
    lastSearchKeyRef.current = criteriaKey;
  }, [dispatch, criteria, criteriaKey]);

  useEffect(() => {
    dispatch(fetchAiSearchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (isLoadingCache || profileLoading || !criteriaKey || jobs.length === 0) return;

    const cachedKey = buildSearchCriteriaKey({
      role: jobs[0]?.roleSearched || '',
      skills: jobs[0]?.skillsSearched || '',
      experience: jobs[0]?.experienceSearched ?? 0,
      location: jobs[0]?.locationSearched || '',
    });

    if (cachedKey === criteriaKey) {
      lastSearchKeyRef.current = criteriaKey;
    }
  }, [isLoadingCache, profileLoading, jobs, criteriaKey]);

  useEffect(() => {
    if (!autoSearch || profileLoading || !isProfileReady || isSearching || isLoadingCache) return;
    if (lastSearchKeyRef.current === criteriaKey && (hasSearched || jobs.length > 0)) return;
    runSearch();
  }, [
    autoSearch,
    profileLoading,
    isProfileReady,
    isSearching,
    isLoadingCache,
    criteriaKey,
    hasSearched,
    jobs.length,
    runSearch,
  ]);

  return {
    criteria,
    criteriaKey,
    isProfileReady,
    profileLoading,
    isSearching,
    searchLogs,
    searchProgress,
    hasSearched,
    error,
    matchResults,
    byPlatform,
    platformCounts,
    runSearch,
  };
}
