import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL } from '../config/api';
import { getAuthHeaders } from '../lib/authHeaders';
import { supabase } from '../lib/supabase';
import { PROFILE_FORM_FIELDS } from './profileConstants';

const PROFILE_URL = `${BACKEND_URL}/profile`;

const pickProfilePayload = (data = {}) =>
  PROFILE_FORM_FIELDS.reduce((payload, field) => {
    payload[field] = data[field] ?? (field === 'core_skills' ? [] : '');
    return payload;
  }, {});

const parseProfileResponse = async (response) => {
  const result = await response.json();

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'Profile request failed');
  }

  return result.data ?? null;
};

const mergeAuthDefaults = async (profile) => {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  const metadata = user?.user_metadata ?? {};

  return {
    ...profile,
    email: profile?.email || user?.email || '',
    first_name: profile?.first_name || metadata?.full_name?.split(' ')?.[0] || '',
    last_name:
      profile?.last_name ||
      metadata?.full_name?.split(' ')?.slice(1)?.join(' ') ||
      '',
  };
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async ({ force = false } = {}, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(PROFILE_URL, { headers });
      const data = await parseProfileResponse(response);
      const payload = data ? pickProfilePayload(data) : pickProfilePayload({});
      return mergeAuthDefaults(payload);
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch profile');
    }
  },
  {
    condition: ({ force = false } = {}, { getState }) => {
      if (force) return true;
      const { isLoading, isHydrated } = getState().profile;
      return !isLoading && !isHydrated;
    },
  }
);

export const saveProfile = createAsyncThunk(
  'profile/saveProfile',
  async (draftData, { getState, rejectWithValue }) => {
    try {
      const data = draftData ?? getState().profile.data;
      const headers = await getAuthHeaders();
      const response = await fetch(PROFILE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(pickProfilePayload(data)),
      });
      const saved = await parseProfileResponse(response);
      return saved ? pickProfilePayload(saved) : pickProfilePayload(data);
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to save profile');
    }
  }
);
