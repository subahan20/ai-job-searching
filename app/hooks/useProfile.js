'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, saveProfile } from '../store/profileActions';
import { EMPTY_PROFILE, PROFILE_TABS } from '../store/profileConstants';
import {
  clearProfileError,
  clearSaveSuccess,
  setActiveTab,
} from '../store/profileSlice';
import {
  selectProfileCompleteness,
  selectProfileData,
  selectProfileDisplayName,
  selectProfileState,
} from '../store/profileSelectors';

const pickFields = (data = {}) => ({
  first_name: data.first_name ?? '',
  last_name: data.last_name ?? '',
  email: data.email ?? '',
  phone: data.phone ?? '',
  location: data.location ?? '',
  portfolio_url: data.portfolio_url ?? '',
  degree: data.degree ?? '',
  university: data.university ?? '',
  graduation_year: data.graduation_year ?? '',
  cgpa: data.cgpa ?? '',
  preferred_role: data.preferred_role ?? '',
  core_skills: Array.isArray(data.core_skills) ? data.core_skills : [],
  current_ctc: data.current_ctc ?? '',
  expected_ctc: data.expected_ctc ?? '',
  work_experience: data.work_experience ?? '',
  linkedin_url: data.linkedin_url ?? '',
  github_url: data.github_url ?? '',
  leetcode_url: data.leetcode_url ?? '',
  resume_source: data.resume_source ?? 'Paste URL',
  resume_url: data.resume_url ?? '',
  notice_period: data.notice_period ?? '',
});

export function useProfile() {
  const dispatch = useDispatch();
  const { activeTab, isLoading, isSaving, isHydrated, error, saveSuccess } = useSelector(selectProfileState);
  const data = useSelector(selectProfileData);
  const completeness = useSelector(selectProfileCompleteness);
  const displayName = useSelector(selectProfileDisplayName);

  const savedFields = useMemo(() => pickFields(data), [data]);
  const [draft, setDraft] = useState(() => ({ ...EMPTY_PROFILE }));
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!isLoading && isHydrated && !isDirty) {
      setDraft(pickFields(data));
    }
  }, [data, isLoading, isHydrated, isDirty]);

  useEffect(() => {
    if (!isHydrated && !isLoading) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isHydrated, isLoading]);

  const updateField = useCallback((field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  const handleAddSkill = useCallback((skill) => {
    const trimmed = skill?.trim();
    if (!trimmed) return;

    setDraft((prev) => {
      if (prev.core_skills.includes(trimmed)) return prev;
      return { ...prev, core_skills: [...prev.core_skills, trimmed] };
    });
    setIsDirty(true);
  }, []);

  const handleRemoveSkill = useCallback((skill) => {
    setDraft((prev) => ({
      ...prev,
      core_skills: prev.core_skills.filter((item) => item !== skill),
    }));
    setIsDirty(true);
  }, []);

  const handleTabChange = useCallback(
    (tab) => dispatch(setActiveTab(tab)),
    [dispatch]
  );

  const handleNext = useCallback(() => {
    const index = PROFILE_TABS.indexOf(activeTab);
    if (index >= 0 && index < PROFILE_TABS.length - 1) {
      dispatch(setActiveTab(PROFILE_TABS[index + 1]));
    }
  }, [dispatch, activeTab]);

  const handleBack = useCallback(() => {
    const index = PROFILE_TABS.indexOf(activeTab);
    if (index > 0) {
      dispatch(setActiveTab(PROFILE_TABS[index - 1]));
    }
  }, [dispatch, activeTab]);

  const handleSave = useCallback(() => {
    dispatch(saveProfile(draft)).then((result) => {
      if (saveProfile.fulfilled.match(result)) {
        setIsDirty(false);
      }
    });
  }, [dispatch, draft]);

  const handleDiscard = useCallback(() => {
    setIsDirty(false);
    setDraft(savedFields);
    dispatch(fetchProfile({ force: true }));
  }, [dispatch, savedFields]);

  const dismissError = useCallback(() => dispatch(clearProfileError()), [dispatch]);
  const dismissSaveSuccess = useCallback(() => dispatch(clearSaveSuccess()), [dispatch]);

  return {
    draftFields: draft,
    savedFields,
    activeTab,
    completeness,
    displayName,
    isLoading,
    isSaving,
    error,
    saveSuccess,
    updateField,
    handleAddSkill,
    handleRemoveSkill,
    handleTabChange,
    handleNext,
    handleBack,
    handleSave,
    handleDiscard,
    dismissError,
    dismissSaveSuccess,
  };
}
