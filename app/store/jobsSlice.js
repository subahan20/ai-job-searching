import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state for Redux jobs slice
const initialState = {
  jobs: [],
  searchCriteria: {
    role: '',
    experience: 0,
    skills: ''
  },
  isSearching: false,
  searchLogs: [],
  searchProgress: 0,
  hasSearched: false,
  error: null
};

// Async thunk to load cached jobs from database on app mount or refresh
export const loadCachedJobs = createAsyncThunk(
  'jobs/loadCachedJobs',
  async (_, { dispatch }) => {
    try {
      const res = await fetch('/api/search');
      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
          dispatch(setJobs(data.jobs));
          dispatch(setHasSearched(true));
        }
      }
    } catch (err) {
      console.error('Failed to load cached jobs from database:', err);
    }
  }
);

// Async thunk to handle job search, including user feedback simulation logs
export const searchJobs = createAsyncThunk(
  'jobs/searchJobs',
  async (payload, { dispatch }) => {
    const { role = '', experience = 0, skills = '' } = payload || {};

    // Reset searching states
    dispatch(setIsSearching(true));
    dispatch(setSearchProgress(0));
    dispatch(setSearchLogs([]));
    dispatch(setHasSearched(true));
    dispatch(setSearchCriteria({ role, experience, skills }));
    dispatch(setError(null));

    // Helper to log progress with a slight delay for better UX
    const addLogWithDelay = (log, progress, delay = 100) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          dispatch(addSearchLog(log));
          dispatch(setSearchProgress(progress));
          resolve();
        }, delay);
      });
    };

    try {
      await addLogWithDelay('Connecting to search engine...', 10, 100);
      await addLogWithDelay('Searching active listings on LinkedIn & Naukri...', 25, 200);

      // Start client-side progress animation to show real-time feedback
      let progress = 25;
      let tickCount = 0;
      const progressInterval = setInterval(() => {
        tickCount++;
        progress = Math.min(95, progress + Math.floor(Math.random() * 4) + 1);
        dispatch(setSearchProgress(progress));

        // Periodically inject interesting activity logs
        const logs = [
          'Scanning DOM selectors on index pages...',
          'Bypassing query rate limiters...',
          'Extracting job details & descriptions...',
          'Executing semantic matching on candidate profile...',
          'Evaluating experience requirements...',
          'Calculating profile compatibility score...'
        ];
        if (tickCount % 2 === 0) {
          const randomLog = logs[Math.floor(Math.random() * logs.length)];
          dispatch(addSearchLog(randomLog));
        } else {
          dispatch(addSearchLog('Running match analysis...'));
        }
      }, 1500);

      const triggerRes = await fetch(
        `/api/search?role=${encodeURIComponent(role)}&skills=${encodeURIComponent(skills)}&experience=${experience}`
      );

      clearInterval(progressInterval);

      if (!triggerRes.ok) {
        const errData = await triggerRes.json().catch(() => ({}));
        throw new Error(errData?.error || 'Failed to complete search query.');
      }

      const data = await triggerRes.json();

      if (!data?.success) {
        throw new Error(data?.error || 'Search failed.');
      }

      const matchedJobs = data.jobs || [];
      dispatch(setJobs(matchedJobs));

      dispatch(setSearchProgress(100));
      dispatch(addSearchLog(`AI evaluation complete. Matched ${matchedJobs.length} active listings.`));
      dispatch(addSearchLog('Done! Postings synchronized successfully.'));

      // Brief delay so user sees completed state animation
      await new Promise((r) => setTimeout(r, 600));

    } catch (err) {
      console.error(err);
      const errMsg = err?.message || 'Connection timed out or block detected on target endpoints.';
      dispatch(setError(errMsg));
      dispatch(setJobs([]));
      await addLogWithDelay(`[ERROR] ${errMsg}`, 100, 50);
    } finally {
      setTimeout(() => {
        dispatch(setIsSearching(false));
      }, 300);
    }
  }
);

// Redux Slice containing reducers for managing job search state
const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    setSearchCriteria(state, action) {
      state.searchCriteria = action.payload;
    },
    setIsSearching(state, action) {
      state.isSearching = action.payload;
    },
    setSearchLogs(state, action) {
      state.searchLogs = action.payload;
    },
    addSearchLog(state, action) {
      state.searchLogs.push(action.payload);
    },
    setSearchProgress(state, action) {
      state.searchProgress = action.payload;
    },
    setHasSearched(state, action) {
      state.hasSearched = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const {
  setJobs,
  setSearchCriteria,
  setIsSearching,
  setSearchLogs,
  addSearchLog,
  setSearchProgress,
  setHasSearched,
  setError
} = jobsSlice.actions;

export default jobsSlice.reducer;

