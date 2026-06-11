import { createSelector } from '@reduxjs/toolkit';
import { buildSearchCriteriaFromProfile } from '../lib/profileSearchUtils';
import { PROFILE_FORM_FIELDS } from './profileConstants';

export const selectProfileState = (state) => state.profile;

export const selectProfileData = createSelector(
  [selectProfileState],
  (profile) => profile?.data ?? {}
);

export const selectProfileCompleteness = createSelector(
  [selectProfileData],
  (data) => {
    const stringFields = PROFILE_FORM_FIELDS.filter((field) => field !== 'core_skills');
    const filledStrings = stringFields.filter(
      (field) => typeof data[field] === 'string' && data[field].trim() !== ''
    ).length;
    const skillsFilled = Array.isArray(data.core_skills) && data.core_skills.length > 0 ? 1 : 0;
    const total = stringFields.length + 1;

    return Math.round(((filledStrings + skillsFilled) / total) * 100) || 0;
  }
);

export const selectProfileDisplayName = createSelector(
  [selectProfileData],
  ({ first_name = '', last_name = '' } = {}) => {
    const name = [first_name, last_name].filter(Boolean).join(' ').trim();
    return name || 'Your Name';
  }
);

export const selectProfileSearchCriteria = createSelector(
  [selectProfileData],
  (data) => buildSearchCriteriaFromProfile(data)
);

export const selectIsProfileSearchReady = createSelector(
  [selectProfileSearchCriteria],
  ({ role }) => Boolean(role?.trim())
);
