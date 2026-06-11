import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile, saveProfile } from './profileActions';
import { EMPTY_PROFILE, PROFILE_TABS } from './profileConstants';

const initialState = {
  data: { ...EMPTY_PROFILE },
  activeTab: PROFILE_TABS[0],
  isLoading: false,
  isSaving: false,
  isHydrated: false,
  error: null,
  saveSuccess: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    updateProfileField: (state, { payload: { field, value } }) => {
      state.data[field] = value;
      state.saveSuccess = false;
    },
    addSkill: (state, { payload }) => {
      const skill = payload?.trim();
      if (!skill || state.data.core_skills.includes(skill)) return;
      state.data.core_skills.push(skill);
      state.saveSuccess = false;
    },
    removeSkill: (state, { payload }) => {
      state.data.core_skills = state.data.core_skills.filter((skill) => skill !== payload);
      state.saveSuccess = false;
    },
    clearProfileError: (state) => {
      state.error = null;
    },
    clearSaveSuccess: (state) => {
      state.saveSuccess = false;
    },
    resetProfile: () => ({
      ...initialState,
      data: { ...EMPTY_PROFILE },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isHydrated = true;
        if (payload) {
          state.data = { ...state.data, ...payload };
        }
      })
      .addCase(fetchProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isHydrated = true;
        state.error = payload;
      })
      .addCase(saveProfile.pending, (state) => {
        state.isSaving = true;
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(saveProfile.fulfilled, (state, { payload }) => {
        state.isSaving = false;
        state.saveSuccess = true;
        if (payload) {
          state.data = { ...state.data, ...payload };
        }
      })
      .addCase(saveProfile.rejected, (state, { payload }) => {
        state.isSaving = false;
        state.error = payload;
      });
  },
});

export const {
  setActiveTab,
  updateProfileField,
  addSkill,
  removeSkill,
  clearProfileError,
  clearSaveSuccess,
  resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
