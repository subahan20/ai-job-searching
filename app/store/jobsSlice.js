import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://ai-jobs-back.onrender.com/api');

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

// Helper mapper to translate snake_case backend/database fields to UI camelCase fields
const mapJob = (row) => ({
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
  url: row.url || '',
  score: row.score,
  matchedSkills: row.matchedSkills,
  missingSkills: row.missingSkills,
  experienceMatch: row.experienceMatch,
  roleMatch: row.roleMatch,
  matchExplanation: row.matchExplanation
});

// Async thunk to load cached jobs from database on app mount or refresh
export const loadCachedJobs = createAsyncThunk(
  'jobs/loadCachedJobs',
  async (_, { dispatch }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/jobs?limit=100`);
      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.jobs)) {
          const aiJobs = data.jobs.filter(row => row.source !== 'Admin Portal');
          const mapped = aiJobs.map(mapJob);
          dispatch(setJobs(mapped));
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

    const handleError = (msg) => {
      dispatch(setError(msg));
      dispatch(setJobs([]));
      dispatch(addSearchLog(`[ERROR] ${msg}`));
      dispatch(setSearchProgress(100));
      setTimeout(() => {
        dispatch(setIsSearching(false));
      }, 300);
    };

    try {
      const triggerRes = await fetch(`${BACKEND_URL}/jobs/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
          skills,
          experience
        })
      });

      if (!triggerRes.ok) {
        const errData = await triggerRes.json().catch(() => ({}));
        handleError(errData?.error || 'Failed to initialize search query.');
        return;
      }

      const triggerData = await triggerRes.json();
      if (!triggerData?.success || !triggerData?.jobId) {
        handleError(triggerData?.error || 'Search initialization failed.');
        return;
      }

      const jobId = triggerData.jobId;

      // Poll search status from Express backend
      let completedJobs = null;
      let attempts = 0;
      const maxAttempts = 60; // 90 seconds timeout

      while (attempts < maxAttempts) {
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const statusRes = await fetch(`${BACKEND_URL}/jobs/search/status/${jobId}`);
        if (!statusRes.ok) {
          handleError('Connection to backend search service lost.');
          return;
        }

        const statusData = await statusRes.json();
        if (!statusData.success) {
          handleError(statusData.error || 'Search job execution failed.');
          return;
        }

        const state = statusData.status;
        const backendLogs = statusData.logs || [];
        
        // Directly display real-time logs from backend
        dispatch(setSearchLogs(backendLogs));

        // Calculate progress dynamically based on number of logs received
        const computedProgress = Math.min(95, 10 + backendLogs.length * 10);
        dispatch(setSearchProgress(computedProgress));

        if (state === 'completed') {
          completedJobs = (statusData.jobs || []).map(mapJob);
          break;
        } else if (state === 'failed') {
          handleError(statusData.error || 'Job failed on background worker.');
          return;
        }
      }

      if (!completedJobs) {
        handleError('Search request timed out. Please try again.');
        return;
      }

      dispatch(setJobs(completedJobs));
      dispatch(setSearchProgress(100));

      // Brief delay so user sees completed state animation
      await new Promise((r) => setTimeout(r, 600));
      dispatch(setIsSearching(false));

    } catch (err) {
      console.error(err);
      const errMsg = err?.message || 'Connection timed out or block detected on target endpoints.';
      handleError(errMsg);
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
