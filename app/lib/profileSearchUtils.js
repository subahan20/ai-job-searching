export const parseExperienceYears = (workExperience = '') => {
  const value = String(workExperience).trim();
  if (!value) return 0;
  if (value.includes('6+')) return 6;
  const match = value.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export const buildSearchCriteriaFromProfile = ({
  preferred_role = '',
  core_skills = [],
  work_experience = '',
  location = '',
} = {}) => ({
  role: preferred_role.trim(),
  skills: Array.isArray(core_skills) ? core_skills.join(', ') : '',
  experience: parseExperienceYears(work_experience),
  location: location.trim(),
});

export const buildSearchCriteriaKey = ({ role = '', skills = '', experience = 0, location = '' } = {}) =>
  `${role}|${skills}|${experience}|${location}`;
