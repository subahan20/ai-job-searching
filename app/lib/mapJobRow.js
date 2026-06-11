import { cleanJobField, cleanJobSkills } from './cleanJobField';

export const mapJobRow = (row = {}) => {
  const job = {
    id: row.id,
    title: cleanJobField(row.title),
    source: cleanJobField(row.source),
    url: cleanJobField(row.url),
    publishState: row.publish_state || row.publishState || 'Published',
    createdAt: row.created_at || row.createdAt || null,
  };

  const company = cleanJobField(row.company);
  const location = cleanJobField(row.location);
  const salary = cleanJobField(row.salary);
  const description = cleanJobField(row.description);
  const postedTime = cleanJobField(row.posted_time || row.postedTime);
  const skillsRequired = cleanJobSkills(row.skills_required || row.skillsRequired);

  if (company) job.company = company;
  if (location) job.location = location;
  if (salary) job.salary = salary;
  if (description) job.description = description;
  if (postedTime) job.postedTime = postedTime;
  if (row.posted_at || row.postedAt) job.postedAt = row.posted_at || row.postedAt;
  if (skillsRequired.length) job.skillsRequired = skillsRequired;

  if (row.min_experience_years !== undefined && row.min_experience_years !== null) {
    job.minExperienceYears = row.min_experience_years;
  } else if (row.minExperienceYears !== undefined && row.minExperienceYears !== null) {
    job.minExperienceYears = row.minExperienceYears;
  }

  return job;
};
