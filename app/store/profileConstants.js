export const PROFILE_TABS = ['Profile Details', 'Education', 'Background Details'];

export const NOTICE_PERIOD_OPTIONS = ['Immediate', '15 days', '30 days', '60 days', '90 days'];

export const WORK_EXPERIENCE_OPTIONS = ['0 yrs (Fresher)', '1 yr', '2 yr', '3 yr', '4 yr', '5 yr', '6+ yr'];

export const PROFILE_FORM_FIELDS = [
  'first_name',
  'last_name',
  'email',
  'phone',
  'location',
  'portfolio_url',
  'degree',
  'university',
  'graduation_year',
  'cgpa',
  'preferred_role',
  'core_skills',
  'current_ctc',
  'expected_ctc',
  'work_experience',
  'linkedin_url',
  'github_url',
  'leetcode_url',
  'resume_source',
  'resume_url',
  'notice_period',
];

export const EMPTY_PROFILE = Object.freeze({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  location: '',
  portfolio_url: '',
  degree: '',
  university: '',
  graduation_year: '',
  cgpa: '',
  preferred_role: '',
  core_skills: [],
  current_ctc: '',
  expected_ctc: '',
  work_experience: '',
  linkedin_url: '',
  github_url: '',
  leetcode_url: '',
  resume_source: 'Paste URL',
  resume_url: '',
  notice_period: '',
});
